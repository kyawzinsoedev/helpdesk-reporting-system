<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketForm;
use App\Models\TicketAnswer;
use App\Models\TicketFormField;
use App\Models\TicketHistory;
use App\Models\User;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class TicketController extends Controller
{
    use AuthorizesRequests;
    public function index()
    {
        $this->authorize('viewAny', Ticket::class);

        $tickets = Ticket::with(['form', 'user', 'answers', 'assignedStaff'])
            ->where('user_id', Auth::id())
            ->latest()
            ->get()
            ->map(function ($ticket) {

                // Convert answers → custom_fields (IMPORTANT FIX)
                $customFields = [];

                foreach ($ticket->answers as $answer) {
                    foreach ($answer->answers as $field) {
                        $customFields[$field['field_name']] = $field['value'];
                    }
                }

                $ticket->custom_fields = $customFields;

                return $ticket;
            });

        $ticketForms = TicketForm::with('fields')->get();

        $staffs = User::with('department')
            // ->where('status', 'active')
            ->get()
            ->map(function ($user) {
                return [
                    'id' => $user->id,
                    'name' => $user->name,
                    'department_id' => $user->department_id,
                    'department_name' => $user->department?->name ?? 'No Department',
                    'status' => $user->status,
                ];
            });

        // dd($tickets->toArray());

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets,
            'ticketForms' => $ticketForms,
            'staffs' => $staffs,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('create', Ticket::class);

        $request->validate([
            'ticket_form_id' => 'required|exists:ticket_forms,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'priority' => 'required|in:low,medium,high',
            'custom_fields' => 'nullable|array',
        ]);

        DB::beginTransaction();

        try {
            $ticket = Ticket::create([
                'user_id' => Auth::id(),
                'ticket_form_id' => $request->ticket_form_id,
                'title' => $request->title,
                'description' => $request->description,
                'priority' => $request->priority,
                'status' => 'open',
            ]);

            $formFields = TicketFormField::where('ticket_form_id', $request->ticket_form_id)
                ->get()
                ->keyBy('name');

            $answers = [];

            foreach ($request->custom_fields ?? [] as $fieldName => $value) {

                if (!isset($formFields[$fieldName])) {
                    continue;
                }

                $field = $formFields[$fieldName];

                if ($value instanceof \Illuminate\Http\UploadedFile) {
                    $value = $value->store('ticket-files', 'public');
                }

                if ($value === null || $value === '' || $value === []) {
                    continue;
                }

                $answers[] = [
                    'field_id' => $field->id,
                    'field_name' => $field->name,
                    'field_label' => $field->label,
                    'field_type' => $field->type,
                    'value' => $value,
                ];
            }

            TicketAnswer::create([
                'ticket_id' => $ticket->id,
                'answers' => $answers,
            ]);

            DB::commit();

            return redirect()
                ->route('tickets.index')
                ->with('success', 'Ticket created successfully.');
        } catch (\Exception $e) {
            // dd($e->getMessage());
            DB::rollBack();

            return back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, Ticket $ticket)
    {
        $this->authorize('update', $ticket);

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high',
            'status' => 'sometimes|required|in:open,pending,resolved,closed',
            'custom_fields' => 'nullable|array',
        ]);

        DB::beginTransaction();

        try {
            // 1. Update main ticket
            $ticket->update(
                $request->only(['title', 'description', 'priority', 'status'])
            );

            // 2. Get form fields
            $formFields = TicketFormField::where('ticket_form_id', $ticket->ticket_form_id)
                ->get()
                ->keyBy('name');

            $answers = [];

            foreach ($request->custom_fields ?? [] as $fieldName => $value) {

                if (!isset($formFields[$fieldName])) {
                    continue;
                }

                $field = $formFields[$fieldName];

                if ($value instanceof \Illuminate\Http\UploadedFile) {
                    $value = $value->store('ticket-files', 'public');
                }

                if ($value === null || $value === '' || $value === []) {
                    continue;
                }

                $answers[] = [
                    'field_id' => $field->id,
                    'field_name' => $field->name,
                    'field_label' => $field->label,
                    'field_type' => $field->type,
                    'value' => $value,
                ];
            }

            // 3. Replace old answers (IMPORTANT)
            $ticket->answers()->delete();

            TicketAnswer::create([
                'ticket_id' => $ticket->id,
                'answers' => $answers,
            ]);

            DB::commit();

            return redirect()
                ->route('tickets.index')
                ->with('success', 'Ticket updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();

            return back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function destroy(Ticket $ticket)
    {
        $this->authorize('delete', $ticket);

        // $ticket->answers()->delete();
        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted successfully!');
    }

    public function assign(Request $request, Ticket $ticket)
    {
        $this->authorize('assign', $ticket);

        $request->validate([
            'assign_to' => 'required|exists:users,id',
            'ticket_name' => 'nullable|string',
        ]);

        DB::beginTransaction();

        try {
            $ticket->update([
                'assign_to' => $request->assign_to,
                'status' => 'assigned',
            ]);

            $staff = User::findOrFail($request->assign_to);
            $staff->update([
                'status' => 'inactive',
            ]);
            $ticket->load('assignedStaff');

            $ticketNameContext = $request->ticket_name ? " (Form Name: {$request->ticket_name})" : "";

            TicketHistory::create([
                'ticket_id' => $ticket->id,
                'user_id' => auth()->id(),
                'status' => 'assigned',
                'comment' => "Ticket{$ticketNameContext} was successfully assigned to " . $ticket->assignedStaff->name . " and staff status set to inactive.",
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Ticket assigned and staff status updated successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            dd($e->getMessage());
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    public function removeAssign(Ticket $ticket, $staffId)
    {
        $this->authorize('manageWorkflow', $ticket);

        $staff = User::find($staffId);

        if (!$staff) {
            return redirect()->back()->with('error', 'Staff member not found.');
        }

        DB::beginTransaction();

        try {
            $ticket->update([
                'assign_to' => null,
                'status' => 'open',
            ]);

            $staff->update([
                'status' => 'active',
            ]);

            TicketHistory::create([
                'ticket_id' => $ticket->id,
                'user_id'   => auth()->id(),
                'status'    => 'unassigned',
                'comment'   => "Staff member " . $staff->name . " was removed from this ticket. Staff status set back to active.",
            ]);

            DB::commit();

            return redirect()->back()->with('success', 'Staff removed from ticket successfully.');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->back()->with('error', 'Something went wrong: ' . $e->getMessage());
        }
    }

    public function process(Request $request, Ticket $ticket)
    {
        $this->authorize('manageWorkflow', $ticket);

        $validated = $request->validate([
            'remark' => ['required', 'string', 'max:1000'],
        ]);

        $ticket->update([
            'status' => 'processing',
            'remark' => $validated['remark'],
        ]);

        return back()->with('success', 'Ticket processed successfully.');
    }

    public function resolve(Request $request, Ticket $ticket)
    {
        $this->authorize('manageWorkflow', $ticket);

        $validated = $request->validate([
            'remark' => ['required', 'string', 'max:1000'],
        ]);
        // send mail to create user ( now that is resolved and need to change status as clsoe )
        DB::transaction(function () use ($validated, $ticket) {

            $ticket->update([
                'status' => 'resolved',
                'remark' => $validated['remark'],
            ]);

            if ($ticket->user && $ticket->user->email) {
                Mail::raw("Your ticket '{$ticket->title}' has been resolved. Remark: {$validated['remark']}", function ($message) use ($ticket) {
                    $message->to($ticket->user->email)
                        ->subject("Ticket Resolved: #{$ticket->id}");
                });
            }
        });
        return back()->with('success', 'Ticket resolved successfully.');
    }

    public function close(Request $request, Ticket $ticket)
    {
        $this->authorize('manageWorkflow', $ticket);

        $validated = $request->validate([
            'remark' => ['required', 'string', 'max:1000'],
        ]);
        $ticket->update([
            'status' => 'closed',
            'remark' => $validated['remark'],
        ]);

        return back()->with('success', 'Ticket closed successfully.');
    }
}
