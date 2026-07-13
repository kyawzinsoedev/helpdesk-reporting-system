<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TicketForm;
use App\Models\TicketFormField;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketFormController extends Controller
{
    use AuthorizesRequests;

    public function index()
    {
        $this->authorize('viewAny', TicketForm::class);

        $forms = TicketForm::latest()->get();

        return Inertia::render('Admin/Forms/Index', [
            'forms' => $forms
        ]);
    }


    public function create()
    {
        $this->authorize('create', TicketForm::class);
        return Inertia::render('Admin/Forms/Create');
    }

    public function store(Request $request)
    {
        $this->authorize('create', TicketForm::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        TicketForm::create($validated);

        return redirect('/forms')
            ->with('success', 'Form created successfully.');
    }

    public function destroy(TicketForm $form)
    {
        $this->authorize('delete', $form);

        // Delete related fields first if foreign key doesn't cascade
        $form->fields()->delete();

        $form->delete();

        return redirect()
            ->route('forms.index') // or redirect('/forms')
            ->with('success', 'Form deleted successfully.');
    }

    public function fields(TicketForm $form)
    {
        $this->authorize('manageFields', $form);

        $form->load('fields');

        return Inertia::render('Admin/Forms/Fields', [
            'form' => $form
        ]);
    }

    public function storeField(Request $request, TicketForm $form)
    {
        $this->authorize('manageFields', $form);

        $validated = $request->validate([
            'label' => 'required',
            'name' => 'required',
            'type' => 'required',
            'options' => 'nullable',
        ]);

        $form->fields()->create([
            'label' => $validated['label'],
            'name' => $validated['name'],
            'type' => $validated['type'],
            'required' => $request->required ?? false,
            'options' => $validated['options'] ?? null,
        ]);

        return back();
    }


    public function updateField(Request $request, TicketForm $form, TicketFormField $field)
    {
        $this->authorize('manageFields', $form);

        $validated = $request->validate([
            'label' => 'required',
            'name' => 'required',
            'type' => 'required',
            'options' => 'nullable',
        ]);

        $field->update([
            'label' => $validated['label'],
            'name' => $validated['name'],
            'type' => $validated['type'],
            'required' => $request->required ?? false,
            'options' => $validated['options'] ?? null,
        ]);

        return back();
    }

    public function destroyField(TicketForm $form, TicketFormField $field)
    {
        $this->authorize('manageFields', $form);

        if ($field->ticket_form_id !== $form->id) {
            abort(403, 'Unauthorized action.');
        }

        $field->delete();

        return back();
    }
}
