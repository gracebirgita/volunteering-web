@extends('layouts')

@section('content')
<div class="max-w-3xl mx-auto py-8 space-y-8">

    <h1 class="text-2xl font-bold mb-4">Settings – Relawan</h1>

    {{-- PROFILE --}}
    <section class="border rounded-xl p-4 space-y-3">
        <h2 class="font-semibold">Profile</h2>

        @if(session('status_profile'))
            <p class="text-xs text-green-600">{{ session('status_profile') }}</p>
        @endif

        <form method="POST" action="{{ route('volunteer.settings.profile') }}" class="space-y-3">
            @csrf

            <div>
                <label class="block text-sm">Nama</label>
                <input name="user_name" class="border rounded w-full p-2 text-sm"
                       value="{{ old('user_name', $profile->user_name ?? '') }}">
            </div>

            <div>
                <label class="block text-sm">Email</label>
                <input type="email" name="user_email" class="border rounded w-full p-2 text-sm"
                       value="{{ old('user_email', $profile->user_email ?? ($account->email ?? '')) }}">
            </div>

            <div>
                <label class="block text-sm">No HP</label>
                <input name="user_phone" class="border rounded w-full p-2 text-sm"
                       value="{{ old('user_phone', $profile->user_phone ?? '') }}">
            </div>

            <div>
                <label class="block text-sm">Domisili</label>
                <input name="user_domicile" class="border rounded w-full p-2 text-sm"
                       value="{{ old('user_domicile', $profile->user_domicile ?? '') }}">
            </div>

            <div>
                <label class="block text-sm">Tanggal lahir</label>
                <input type="date" name="user_dob" class="border rounded w-full p-2 text-sm"
                       value="{{ old('user_dob', optional($profile->user_dob ?? null)->format('Y-m-d')) }}">
            </div>

            <div>
                <label class="block text-sm">Minat</label>
                <input name="user_interest" class="border rounded w-full p-2 text-sm"
                       value="{{ old('user_interest', $profile->user_interest ?? '') }}">
            </div>

            <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded text-sm">
                Save Profile
            </button>
        </form>
    </section>

    {{-- PASSWORD --}}
    <section class="border rounded-xl p-4 space-y-3">
        <h2 class="font-semibold">Change Password</h2>

        @if(session('status_password'))
            <p class="text-xs text-green-600">{{ session('status_password') }}</p>
        @endif

        <form method="POST" action="{{ route('volunteer.settings.password') }}" class="space-y-3">
            @csrf

            <div>
                <label class="block text-sm">New Password</label>
                <input type="password" name="password" class="border rounded w-full p-2 text-sm">
            </div>

            <div>
                <label class="block text-sm">Confirm Password</label>
                <input type="password" name="password_confirmation" class="border rounded w-full p-2 text-sm">
            </div>

            <button type="submit" class="bg-indigo-600 text-white px-4 py-2 rounded text-sm">
                Update Password
            </button>
        </form>
    </section>

    {{-- LOGOUT --}}
    <section class="border rounded-xl p-4">
        <h2 class="font-semibold mb-2">Logout</h2>

        <form method="POST" action="{{ route('logout') }}">
            @csrf
            <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded text-sm">
                Logout
            </button>
        </form>
    </section>

</div>
@endsection
