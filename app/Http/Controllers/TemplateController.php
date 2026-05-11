<?php

namespace App\Http\Controllers;

use App\Models\Report;
use App\Models\Template;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TemplateController extends Controller
{
    /**
     * Display a listing of templates.
     */
    public function index()
    {
        $templates = Template::with('report')->latest()->get();

        $reports = Report::select('id', 'name')->get();

        return Inertia::render('Templates/Index', [
            'templates' => $templates,
            'reports' => $reports
        ]);
    }

    /**
     * Store a newly created template in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'report_id' => 'required|exists:reports,id',
        ]);

        Template::create($validated);

        return redirect()->back()->with('message', 'Template created successfully.');
    }

    /**
     * Update the specified template in storage.
     */
    public function update(Request $request, Template $template)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'report_id' => 'required|exists:reports,id',
        ]);

        $template->update($validated);

        return redirect()->back()->with('message', 'Template updated successfully.');
    }

    /**
     * Remove the specified template from storage.
     */
    public function destroy(Template $template)
    {
        $template->delete();

        return redirect()->back()->with('message', 'Template deleted successfully.');
    }
}