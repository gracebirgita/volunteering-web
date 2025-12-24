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
            return redirect()->route('admin.dashboard');
        }
        if($account->isInstitute()){
            return redirect()->route('institute.dashboard');
        }

        return redirect()->route('user.dashboard');
    }
}
