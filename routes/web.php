<?php

use App\Http\Controllers\Admin\TicketFormController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DepartmentController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\TemplateController;
use App\Http\Controllers\TicketController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::resource('users', UserController::class);

    Route::resource('departments', DepartmentController::class);

    Route::resource('reports', ReportController::class);

    Route::resource('templates', TemplateController::class);

    Route::resource('categories', CategoryController::class);

    Route::resource('forms', TicketFormController::class);

    Route::get(
        '/forms/{form}/fields',
        [TicketFormController::class, 'fields']
    )->name('forms.fields.index');

    Route::post(
        '/forms/{form}/fields',
        [TicketFormController::class, 'storeField']
    )->name('forms.fields.store');

});

require __DIR__ . '/settings.php';
