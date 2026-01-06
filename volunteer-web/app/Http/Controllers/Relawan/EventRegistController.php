<?php

namespace App\Http\Controllers\Relawan;

use Illuminate\Http\Request;

// add
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Controller;

use App\Models\EventRegist;
use App\Models\Event;
use App\Models\EventRegistration;

class EventRegistController extends Controller
{
    //JOIN, CANCEL, APPROVE (POST ke db)

    // join = userProfile yg sedang login didaftar ke event yang dikunjungi
    // status pending
    public function join(Request $request, Event $event){
        $user = auth()->user();
        $profile = $user->users_profiles()->first(); 
        // dd($user->users_profiles->user_id);
        // cek user terdaftar/blm
        
        // 2. Cek Kelengkapan Data (hrs ada data diri profil diisi)
        if (!$profile || $profile->user_phone == '-' || $profile->user_domicile == '-'||
            empty(trim($profile->user_phone)) || empty($profile->user_domicile)) {
            return back()->with('error', 'Lengkapi data nomor telepon dan domisili profil Anda');
        }
        
        // 3. cek menggunakan user_id PROFIL sdh terdaftar/blm
        $alreadyRegistered = EventRegistration::where('event_id', $event->event_id)
            ->where('user_id', $user->users_profiles->user_id) 
            ->exists();
        if($alreadyRegistered){
            return back()->with('error', 'Anda sudah terdaftar di event ini');
        }


        // daftarkan relawan (blm registered)
        $regist = new EventRegistration();
        $regist->event_id = $event->event_id;
        $regist->user_id = $user->users_profiles->user_id; // pastikan tidak null
        $regist->regist_status = 'Pending';
        $regist->regist_date=now();
        // dd($user->account_id);
        

        if($regist->save()) {
            return back()->with('success', 'Berhasil mendaftar sebagai relawan');
        }

        return back()->with('error', 'Gagal mendaftar, silakan coba lagi');
    }

    // CANCEL (jk status masih Pending)
    public function cancel(Event $event){
        $user = auth()->user();

        $registration = EventRegistration::where('event_id', $event->event_id)
            ->where('user_id', $user->users_profiles->user_id)
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
