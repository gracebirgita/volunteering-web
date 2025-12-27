<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InstitutePublicController extends Controller
{
    //
    public function show(Institute $institute)
    {
        $events = $institute->events()->latest()->limit(3)->get();

        return view('institute.public', compact('institute','events'));
    }

}
