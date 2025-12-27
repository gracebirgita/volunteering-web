<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

// add
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EventRegistSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        // get users profiles (user id) & events.event_id
        // 1 user -> regist 1x per event
        // status = pending, accepted, rejected
        $faker = Faker::create('id_ID');

        $users = DB::table('users_profiles')->pluck('user_id');
        $events= DB::table('events')->pluck('event_id');

        foreach($users as $userId){
            // 1-4 event per user (utk dummy sj)
            $eventSample = $events->random(rand(1,4));

            foreach($eventSample as $eventId){
                DB::table('events_regists')->insert([
                    'user_id'=> $userId,
                    'event_id'=>$eventId,
                    'regist_date'=>now(),
                    'regist_status'=>$faker->randomElement([
                        'Pending',
                        'Accepted',
                        'Rejected',
                    ]),
                    'created_at'=>now(),
                    'updated_at'=>now(),
                ]);
            }
        }


    }
}
