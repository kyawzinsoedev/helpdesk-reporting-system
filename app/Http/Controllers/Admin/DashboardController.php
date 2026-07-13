<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    /**
     * Display the dashboard view with logs.
     */
    public function index(Request $request)
    {
        $totalTickets = 148; // Ticket::count();
        $openTickets = 12;   // Ticket::where('status', 'open')->count();
        $inProgress = 24;    // Ticket::where('status', 'in_progress')->count();
        $resolved = 112;     // Ticket::where('status', 'resolved')->count();

        $recentActivities = Activity::with('causer')
            ->latest()
            ->take(50)
            ->get()
            ->map(function ($log) {
                return [
                    'id' => $log->id,
                    'description' => $log->description,
                    'causer_name' => $log->causer ? $log->causer->name : 'System',
                    'date' => $log->created_at->diffForHumans(),
                ];
            });
        // dd($recentActivities->toArray());
        return Inertia::render('dashboard', [
            'statsData' => [
                'total' => $totalTickets,
                'open' => $openTickets,
                'in_progress' => $inProgress,
                'resolved' => $resolved,
            ],
            'recentActivities' => $recentActivities,
            'recentTickets' => Ticket::latest()->take(4)->get()
        ]);
    }
}
