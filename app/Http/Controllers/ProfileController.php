<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Hash;

class ProfileController extends Controller
{
    /**
     * Display the specified profile.
     *
     * @return \Illuminate\Http\Response
     */
    public function show()
    {
        return response()->json([
            'the authenticated user' => auth()->user()
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
        $request->validate([
            'email' => 'string|email',
            'newpassword' => 'string|min:6|confirmed'
        ]);

        $user = auth()->user();

        // update email
        $user->update(['email' => $request->email]);

        // update password 
        if ($request->oldpassword and $request->newpassword )
        {
            if (Hash::check($request->oldpassword , $user->password )) 
            {
                if (!Hash::check($request->newpassword , $user->password)) 
                {
                    $user->update(['password' => Hash::make($request->newpassword)]);
                }
                else
                {
                    return response()->json([
                        'message error' => 'new password can not be the old password!'
                    ]);
                }
            }
            else
            {
                return response()->json([
                    'message' => 'old password doesnt matched!'
                ]);  
            }
        }
        return response()->json([
            'the authenticated user' => auth()->user(),
        ]);
    }

}
