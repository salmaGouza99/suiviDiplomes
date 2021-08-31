<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of roles.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $roles=[];
        foreach(Role::all() as $role){
            $role=[
                'id' => $role->id,
                'name'=> $role->name 
            ];
            array_push($roles,$role);
        }
        return response()->json([
            'roles' => $roles
        ]);
        
    }

    /**
     * Store a newly created role in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $role = Role::create(['name' => $request->name]);

        return response()->json([
            'role' => $role, 
            'message' => 'Rôle ajouté'
        ]);
        
    }

    /** 
     * Display the specified role.
     *
     * @param  \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        return response()->json([
            'role' => $role,
        ]);
    }

    /**
     * Update the specified role in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->all());
        return response()->json([
            'role' => $role,
            'message' => 'Rôle édité'
        ]);
    }

    /**
     * Remove the specified role from storage.
     *
     * @param  \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        // delete all users having this role
        foreach (User::with('roles')->get() as $user){
            if($user->roles[0]->name == $role->name) {
                $user->delete();
            }
        }

        // delete the role
        $role->delete();
        return response()->json([
            'message' => 'Rôle supprimé'
        ]);
    }

}