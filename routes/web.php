<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::post('/contact', [\App\Http\Controllers\HomeController::class, 'submitContact'])->name('contact.submit');
Route::get('/projects-gallery', [\App\Http\Controllers\HomeController::class, 'portfolio'])->name('portfolio.index');
Route::get('/projects-gallery/{project:slug}', [\App\Http\Controllers\HomeController::class, 'showProject'])->name('portfolio.show');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [\App\Http\Controllers\DashboardController::class, 'index'])->name('dashboard');

    Route::resource('projects', \App\Http\Controllers\ProjectController::class);
    Route::resource('clients', \App\Http\Controllers\ClientController::class);
    Route::resource('invoices', \App\Http\Controllers\InvoiceController::class);
    Route::resource('leads', \App\Http\Controllers\LeadController::class);
    
    Route::get('content', [\App\Http\Controllers\ContentController::class, 'index'])->name('content.index');
    Route::post('content', [\App\Http\Controllers\ContentController::class, 'update'])->name('content.update');
    
    Route::get('settings', [\App\Http\Controllers\SettingController::class, 'index'])->name('settings.index');
    Route::post('settings', [\App\Http\Controllers\SettingController::class, 'update'])->name('settings.update');
});

require __DIR__.'/settings.php';
