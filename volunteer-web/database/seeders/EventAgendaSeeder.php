<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Event;
use App\Models\EventAgenda;

class EventAgendaSeeder extends Seeder
{
    public function run(): void
    {
        //Ambil semua events
        $events = Event::all();

       if ($events->isEmpty()) {
            $this->command->warn('❌ Tidak ada event.');
            return;
        }
        $agendas = [
            [
                'start_time' => '08:00',
                'end_time'   => '08:30',
                'title'      => 'Registrasi dan briefing relawan',
                'description'=> 'Check-in, pembagian atribut, dan pengarahan awal kegiatan',
            ],
            [
                'start_time' => '08:30',
                'end_time'   => '09:00',
                'title'      => 'Ice breaking & pembagian kelompok',
                'description'=> 'Relawan dibagi ke dalam beberapa tim sesuai tugas',
            ],
            [
                'start_time' => '09:00',
                'end_time'   => '11:30',
                'title'      => 'Pelaksanaan kegiatan utama',
                'description'=> 'Relawan menjalankan aktivitas sesuai peran masing-masing',
            ],
            [
                'start_time' => '11:30',
                'end_time'   => '12:00',
                'title'      => 'Penutupan & dokumentasi',
                'description'=> 'Evaluasi singkat, dokumentasi, dan penutupan acara',
            ],
        ];
        foreach ($events as $event){
            foreach ($agendas as $agenda) {
                EventAgenda::create([
                    'event_id'   => $event->event_id,
                    'start_time' => $agenda['start_time'],
                    'end_time'   => $agenda['end_time'],
                    'title'      => $agenda['title'],
                    'description'=> $agenda['description'],
                ]);
            }
        }

        $this->command->info('✅ Event agenda seeded successfully.');
    }
}
