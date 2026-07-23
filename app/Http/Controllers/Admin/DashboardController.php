<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        /*
         * Ticket statistics visible to the current user.
         */
        $ticketStats = Ticket::query()
            ->visibleTo($user)
            ->select('status', DB::raw('COUNT(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->all();

        /*
         * Recent tickets visible to the current user.
         */
        $recentTickets = Ticket::query()
            ->visibleTo($user)
            ->with('form')
            ->latest()
            ->take(4)
            ->get()
            ->map(function (Ticket $ticket) {
                return [
                    'id' => $ticket->id,
                    'title' => $ticket->title,
                    'form' => $ticket->form?->name ?? 'General Support',
                    'priority' => $ticket->priority,
                    'status' => $ticket->status,
                    'date' => $ticket->created_at->diffForHumans(),
                ];
            });

        /*
         * Activity logs currently remain visible to everyone
         * who can access this dashboard.
         */
        $recentActivities = Activity::query()
            ->with('causer')
            ->latest()
            ->take(50)
            ->get()
            ->map(function (Activity $log) {
                return [
                    'id' => $log->id,
                    'description' => $log->description,
                    'causer_name' => $log->causer?->name ?? 'System',
                    'date' => $log->created_at->diffForHumans(),
                ];
            });

        return Inertia::render('dashboard', [
            'statsData' => [
                'open' => $ticketStats['open'] ?? 0,
                'assign' => $ticketStats['assigned'] ?? 0,
                'in_progress' => $ticketStats['processing'] ?? 0,
                'resolved' => $ticketStats['resolved'] ?? 0,
            ],
            'recentTickets' => $recentTickets,
            'recentActivities' => $recentActivities,
        ]);
    }
}
