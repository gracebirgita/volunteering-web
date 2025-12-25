<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminDashboardController extends Controller
{
    //
    public function index(){
        $account = auth()->user();

        return inertia('Dashboard/Admin',[
            'admin'=> $account->admin,
        ]);
    }
}
