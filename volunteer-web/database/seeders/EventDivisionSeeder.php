<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventDivision;



class EventDivisionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $divisions = [
            ['name' => 'Publication', 'quota' => 10],
            ['name' => 'Marketing', 'quota' => 8],
            ['name' => 'Operation', 'quota' => 12],
        ];

        foreach (Event::all() as $event) {
            foreach ($divisions as $d) {
                EventDivision::create([
                    'event_id' => $event->event_id,
                    'name' => $d['name'],
                    'quota' => $d['quota'],
                ]);
            }
        }
    }
}
