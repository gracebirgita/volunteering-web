<?php

// lokasi di folder dashboard
namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class InstituteDashboardController extends Controller
{
    //
    public function index(){
        $account = auth()->user();

        return inertia('Dashboard/Institute',[
            'institute'=> $account->institute,
        ]);
    }
}
