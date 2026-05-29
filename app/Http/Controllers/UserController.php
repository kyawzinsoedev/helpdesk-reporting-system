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
     * List users
     */
    public function index()
    {
        $users = User::with(['department', 'roles'])
            ->latest()
            ->paginate(10);

        return Inertia::render('Users/Index', [
            'users' => $users,
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
            'role' => 'required|exists:roles,name',
        ]);

        // default password
        $validated['password'] = Hash::make('helpdesk@2026');

        $validated['gender'] = $validated['gender'] ?? 'male';

        // create user
        $user = User::create($validated);

        // Spatie role assignment (CORRECT)
        $user->assignRole($validated['role']);

        return redirect()->route('users.index')
            ->with('success', 'User created successfully');
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
            'status' => 'required|in:active,draft',
            'department_id' => 'required|exists:departments,id',
            'password' => 'nullable|string|min:6|confirmed',
            'role' => 'required|exists:roles,name',
        ]);

        // Update password only if provided
        if ($request->filled('password')) {
            $validated['password'] = Hash::make($request->password);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        // Sync role
        $role = Role::findById($request->role_id);
        $user->syncRoles($validated['role']);

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully');
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