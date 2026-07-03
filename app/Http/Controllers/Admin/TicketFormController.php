<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\TicketForm;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TicketFormController extends Controller
{
    public function index()
    {
        $forms = TicketForm::latest()->get();

        return Inertia::render('Admin/Forms/Index', [
            'forms' => $forms
        ]);
    }


    public function create()
    {
        return Inertia::render('Admin/Forms/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        TicketForm::create($validated);

        return redirect('/forms')
            ->with('success', 'Form created successfully.');
    }

    public function fields(TicketForm $form)
    {
        $form->load('fields');

        return Inertia::render('Admin/Forms/Fields', [
            'form' => $form
        ]);
    }

    public function storeField(Request $request, TicketForm $form)
    {
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
}
