<?php

namespace App\Http\Controllers;

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
