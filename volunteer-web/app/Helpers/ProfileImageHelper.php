<?php

if (!function_exists('profile_image_url')) {
    function profile_image_url($profile)
    {
        // Safety guard
        if (!$profile) {
            return asset('assets/Placeholder/avatar1.png');
        }

        // 1. Jika user sudah upload avatar
        if (!empty($profile->profile_picture)) {
            return asset('storage/' . $profile->profile_picture);
        }

        // 2. Deterministic placeholder (konsisten per account)
        $placeholders = [
            'assets/Placeholder/avatar1.png',
            'assets/Placeholder/avatar2.png',
            'assets/Placeholder/avatar3.png',
        ];

        // account_id = identity utama user
        $index = $profile->account_id % count($placeholders);

        return asset($placeholders[$index]);
    }
}
