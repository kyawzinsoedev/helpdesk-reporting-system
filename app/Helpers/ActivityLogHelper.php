<?php

namespace App\Helpers;

use Illuminate\Database\Eloquent\Model;

class ActivityLogHelper
{
    /**
     * Write an activity log.
     *
     * @param string      $message
     * @param Model|null  $subject
     * @param array       $properties
     * @param string|null $event
     */
    public static function log(
        string $message,
        ?Model $subject = null,
        array $properties = [],
        ?string $event = null
    ): void {
        $activity = activity();

        // User who performed the action
        if (auth()->check()) {
            $activity->causedBy(auth()->user());
        }

        // Model that was affected
        if ($subject !== null) {
            $activity->performedOn($subject);
        }

        // Event name (created, updated, deleted, etc.)
        if ($event !== null) {
            $activity->event($event);
        }

        // Extra data
        if (!empty($properties)) {
            $activity->withProperties($properties);
        }

        // Human-readable description
        $activity->log($message);
    }

    /**
     * Log a created action.
     */
    public static function created(
        string $message,
        ?Model $subject = null,
        array $properties = []
    ): void {
        self::log($message, $subject, $properties, 'created');
    }

    /**
     * Log an updated action.
     */
    public static function updated(
        string $message,
        ?Model $subject = null,
        array $properties = []
    ): void {
        self::log($message, $subject, $properties, 'updated');
    }

    /**
     * Log a deleted action.
     */
    public static function deleted(
        string $message,
        ?Model $subject = null,
        array $properties = []
    ): void {
        self::log($message, $subject, $properties, 'deleted');
    }

    /**
     * Log a custom action.
     */
    public static function custom(
        string $event,
        string $message,
        ?Model $subject = null,
        array $properties = []
    ): void {
        self::log($message, $subject, $properties, $event);
    }
}
