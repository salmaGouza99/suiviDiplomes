<?php

namespace App\Http\Controllers;

use App\Models\User;
use SheetDB\SheetDB;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\Response
     */
    // public function index()
    // {
    //     $listUsers=[] ;
    //     foreach (User::with('roles')->get() as $user){
    //         $user=[
    //             'id'=>$user->id,
    //             'email'=>$user->email,
    //             'role'=>Str::replace('_',' ',$user->roles[0]->name),
    //         ];
    //         array_push($listUsers,$user);
    //     }
    //     return response()->json([
    //        'users'=> $listUsers
    //     ]);
    // }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:6',
            'role' => 'required'
        ]);

        $user=User::create(array('email' => $request->email,'password'=>Hash::make($request->password)));
        $user->attachRole($request->role);
        return response()->json([
            'user' =>$user, 
            'message' => 'Utilisateur ajouté !'
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
        $user=User::with('roles')->find($id);
         $user=[
                'id'=>$user->id,
                'email'=>$user->email,
                'roleId' =>$user->roles[0]->id,
                'role'=>Str::replace('_',' ',$user->roles[0]->name),
            ];
        return response()->json([
            'user' => $user,
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
            'message' => 'Utilisateur edité',
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

        return response()->json(['message' => 'Utilisateur supprimé']);
    }

     /**
     * filter users by role
     *
     * @param  int  $role
     * @return \Illuminate\Http\Response
     */
    public function filterByRole($role  )
    {
        $users=array();
        foreach ( User::with('roles')->get() as $user ) 
        {
            //test role
            if($user->roles[0]->id==$role) 
            {
                $users[] = [
                    'id'=>$user->id,
                    'email'=>$user->email,
                    'role'=>Str::replace('_',' ',$user->roles[0]->name),
                ];;
            }
        }    
            
        //return json response
        return response()->json([
           'users' => $users,
        ]);
    }

    /** 
     * search users by email
     *
     * @param string $email
     * @return \Illuminate\Http\Response
     */
     public function search($email = ''){
        $listUsers=[] ;
        foreach (User::where('email','like','%'.$email.'%')->get() as $user){
            $user=[
                'id'=>$user->id,
                'email'=>$user->email,
                'role'=>Str::replace('_',' ',$user->roles[0]->name),
            ];
            array_push($listUsers,$user);
        }
        return response()->json([
           'users'=> $listUsers
        ]);
     }
    
}   
                    