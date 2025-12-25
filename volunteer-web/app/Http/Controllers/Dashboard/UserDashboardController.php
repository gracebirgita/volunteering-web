<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;


class UserDashboardController extends Controller
{
    //
    public function index(){
        $account = auth()->user();

        return inertia('Dashboard/User',[
            // 'user'=> $account->userProfile,
            'user'=>$account,
        ]);
    }
}
