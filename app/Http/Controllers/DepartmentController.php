<?php

namespace App\Http\Controllers;

use App\Helpers\ActivityLogHelper;
use App\Models\Department;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class DepartmentController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $this->authorize('viewAny', Department::class);
        $departments = Department::latest('created_at')->get();

        return Inertia::render('Departments/Index', [
            'departments' => $departments
        ]);

        // return Inertia::render('Departments/Index');
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $this->authorize('create', Department::class);
        return Inertia::render('Departments/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $this->authorize('create', Department::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:departments,name',
            'department_code' => 'required|string|max:255|unique:departments,department_code',
        ]);

        $department = Department::create($validated);

        ActivityLogHelper::created(
            auth()->user()->name . " created department '{$department->name}'.",
            $department
        );

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(Department $department)
    {
        $this->authorize('view', $department);
        return Inertia::render('Departments/Show', [
            'department' => $department
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Department $department)
    {
        $this->authorize('update', $department);
        return Inertia::render('Departments/Edit', [
            'department' => $department
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Department $department)
    {
        $this->authorize('update', $department);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'department_code' => [
                'required',
                'string',
                'max:255',
                Rule::unique('departments', 'department_code')->ignore($department->id),
            ],
        ]);

        $department->update($validated);

        ActivityLogHelper::updated(
            auth()->user()->name . " update department '{$department->name}'.",
            $department
        );

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Department $department)
    {
        $this->authorize('delete', $department);
        $department->delete();

        ActivityLogHelper::deleted(
            auth()->user()->name . " delete department '{$department->name}'.",
            $department
        );

        return redirect()
            ->route('departments.index')
            ->with('success', 'Department deleted successfully!');
    }
}
