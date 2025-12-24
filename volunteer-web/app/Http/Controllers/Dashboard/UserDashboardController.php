<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserDashboardController extends Controller
{
    //
    public function index(){
        $account = auth()->user();

        return inertia('Dashboard/User',[
            'profile'=> $account->userProfile,
        ]);
    }
}
