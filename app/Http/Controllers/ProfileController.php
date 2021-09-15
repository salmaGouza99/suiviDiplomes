<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;


class ProfileController extends Controller
{
    /**
     * Display the specified profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        $user = User::with('roles')->find(auth()->user()->id);
         $user=[
                'email'=>$user->email,
                'role'=> $user->roles[0]->name,
            ];
        return response()->json([
            'user' => $user,
        ]);
    }

    /**
     * Update the specified profile in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::with('roles')->find(auth()->user()->id);
        $user->update(['email' => $request->email]);
        if($request->password != null) {
            $user->update(['password'=>Hash::make($request->password)]);
        }

        return response()->json([
            'user' => User::with('roles')->find(auth()->user()->id),
            'message' => 'Profil édité',
        ]);
    }

}
