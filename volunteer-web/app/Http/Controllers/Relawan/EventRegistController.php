<?php

namespace App\Http\Controllers\Relawan;

use Illuminate\Http\Request;

// add
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

use App\Models\EventRegist;
use App\Models\Event;

class EventRegistController extends Controller
{
    //JOIN, CANCEL, APPROVE (POST ke db)

    // join = userProfile yg sedang login didaftar ke event yang dikunjungi
    // status pending
    public function join(Request $request, Event $event){
        $user = auth()->user();

        // cek user terdaftar/blm
        $alreadyRegistered = EventRegist::where('event_id', $event->event_id)
            ->where('user_id', $user->account_id)
            ->exists();

        if($alreadyRegistered){
            return back()->with('error', 'Anda sudah terdaftar di event ini');
        }
        // Pastikan user memiliki profil terlebih dahulu
        if (!$user->users_profiles) {
            return back()->with('error', 'Silakan lengkapi profil Anda terlebih dahulu.');
        }

        // daftarkan relawan (blm registered)
        $regist = new EventRegist();
        $regist->event_id = $event->event_id;
        $regist->user_id = $user->account_id; // Pastikan ini tidak null
        $regist->regist_status = 'Pending';
        $regist->regist_date=now();
        $regist->save();
        // dd($user->account_id);
        // EventRegist::create([
        //     'event_id'=>$event->event_id,
        //     'user_id'=>$user->account_id,
        //     'regist_status'=>'Pending',
        // ]);

        if($regist->save()) {
            return back()->with('success', 'Berhasil mendaftar sebagai relawan');
        }

        return back()->with('error', 'Gagal mendaftar, silakan coba lagi');
    }

    // CANCEL (jk status masih Pending)
    public function cancel(Event $event){
        $userId = auth()->id();

        $registration = EventRegist::where('event_id', $event->event_id)
            ->where('user_id', $userId)
            ->first();

        if (! $registration) {
            return back()->with('error', 'Anda belum terdaftar di event ini');
        }

        // cancel cmn bs jk masih pending
        if ($registration->regist_status !== 'Pending') {
            return back()->with('error', 'Pendaftaran tidak bisa dibatalkan');
        }

        // delete data
        $registration->delete();

        return back()->with('success', 'Pendaftaran berhasil dibatalkan');
    }


}
