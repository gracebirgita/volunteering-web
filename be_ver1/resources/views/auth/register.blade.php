@extends('layouts.app')

@section('content')
    <h2>Register</h2>

    @if($errors->any())
        <ul style="color:red;">
            @foreach($errors->all() as $err)
                <li>{{ $err }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('register') }}" method="POST">
        @csrf

        <div>
            <label>Name:</label><br>
            <input type="text" name="name" value="{{ old('name') }}">
        </div>

        <div>
            <label>Email:</label><br>
            <input type="email" name="email" value="{{ old('email') }}">
        </div>

        <div>
            <label>Password:</label><br>
            <input type="password" name="password">
        </div>

        <div>
            <label>Confirm Password:</label><br>
            <input type="password" name="password_confirmation">
        </div>

        <button type="submit">Register</button>
    </form>

    <p>Already have an account? <a href="{{ route('login.form') }}">Login</a></p>
@endsection
