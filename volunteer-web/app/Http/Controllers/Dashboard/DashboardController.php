<?php

namespace App\Http\Controllers\Dashboard;
namespace App\Http\Controllers\Controller;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;


class DashboardController extends Controller
{
    //
    public function index(){
        $account = Auth::user();

        if($account->isAdmin()){
            return redirect()->route('dashboard.admin');
        }
        if($account->isInstitute()){
            return redirect()->route('dashboard.institute');
        }

        return redirect()->route('dashboard.user');
    }
}
