<?php

namespace App\Http\Controllers;

use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ReportController extends Controller
{
    /**
     * Display a listing of the reports.
     */
    public function index()
    {
        $reports = Report::latest()->get();

        return Inertia::render('Reports/Index', [
            'reports' => $reports
        ]);
    }

    /**
     * Store a newly created report in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:reports,name',
        ]);

        Report::create($validated);

        return redirect()->route('reports.index')
            ->with('message', 'Report created successfully.');
    }

    /**
     * Update the specified report in storage.
     */
    public function update(Request $request, Report $report)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:reports,name,' . $report->id,
        ]);

        $report->update($validated);

        return redirect()->route('reports.index')
            ->with('message', 'Report updated successfully.');
    }

    /**
     * Remove the specified report from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();

        return redirect()->route('reports.index')
            ->with('message', 'Report deleted successfully.');
    }
}