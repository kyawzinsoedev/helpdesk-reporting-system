<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Spatie\Activitylog\Models\Activity;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $ticketStats = Ticket::select('status', DB::raw('count(*) as total'))
            ->groupBy('status')
            ->pluck('total', 'status')
            ->all();

        $openTickets = $ticketStats['open'] ?? 0;
        $assignTickets = $ticketStats['assigned'] ?? 0;
        $inProgress = $ticketStats['processing'] ?? 0;
        $resolved   = $ticketStats['resolved'] ?? 0;


        $recentTickets = Ticket::latest()
            ->take(4)
            ->get()
            ->map(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'title' => $ticket->title,
                    'form' => $ticket->form ? $ticket->form->name : 'General Support',
                    'priority' => $ticket->priority,
                    'status' => $ticket->status,
                    'date' => $ticket->created_at->diffForHumans(),
                ];
            });

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

        return Inertia::render('dashboard', [
            'statsData' => [
                'open' => $openTickets,
                'assign' => $assignTickets,
                'in_progress' => $inProgress,
                'resolved' => $resolved,
            ],
            'recentTickets' => $recentTickets,
            'recentActivities' => $recentActivities,
        ]);
    }
}
