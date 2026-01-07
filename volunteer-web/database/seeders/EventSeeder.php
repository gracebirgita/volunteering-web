<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;
use App\Modls\Category;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');

        $institutes = DB::table('institutes')->pluck('institute_id');
        $categoryIds = DB::table('categories')->pluck('category_id')->toArray();

        if (empty($categoryIds)) {
            $this->command->error('No categories found. Please run CategorySeeder first.');
            return;
        }

        $start  = $faker->dateTimeBetween('-1 month', '+1 month');
        $finish = (clone $start)->modify('+'.rand(1, 5).' days');

        $registrationDeadline = (clone $start)->modify('-'.rand(1, 14).' days');

        foreach ($institutes as $instituteId) {
            $totalEvent = rand(3, 6);

            for ($i = 1; $i <= $totalEvent; $i++) {
                $start  = $faker->dateTimeBetween('-1 month', '+1 month');
                $finish = (clone $start)->modify('+'.rand(1, 5).' days');

                DB::table('events')->insert([
                    'institute_id'          => $instituteId,
                    'category_id'              => $faker->randomElement($categoryIds),
                    'event_name'            => 'Volunteer ' . $faker->words(2, true),
                    'event_description'     => $faker->paragraph(4),
                    'event_location'        => $faker->company(),
                    'address'               => $faker->address(),
                    'event_start'           => $start->format('Y-m-d'),
                    'event_finish'          => $finish->format('Y-m-d'),
                    'event_start_time'      => '08:00',
                    'event_end_time'        => '12:00',
                    'event_location'        => $faker->city(),
                    'address'               => $faker->address(),
                    'quota'                 => rand(10, 100),
                    'registration_deadline' => $registrationDeadline->format('Y-m-d'),
                    'benefit_consumption'   => $faker->boolean(),
                    'benefit_certificate'   => $faker->boolean(),
                    'benefit_jam_volunt'    => $faker->boolean(),
                    'contact_person'        => $faker->phoneNumber(),
                    'group_link'            => null,
                    'event_status'          => $faker->randomElement(['active', 'finished']),
                    'created_at'            => now(),
                    'updated_at'            => now(),
                ]);

            }
        }
    }
}