<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Volunteer Hub</title>
</head>
<body>
    <nav style="padding: 10px; background: #eee; margin-bottom: 20px;">
        <a href="{{ route('events.index') }}">Home / Events</a>

        @if(session('logged_in'))
            <span style="margin-left: 15px;">
                Logged in as: {{ session('user_name') }} ({{ session('user_role') }})
            </span>

            <form action="{{ route('logout') }}" method="POST" style="display:inline; margin-left: 10px;">
                @csrf
                <button type="submit">Logout</button>
            </form>
        @else
            <a href="{{ route('login.form') }}" style="margin-left: 15px;">Login</a>
            <a href="{{ route('register.form') }}" style="margin-left: 5px;">Register</a>
        @endif
    </nav>

    @if(session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    @if(session('error'))
        <p style="color: red;">{{ session('error') }}</p>
    @endif

    @yield('content')
</body>
</html>
