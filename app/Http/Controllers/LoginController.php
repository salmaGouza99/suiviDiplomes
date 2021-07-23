<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\RoleUser;
use App\Models\role_user;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Laratrust\Traits\LaratrustUserTrait;
use Illuminate\Support\Facades\DB;


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
        $user = auth()->user();
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


    public function getUser(Request $request){ 
        $user = auth()->user();
        $role = DB::table('users')
                ->join('role_user', 'users.id', '=', 'role_user.user_id')
                ->join('roles','role_user.role_id', '=', 'roles.id')
                ->where('users.id',$user->id)->get();

        if ($user->hasRole('admin')) {
            return response()->json([
                'user_connected' => $user,
                'role' => $role ,
        ]);
        }
        
    }
}
