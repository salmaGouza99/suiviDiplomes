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
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6'
        ]);

        if (!Auth::attempt($attr)) {
            return response()->json([
                'message' => 'username or password invalid'
            ]);
        }
        $user = auth()->user();
        $token = $user->createToken('token');
        return response()->json([
            'token' =>$token->plainTextToken,
        ]);
       
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


    /*
     * afficher le profil de l'utlisateur connecté
     *
     * @return json_response
     */
    /* public function show(){
        return response()->json([
            User::find(auth()->user()->id),
            // auth()->user(),
        ]);
    }
    */

    /*
     * update password
     *
     * @param Request $request
     * @return json_response
     */
    /* public function update(Request $request){
        $user = User::find(auth()->user()->id);
        if (Hash::check($request->oldPassword, $user->password)) {
           $user->update([
               'password' => Hash::make($request->newPassword),
           ]);
            return response()->json([
               'response' => 'password updated successfully',
           ]);
           
        }
        return response()->json([
            'response' => 'old password incorrect',
        ]);
        
    } */

}
