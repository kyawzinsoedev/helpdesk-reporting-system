<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use App\Models\TicketForm;
use App\Models\TicketAnswer;
use App\Models\TicketFormField;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class TicketController extends Controller
{

    public function index()
    {
        $tickets = Ticket::with(['form', 'answers'])
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

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets,
            'ticketForms' => $ticketForms
        ]);
    }

    public function store(Request $request)
    {
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
            DB::rollBack();

            return back()->withErrors([
                'error' => $e->getMessage(),
            ]);
        }
    }

    public function update(Request $request, Ticket $ticket)
    {
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
        // $ticket->answers()->delete();
        $ticket->delete();

        return redirect()->route('tickets.index')->with('success', 'Ticket deleted successfully!');
    }

}