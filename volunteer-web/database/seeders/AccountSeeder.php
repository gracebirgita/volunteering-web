<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Faker\Factory as Faker;

class AccountSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create('id_ID');
       
        // RELAWAN
        for ($i=1; $i<=12; $i++){
            $userName=$faker->unique()->name;
            $cleanName = strtolower(str_replace(' ', '.',$userName));
            $email = "{$cleanName}{$i}@gmail.com";
            $totalEvents = $faker->numberBetween(0, 20);

            // id akun baru dibuat
            if(!DB::table('accounts')->where('email', $email)->exists()){
                $accountId=DB::table('accounts')->insertGetId([
                    'email'=> $email,
                    'password'=> Hash::make('vol123'),
                    'role'=>'user',
                    'email_verified_at'=>now(),
                    'created_at'=>now(),
                    'updated_at'=>now(),
                ]);

                // USER PROFILE 
                DB::table('users_profiles')->insert([
                    'account_id'=>$accountId,
                    'user_name'=>$userName,
                    'user_phone' => $faker->phoneNumber(),
                    'user_domicile' => $faker->city(),
                    'user_dob' => $faker->date(),
                    'user_interest' => $faker->randomElement([
                        'Lingkungan',
                        'Sosial',
                        'Pendidikan',
                        'Kesehatan'
                    ]), //category
                    // 'total_event_visited'  => 0,
                    // 'total_volunteer_hour' => 0,
                    // 'total_certificate'    => 0,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }

        }


        // INSTITUTE
        for ($i=1; $i<=10; $i++){
            $companyName = $faker->unique()->company;
            $cleanName = preg_replace('/[^a-z0-9]/', '',strtolower($companyName));
            $instituteEmail="contact{$i}@{$cleanName}.com";

            if(!DB::table('accounts')->where('email', $instituteEmail)->exists()){
                $accountId=DB::table('accounts')->insertGetId([
                    'email'=> $instituteEmail,
                    'password'=> Hash::make('comp123'),
                    'role'=>'institute',
                    'email_verified_at'=>now(),
                    'created_at'=>now(),
                    'updated_at'=>now(),
                ]);

                // INSTITUTE 
                DB::table('institutes')->insert([
                    'account_id'=> $accountId,
                    'institute_name'=> $companyName,
                    'institute_phone'=> $faker->phoneNumber(),
                    'institute_pic_name'=>$faker->name(),
                    'institute_address'=>$faker->address,
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }


    }
}
