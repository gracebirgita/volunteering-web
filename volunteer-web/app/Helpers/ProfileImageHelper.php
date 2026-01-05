<?php

if (!function_exists('profile_image_url')) {
    function profile_image_url($profile)
    {
        // Safety guard
        if (!$profile) {
            return asset('assets/Placeholder/avatar1.png');
        }

        // 1. Jika user sudah upload avatar
        if (!empty($profile->avatar)) {
            return asset('storage/' . $profile->avatar);
        }

        // 2. Deterministic placeholder (TIDAK random)
        $placeholders = [
            'assets/Placeholder/avatar1.png',
            'assets/Placeholder/avatar2.png',
            'assets/Placeholder/avatar3.png',
        ];

        /**
         * Gunakan user_id agar:
         * - Konsisten
         * - Tidak berubah saat refresh
         * - Tidak perlu kolom DB tambahan
         */
        $index = $profile->user_id % count($placeholders);

        return asset($placeholders[$index]);
    }
}
