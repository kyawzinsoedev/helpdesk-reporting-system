<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
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
            'roles' => Role::all(),
        ]);
    }

    /**
     * Store user
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'phone' => 'required|string|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users,email',
            'gender' => 'nullable|in:male,female',
            'address' => 'required|string',
            'status' => 'required|in:active,draft',
            'department_id' => 'required|exists:departments,id',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        $validated['password'] = Hash::make($request->password);

        $validated['gender'] = $validated['gender'] ?? 'male';

        $validated['status'] = $validated['status'] ?? 'active';

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
            'user' => $user->load(['roles']),
            'departments' => Department::all(),
            'roles' => Role::all(),
        ]);
    }

    /**
     * Update user
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'phone' => 'required|string|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'gender' => 'nullable|in:male,female',
            'address' => 'required|string',
            'status' => 'required|string',
            'department_id' => 'required|exists:departments,id',
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->passwrod);
        } else {
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