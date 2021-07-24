<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;
use Illuminate\Contracts\Encryption\DecryptException;
use SheetDB\SheetDB;

class UsersController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = array();
        foreach ( User::with('roles')->get() as $user ) {
            $users[] = [
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->roles[0]->name
            ];
        }
        return response()->json([
            'users' => $users,
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
        $user = User::create($request->all());
        $user->attachRole($request->role);

        return response()->json([
            'user' => $user,
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
        $user = User::with('roles')->findOrFail($id);

        // update role
        if ($request->role)
        {
            foreach ($user->roles as $role) 
            {
                $user->detachRole($role->name);
            }
            $user->attachRole($request->role);
        }

        // update email
        if ($request->email)
        {
            User::where('id',$user->id)->update(array('email'=>$request->email));
        }

        // update password 
        if ($request->oldpassword and $request->newpassword )
        {
            if (\Hash::check($request->oldpassword , $user->password )) 
            {
                if (!\Hash::check($request->newpassword , $user->password)) 
                {
                    $user->password = Hash::make($request->newpassword);
                    User::where( 'id' , $user->id)->update( array( 'password' =>  $user->password));
                }
     
                else
                {
                    return response()->json(
                        'message','new password can not be the old password!'
                    );
                }
            }
     
            else
            {
                return response()->json(
                    'message','old password doesnt matched!'
                );  
            }
        }

        return response()->json([
            'user' => User::with('roles')->find($user->id),
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
     * @param  String  $role
     * @return \Illuminate\Http\Response
     */
    public function filterByRole($role)
    {
        $users=array();
        foreach ( User::with('roles')->get() as $user ) 
        {
            //test role
            if($user->roles[0]->name==$role) 
            {
                $users[] = [   'id' => $user->id,
                               'email' => $user->email,
                               'role' => $user->roles[0]->name
                            ];
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
     * @param String $email
     * @return \Illuminate\Http\Response
     */
    public function search(String $email){
       return response()->json([
            'users' => User::where('email','like','%'.$email.'%')->get(),
       ]);
    }


    // public function excel(){
    //     $sheetdb=new SheetDB('ngzpkql8o6vky');
    //     return response()->json([
    //         'sheet' => $sheetdb->get(),
    //     ]);
    // }
}