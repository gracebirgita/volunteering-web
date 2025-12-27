<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class InstituteSettingsController extends Controller
{
    //
    public function edit()
    {
        $account = auth()->user();

        $institute = Institute::where('account_id', $account->account_id)->firstOrFail();

        return view('institute.settings', compact('institute'));
    }

    public function update(Request $request)
    {
        $request->validate([
            'institute_name' => 'required|max:50',
            'institute_phone' => 'required|max:20',
            'institute_pic_name' => 'required|max:50',
            'institute_address' => 'required|max:255',
            'institute_category' => 'required|max:20',
        ]);

        Institute::where('institute_id', $request->id)->update($request->except('_token'));

        return back()->with('status', 'Institute updated!');
    }

}
