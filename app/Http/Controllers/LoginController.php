<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\RoleUser;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\DB;
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
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

         // check email first
         $user = User::where('email', $attr['email'])->first();

         // check password
         if (!$user || !Hash::check($attr['password'], $user->password)) {
             return response([
                 'message' => 'These credentials do not match our records!'
                 ], 401);
         }

        $token = $user->createToken('token');
        return $token->plainTextToken;
    }


    /**
     * Logout function
     *
     * @param Request $request
     * @return json_responce
     */
    public function logout(Request $request){
        $user = auth()->user(); //user authentified
        $user->tokens()->delete();
        return response()->json(['success' => 'logged out']);
    }


}
