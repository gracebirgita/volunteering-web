<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
// use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rules; //keamanan sandi
use Inertia\Inertia;
use Inertia\Response;

// additional
use App\Models\Account;
use App\Models\UserProfile;
use App\Models\Institute;
use App\Models\Admin;

// REGISTER
class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */

    // GET tampilkan page REGIST (render react pagenya)
    // resources/Auth/Register.jsx
    public function create(){
        return Inertia::render('Auth/Register');
    }

    // simpan akun (POST regist ke db)
    public function store(Request $request){
        // dd($request->all());
        
        
        // 1. validasi input 
        $validated=$request->validate([
            'email'=> 'required|string|lowercase|email|max:100|unique:accounts,email',
            'password'=> ['required', 'confirmed', Rules\Password::defaults()],
            'role' => 'required|in:user,institute,admin',

            'user_name' => 'sometimes|required|string|max:255',
            'institute_name' => 'sometimes|required|string|max:255',
        ]);
        DB::transaction(function () use ($request) {
                // 2. create account(BASE)
                $account=Account::create([
                    'email'=>$request->email,
                    'password'=> Hash::make($request->password),
                    'role'=> $request->role, //defult role
                ]);
        
                // 3. CHECK & ISI sesuai ROLEnya
                if($account->role=='user'){
                    UserProfile::create([
                        'account_id'=>$account->account_id,
                        'user_name'=>$request->user_name,
                        // 'user_phone'=>'-',
                        // 'user_domicile'=>'-',
                        // 'user_dob'=>now(),
                        // 'user_interest'=>'-',
                    ]);
                }
        
                if($request->role=='institute'){
                    Institute::create([
                        'account_id'=>$account->account_id,
                        'institute_name'=>$request->institute_name,
                        // 'institute_phone'=>'-',
                        // 'institute_pic_name'=>'-',
                        // 'institute_address'=>'-',
                        // 'institute_category'=>'-',
                    ]);
                }
        
                if($request->role=='admin'){
                    Admin::create([
                        'account_id'=>$account->account_id,
                        'admin_name'=>$request->admin_name,
                    ]);
                }
        
        
                // login
                Auth::login($account);
            });
    
            // redirect
            return redirect()->route('dashboard');
    }
}
