<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    /**
     * Login function
     *
     * @param Request $request
     * @return api_token
     */
    public function login(Request $request){
        $attr = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:5'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'msgError' => 'Email ou mot de passe est incorrect.'
            ]);
        }
        $user = auth()->user();
        $token = $user->createToken('token')->plainTextToken;
        return response()->json([
            'user' => User::with('roles')->find(auth()->user()->id),
            'accessToken' => $token,
        ]);
    }

}
