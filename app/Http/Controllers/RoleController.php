<?php

namespace App\Http\Controllers;

use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    public function index (){
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
}
