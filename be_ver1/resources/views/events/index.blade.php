@extends('layouts.app')

@section('content')
    <h1>Daftar Event</h1>

    @if($events->isEmpty())
        <p>Belum ada event.</p>
    @else
        <ul>
            @foreach($events as $event)
                <li style="margin-bottom: 10px;">
                    <strong>{{ $event->event_name }}</strong><br>
                    @if($event->institute)
                        <span>By: {{ $event->institute->institute_name }}</span><br>
                    @endif
                    <span>Lokasi: {{ $event->location }}</span><br>
                    <span>Mulai: {{ $event->start_date }}</span><br>
                    <a href="{{ route('events.show', $event) }}">Lihat detail</a>
                </li>
            @endforeach
        </ul>
    @endif
@endsection
