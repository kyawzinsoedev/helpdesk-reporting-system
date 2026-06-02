<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
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
        $validated['password'] = Hash::make(Str::random(10));

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
            'role' => 'required|exists:roles,name',
        ]);

        $validated['gender'] = $validated['gender'] ?? 'male';

        $user->update($validated);

        // Sync role
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

    public function resetPassword(User $user)
    {
        // 1. Generate new random password
        $newPassword = Str::random(10);

        // 2. Save hashed password
        $user->password = Hash::make($newPassword);
        $user->save();

        // 3. (Optional) send email to user
        try {
            Mail::to($user->email)->send(new \App\Mail\PasswordResetMail($user, $newPassword));

            Log::channel('mail')->info('Password reset email sent', [
                'user_id' => $user->id,
                'email' => $user->email,
                'sent_by' => auth()->id(),
            ]);

        } catch (\Exception $e) {

            Log::channel('mail')->error('Password reset email failed', [
                'user_id' => $user->id,
                'email' => $user->email,
                'error' => $e->getMessage(),
            ]);

            throw $e;
        }

        return back()->with('success', 'Password reset successfully. New password generated.');
    }
}