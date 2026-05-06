<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Branch;
use App\Models\Department;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display list
     */
    public function index()
    {
        $users = User::with('department')->latest()->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
        ]);
    }

    /**
     * Show create form
     */
    public function create()
    {
        return Inertia::render('Users/Create', [
            'departments' => Department::all(),
            // 'roles' => Role::all(),
        ]);
    }

    /**
     * Store user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users,email',
            'gender' => 'nullable|string',
            'address' => 'required|string',
            'status' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        $user = User::create($validated);

        // Assign role
        $user->assignRole($request->role);

        return redirect()->route('users.index')->with('success', 'User created successfully');
    }

    /**
     * Show edit form
     */
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            // 'user' => $user->load(['roles']),
            'departments' => Department::all(),
            // 'roles' => Role::all(),
        ]);
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'gender' => 'nullable|string',
            'address' => 'required|string',
            'status' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        // Remove password if empty
        if (!$request->password) {
            unset($validated['password']);
        }

        $user->update($validated);

        // Sync role (important)
        $user->syncRoles([$request->role]);

        return redirect()->route('users.index')->with('success', 'User updated successfully');
    }

    /**
     * Delete user
     */
    public function destroy(User $user)
    {
        $user->delete();

        return back()->with('success', 'User deleted successfully');
    }
}