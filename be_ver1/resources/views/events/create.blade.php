@extends('layouts.app')

@section('content')
<h2>Create Event</h2>

<form action="{{ route('events.store') }}" method="POST">
    @csrf
    <label>Institute ID:</label>
    <input type="number" name="id_institute"><br>

    <label>Event Name:</label>
    <input type="text" name="event_name"><br>

    <label>Description:</label>
    <textarea name="description"></textarea><br>

    <label>Start Date:</label>
    <input type="datetime-local" name="start_date"><br>

    <label>Finish Date:</label>
    <input type="datetime-local" name="finish_date"><br>

    <label>Location:</label>
    <input type="text" name="location"><br>

    <label>Quota:</label>
    <input type="number" name="quota"><br>

    <button type="submit">Create</button>
</form>
@endsection
