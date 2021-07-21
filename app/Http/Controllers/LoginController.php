<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;


class LoginController extends Controller
{
    /**
     * Login function
     *
     * @param Request $request
     * @return api_token
     */
    public function login(Request $request){
        // if(!Auth::attempt(['email'=>$request->email, 'password'=>$request->password])){
        //     return response()->json([
        //         "success"=>'false',
        //         'status'=>200,
        //     ]);

        $attr = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return $this->error('Credentials not match', 401);
        }
        $user = auth()->user(); //user authentified
        if($user->profil_id == 1){
            $token = $user->createToken('token',['*']);
            return $token->plainTextToken;
        }
        elseif($user->profil_id == 2 ||$user->profil_id == 3 || $user->profil_id == 4){
            $token = $user->createToken('token',['*']);
            return $token->plainTextToken;
        }
        elseif($user->profil_id == 5){
            $token = $user->createToken('token',['*']);
            return $token->plainTextToken;
        }
        elseif($user->profil_id == 6){
            $token = $user->createToken('token',['*']);
            return $token->plainTextToken;
        }
        elseif($user->profil_id == 7){
            $token = $user->createToken('token',['*']);
            return $token->plainTextToken;
        }
        elseif($user->profil_id == 8){
            $token = $user->createToken('token',['*']);
            return $token->plainTextToken;
        }
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


    public function getUsers(Request $request){ 
        $user = auth()->user();
        if ($user->tokenCan('all:user')) {
            return response()->json(['users' => 'ok']);
        }
        return $user;
    }
}
