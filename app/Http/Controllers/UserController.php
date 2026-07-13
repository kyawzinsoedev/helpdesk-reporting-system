<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Department;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    use AuthorizesRequests;
    /**
     * List users
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        $search = $request->input('search');

        $users = User::with(['department', 'roles'])
            ->when($search, function ($query) use ($search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('phone', 'like', "%{$search}%")
                        ->orWhereHas('department', function ($q) use ($search) {
                            $q->where('name', 'like', "%{$search}%");
                        });
                });
            })
            ->latest()
            ->paginate(10)
            ->withQueryString();

        return Inertia::render('Users/Index', [
            'users' => $users,
            'departments' => Department::all(),
            'roles' => Role::all(),
            'filters' => [
                'search' => $search,
            ],
        ]);
    }


    /**
     * Store user
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username',
            'phone' => 'required|string|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users,email',
            'gender' => 'nullable|in:male,female',
            'address' => 'required|string',
            'status' => 'required|in:active,inactive',
            'department_id' => 'required|exists:departments,id',
            'role' => 'required|exists:roles,name',
        ]);


        // default password
        $validated['password'] = Hash::make(Str::random(10));

        $validated['gender'] = $validated['gender'] ?? 'male';


        // create user
        $user = User::create($validated);

        activity()
            ->performedOn($user)
            ->causedBy($request->user())
            ->log($request->user()->name . " created a new user account for '{$user->name}' ({$user->email})");

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
        $this->authorize('update', $user);
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'phone' => 'required|string|max:20',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'gender' => 'nullable|in:male,female',
            'address' => 'required|string',
            'status' => 'required|in:active,inactive',
            'department_id' => 'required|exists:departments,id',
            'role' => 'required|exists:roles,name',
        ]);

        $validated['gender'] = $validated['gender'] ?? 'male';



        $user->update($validated);

        // Sync role
        $user->syncRoles($validated['role']);

        activity()
            ->performedOn($user)
            ->causedBy($request->user())
            ->log($request->user()->name . " updated the profile details of user '{$user->name}'");

        return redirect()
            ->route('users.index')
            ->with('success', 'User updated successfully');
    }

    /**
     * Delete user
     */
    public function destroy(Request $request, User $user)
    {
        $this->authorize('delete', $user);

        activity()
            ->performedOn($user)
            ->causedBy($request->user())
            ->withProperties([
                'deleted_user_id' => $user->id,
                'deleted_user_email' => $user->email,
            ])
            ->log($request->user()->name . " permanently deleted the user account of '{$user->name}' ({$user->email})");
        $user->delete();

        return back()->with('success', 'User deleted successfully');
    }

    public function resetPassword(Request $request, User $user)
    {
        $this->authorize('resetPassword', $user);
        // 1. Generate new random password
        $newPassword = Str::random(10);

        // 2. Save hashed password
        $user->password = Hash::make($newPassword);
        $user->save();

        activity()
            ->performedOn($user)
            ->causedBy($request->user())
            ->log($request->user()->name . " triggered a password reset for user '{$user->name}' ({$user->email})");
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
