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

    public function store(Request $request)
    {
        $vars = $request->validate([
            'email' => 'required|string|email|',
            'password' => 'required|string|min:6',
            'role' => 'required|string'
        ]);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $user->attachRole($request->role);

        return response()->json([
            'user' => $user,
        ]);
        
    }

    public function show($id)
    {
        $user = User::with('roles')->find($id);
        return response()->json([
                'id' => $user->id,
                'email' => $user->email,
                'role' => $user->roles[0]->name
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::with('roles')->findOrFail($id);

        // update role
        if ($request->role)
        {
            $user->detachRole($user->roles[0]->name);
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
                    User::where('id',$user->id)->update(array('password'=>Hash::make($request->newpassword)));
                }
                else
                {
                    return response()->json([
                        'message' => 'new password can not be the old password!'
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
            'user' => User::with('roles')->find($user->id),
        ]);
    }

    public function destroy($id)
    {
        User::findOrFail($id)->delete();
        return response()->json(['response' => 'User deleted successfully']);
    }

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

    public function search(String $email){
       return response()->json([
            'users' => User::where('email','like','%'.$email.'%')->get()
       ]);
    }


    // public function excel(){
    //     $sheetdb=new SheetDB('ngzpkql8o6vky');
    //     return response()->json([
    //         'sheet' => $sheetdb->get(),
    //     ]);
    // }
}