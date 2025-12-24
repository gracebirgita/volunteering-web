@extends('layouts.app')

@section('content')
    <h1>{{ $event->event_name }}</h1>

    @if($event->institute)
        <p>Penyelenggara: <strong>{{ $event->institute->institute_name }}</strong></p>
    @endif

    <p>Lokasi: {{ $event->location }}</p>
    <p>Mulai: {{ $event->start_date }}</p>
    <p>Selesai: {{ $event->finish_date }}</p>
    <p>Kuota: {{ $event->quota }}</p>

    <p>{{ $event->description }}</p>

    <hr>

    @if(session('logged_in'))
        @if(session('user_role') === 'volunteer')
            <form action="{{ route('events.register', $event) }}" method="POST">
                @csrf
                <button type="submit">Daftar sebagai Volunteer</button>
            </form>
        @else
            <p>Role kamu: {{ session('user_role') }} (bukan volunteer, jadi tombol daftar disembunyikan).</p>
        @endif
    @else
        <p><a href="{{ route('login.form') }}">Login untuk mendaftar</a></p>
    @endif

    <p><a href="{{ route('events.index') }}">← Kembali ke daftar event</a></p>
@endsection
