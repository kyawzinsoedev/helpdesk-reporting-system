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
            ->get();

        return Inertia::render('Admin/Tickets/Index', [
            'tickets' => $tickets
        ]);
    }

    public function create()
    {
        $ticketForms = TicketForm::with('fields')->get();

        return Inertia::render('Admin/Tickets/Create', [
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

            /**
             * DYNAMIC FIELDS
             */
            'fields' => 'nullable|array',
            'fields.*.field_id' => 'required|integer',
            'fields.*.value' => 'nullable',
        ]);

        DB::beginTransaction();

        try {

            /**
             * CREATE TICKET
             */
            $ticket = Ticket::create([
                'user_id' => Auth::id(),
                'ticket_form_id' => $request->ticket_form_id,
                'title' => $request->title,
                'description' => $request->description,
                'priority' => $request->priority,
                'status' => 'open',
            ]);

            /**
             * LOAD FORM FIELDS
             */
            $formFields = TicketFormField::where(
                'ticket_form_id',
                $request->ticket_form_id
            )
                ->get()
                ->keyBy('id');

            /**
             * FINAL ANSWERS ARRAY
             */
            $answers = [];

            /**
             * NORMALIZE INPUT
             */
            foreach ($request->fields ?? [] as $input) {

                $fieldId = $input['field_id'] ?? null;
                $value = $input['value'] ?? null;

                /**
                 * SKIP INVALID FIELD
                 */
                if (
                    !$fieldId ||
                    !isset($formFields[$fieldId])
                ) {
                    continue;
                }

                /**
                 * CURRENT FIELD
                 */
                $field = $formFields[$fieldId];

                /**
                 * HANDLE FILE UPLOAD
                 */
                if ($value instanceof \Illuminate\Http\UploadedFile) {

                    $value = $value->store(
                        'ticket-files',
                        'public'
                    );
                }

                /**
                 * SKIP EMPTY VALUES
                 */
                if ($value === null || $value === '') {
                    continue;
                }

                /**
                 * BUILD SNAPSHOT JSON
                 */
                $answers[] = [
                    'field_id' => $field->id,
                    'field_name' => $field->name,
                    'field_label' => $field->label,
                    'field_type' => $field->type,
                    'value' => $value,
                ];
            }

            /**
             * SAVE SINGLE JSON RESPONSE
             */
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

    public function show(Ticket $ticket)
    {
        if ($ticket->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Admin/Tickets/Show', [
            'ticket' => $ticket->load(['form', 'answers.field'])
        ]);
    }

    public function edit(Ticket $ticket)
    {
        if ($ticket->user_id !== Auth::id()) {
            abort(403);
        }

        return Inertia::render('Admin/Tickets/Edit', [
            'ticket' => $ticket->load('answers'),
            'formFields' => TicketForm::with('fields')->find($ticket->ticket_form_id)
        ]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        if ($ticket->user_id !== Auth::id()) {
            abort(403);
        }

        $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'description' => 'sometimes|required|string',
            'priority' => 'sometimes|required|in:low,medium,high',
            'status' => 'sometimes|required|in:open,pending,resolved,closed',
        ]);

        $ticket->update($request->only(['title', 'description', 'priority', 'status']));

        return redirect()->route('tickets.index');
    }

    public function destroy(Ticket $ticket)
    {
        if ($ticket->user_id !== Auth::id()) {
            abort(403);
        }

        $ticket->answers()->delete();
        $ticket->delete();

        return redirect()->route('tickets.index');
    }
}