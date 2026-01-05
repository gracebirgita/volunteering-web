<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class EventSeeder extends Seeder
{
    public function run(): void
    {
        $faker = Faker::create('id_ID');
        $institutes = DB::table('institutes')->pluck('institute_id');

        foreach ($institutes as $instituteId) {
            $totalEvent = rand(3, 5);

            for ($i = 1; $i <= $totalEvent; $i++) {
                $start = $faker->dateTimeBetween('-1 month', '+2 months');
                $finish = (clone $start)->modify('+' . rand(1, 3) . ' days');
                $deadline = (clone $start)->modify('-' . rand(2, 7) . ' days');

                DB::table('events')->insert([
                    'institute_id'          => $instituteId,
                    'category'              => $faker->randomElement(['Lingkungan', 'Sosial', 'Pendidikan', 'Kesehatan']),
                    'event_name'            => 'Volunteer ' . $faker->words(2, true),
                    'event_description'     => $faker->paragraph(4),
                    'event_location'        => $faker->company(),
                    'address'               => $faker->address(),
                    'event_start'           => $start->format('Y-m-d'),
                    'event_finish'          => $finish->format('Y-m-d'),
                    'registration_deadline' => $deadline->format('Y-m-d'),
                    'event_start_time'      => '08:00',
                    'event_end_time'        => '17:00',
                    'event_quota'           => rand(20, 100),
                    'thumbnail'             => null,
                    'benefit_consumption'   => $faker->boolean(),
                    'benefit_certificate'   => $faker->boolean(),
                    'benefit_jam_volunt'    => $faker->boolean(),
                    'other_benefit'         => $faker->randomElement(['Kaos', 'E-Wallet', 'Snack', null]),
                    'contact_person'        => $faker->phoneNumber(),
                    'group_link'            => 'https://chat.whatsapp.com/' . $faker->regexify('[A-Za-z0-9]{22}'),
                    'event_status'          => $faker->randomElement(['active', 'closed']),
                    'created_at'            => now(),
                    'updated_at'            => now(),
                ]);
            }
        }
    }
}