<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use SheetDB\SheetDB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'users' => User::with('roles')->paginate(7)
        ]);
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string|min:6|confirmed',
            'role' => 'required|string'
        ]);

        $user=User::create(array('email' => $request->email,'password'=>Hash::make($request->password)));
        $user->attachRole($request->role);
        return response()->json([
            'user' =>$user,
        ]);
        
    }

    /**
     * Display the specified user.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return response()->json([
            'user' => User::with('roles')->find($id),
        ]);
    }

    /**
     * Update the specified user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response 
     */
    public function update(Request $request, $id)
    {
        $user =User::with('roles')->findOrFail($id);
        if($request->role){
            foreach ($user->roles as $role) {
                $user->detachRole($role->name);
            }
            $user->attachRole($request->role);
        }
       
        
        $user->update(array('email' => $request->email,'password'=>Hash::make($request->password)));

        return response()->json([
            'user' =>User::with('roles')->find($user->id),
        ]);
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['response' => 'User deleted successfully']);
    }

     /**
     * filter users by role
     *
     * @param  string  $role
     * @return \Illuminate\Http\Response
     */
    public function filterByRole($role)
    {
        $users=array();
        foreach ( User::with('roles')->paginate(7) as $user ) 
        {
            //test role
            if($user->roles[0]->name==$role) 
            {
                $users[] = $user;
            }
        }    
            
        //return json response
        return response()->json([
           'users' => $users,
        ]);
    }

    /*
     * search users by email
     *
     * @param string $email
     * @return \Illuminate\Http\Response
     */
    /* public function search($email){
       return response()->json([
            'users' => User::where('email','like','%'.$email.'%')->paginate(7),
       ]);
    } */
    
}   
                    