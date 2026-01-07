<?php

if (!function_exists('event_image_url')) {
    function event_image_url($event)
    {
        // 1. Jika ada thumbnail
        if (!empty($event->thumbnail)) {
            return asset('storage/' . $event->thumbnail);
        }

        // 2. Placeholder deterministic
        $placeholders = [
            'assets/Placeholder/placeholder_event1.png',
            'assets/Placeholder/placeholder_event2.png',
            'assets/Placeholder/placeholder_event3.png',
        ];

        $index = $event->event_id % count($placeholders);

        return asset($placeholders[$index]);
    }
}
