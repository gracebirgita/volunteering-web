@extends('layouts')

@section('content')
<div class="max-w-6xl mx-auto py-8 space-y-6">

  <div class="flex items-center justify-between">
    <div>
      <h1 class="text-2xl font-bold">Dashboard Organisasi</h1>
      <p class="text-sm text-gray-600">{{ $institute->institute_name }}</p>
    </div>
  </div>

  {{-- STATS --}}
  <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
    <div class="border rounded-xl p-4">
      <p class="text-xs text-gray-500">Total event dibuat</p>
      <p class="text-2xl font-bold">{{ $totalEvents }}</p>
    </div>

    <div class="border rounded-xl p-4">
      <p class="text-xs text-gray-500">Total relawan mendaftar</p>
      <p class="text-2xl font-bold">{{ $totalVolunteers }}</p>
    </div>

    <div class="border rounded-xl p-4">
      <p class="text-xs text-gray-500">Event sedang berjalan</p>
      <p class="text-2xl font-bold">{{ $ongoingEvents }}</p>
    </div>

    <div class="border rounded-xl p-4">
      <p class="text-xs text-gray-500">Event akan datang</p>
      <p class="text-2xl font-bold">{{ $upcomingEvents }}</p>
    </div>

    <div class="border rounded-xl p-4">
      <p class="text-xs text-gray-500">Permintaan persetujuan (opsional)</p>
      <p class="text-2xl font-bold">{{ $pendingApprovals }}</p>
    </div>
  </div>

  {{-- LISTS --}}
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="border rounded-xl p-4">
      <h2 class="font-semibold mb-3">Event yang sedang berjalan</h2>

      @if($ongoingList->isEmpty())
        <p class="text-sm text-gray-500">Tidak ada event berjalan.</p>
      @else
        <ul class="space-y-2">
          @foreach($ongoingList as $e)
            <li class="border rounded-lg p-3">
              <p class="font-medium">{{ $e->event_name }}</p>
              <p class="text-xs text-gray-600">
                {{ $e->event_start }} → {{ $e->event_finish }} • {{ $e->event_location }}
              </p>
            </li>
          @endforeach
        </ul>
      @endif
    </div>

    <div class="border rounded-xl p-4">
      <h2 class="font-semibold mb-3">Event yang akan datang</h2>

      @if($upcomingList->isEmpty())
        <p class="text-sm text-gray-500">Tidak ada event upcoming.</p>
      @else
        <ul class="space-y-2">
          @foreach($upcomingList as $e)
            <li class="border rounded-lg p-3">
              <p class="font-medium">{{ $e->event_name }}</p>
              <p class="text-xs text-gray-600">
                {{ $e->event_start }} → {{ $e->event_finish }} • {{ $e->event_location }}
              </p>
            </li>
          @endforeach
        </ul>
      @endif
    </div>
  </div>


</div>
@endsection
