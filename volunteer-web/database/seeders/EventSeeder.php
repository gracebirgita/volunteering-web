<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

// add
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $faker = Faker::create('id_ID');

        // get semua institute
        // event = active, finished
        $institutes=DB::table('institutes')->pluck('institute_id');

        // 1 institute -> many event
        foreach($institutes as $instituteId){
            $totalEvent = rand(3,6); //event 3-6 per institute

            for($i=1; $i<=$totalEvent; $i++){
                $start = $faker->dateTimeBetween('-1 month', '+1 month');
                $finish = (clone $start)->modify('+'.rand(1,5).'days');

                DB::table('events')->insert([
                    'institute_id'   => $instituteId,
                    'event_name'     => $faker->words(3, true),
                    'event_description' => $faker->paragraph(3),
                    'event_start'    => $start->format('Y-m-d'),
                    'event_finish'   => $finish->format('Y-m-d'),
                    'event_location' => $faker->city(),
                    'event_status'   => $faker->randomElement(['active', 'finished']),
                    'event_quota'    => rand(10, 100),
                    'created_at'     => now(),
                    'updated_at'     => now(),
                ]);
            }
        }
    }
}
