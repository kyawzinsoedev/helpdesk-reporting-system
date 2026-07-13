<?php

use App\Http\Controllers\Admin\RoleController;
use App\Http\Controllers\Admin\TicketFormController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\Admin\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('/', 'dashboard')->name('dashboard');

    // Users
    Route::resource('/users', UserController::class);
    Route::put('/users/{user}/reset-password', [UserController::class, 'resetPassword'])->name('users.reset-password');;

    // Roles
    Route::resource('/roles', RoleController::class);

    // Departments
    Route::resource('/departments', DepartmentController::class);

    // Tickets Form
    Route::resource('/forms', TicketFormController::class);
    Route::get('/forms/{form}/fields', [TicketFormController::class, 'fields'])->name('forms.fields.index');
    Route::post('/forms/{form}/fields', [TicketFormController::class, 'storeField'])->name('forms.fields.store');
    Route::put('/forms/{form}/fields/{field}', [TicketFormController::class, 'updateField'])->name('forms.fields.update');
    Route::delete('/forms/{form}/fields/{field}', [TicketFormController::class, 'destroyField']);

    // Tickets
    Route::patch('/tickets/{ticket}/assign', [TicketController::class, 'assign'])->name('tickets.assign');
    Route::delete('/tickets/{ticket}/assign/{staff}', [TicketController::class, 'removeAssign']);
    Route::patch('/tickets/{ticket}/process', [TicketController::class, 'process'])->name('tickets.process');
    Route::patch('/tickets/{ticket}/resolve', [TicketController::class, 'resolve'])->name('tickets.resolve');
    Route::patch('/tickets/{ticket}/close', [TicketController::class, 'close'])->name('tickets.close');
    Route::resource('/tickets', TicketController::class);
});

require __DIR__ . '/settings.php';
