@extends('layouts.app')

@section('content')
    <h2>Login</h2>

    @if($errors->any())
        <ul style="color:red;">
            @foreach($errors->all() as $err)
                <li>{{ $err }}</li>
            @endforeach
        </ul>
    @endif

    <form action="{{ route('login') }}" method="POST">
        @csrf

        <div>
            <label>Email:</label><br>
            <input type="email" name="email" value="{{ old('email') }}">
        </div>

        <div>
            <label>Password:</label><br>
            <input type="password" name="password">
        </div>

        <button type="submit">Login</button>
    </form>

    <p>Don't have an account? <a href="{{ route('register.form') }}">Register</a></p>
@endsection
