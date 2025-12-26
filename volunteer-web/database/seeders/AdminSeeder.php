<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

// add
use Illuminate\Support\Facades\Hash;
use App\Models\Admin;
use App\Models\Account;


class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $account = Account::create([
            'email'=> 'admin1@volhub.com',
            'password'=> Hash::make('admin123'),
            'role'=>'admin',
        ]);

        Admin::create([
            'account_id'=>$account->account_id,
            'admin_name'=>'admin1',
        ]);
        
    }
}
