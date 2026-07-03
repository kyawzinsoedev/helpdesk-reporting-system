<?php

use App\Http\Controllers\Admin\TicketFormController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

// Route::inertia('/', 'welcome', [
//     'canRegister' => Features::enabled(Features::registration()),
// ])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'dashboard')->name('dashboard');

    // Users
    Route::resource('users', UserController::class);
    Route::put('users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');;

    // Departments
    Route::resource('departments', DepartmentController::class);

    // Tickets Form
    Route::resource('forms', TicketFormController::class);
    Route::get('/forms/{form}/fields', [TicketFormController::class, 'fields'])->name('forms.fields.index');
    Route::post('/forms/{form}/fields', [TicketFormController::class, 'storeField'])->name('forms.fields.store');

    // Tickets
    Route::patch('tickets/{ticket}/assign', [TicketController::class, 'assign'])->name('tickets.assign');
    Route::patch('tickets/{ticket}/process', [TicketController::class, 'process'])->name('tickets.process');
    Route::resource('tickets', TicketController::class);
});

require __DIR__ . '/settings.php';
