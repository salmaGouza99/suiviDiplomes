<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RoleUser extends Model
{
    use HasFactory;
    protected $table = "role_user";

    protected $fillable = ["user_id"];

    public function roles()
    {
        // "role_user" is table name
        // If we have model RoleUser, then we can use class instead of table name role_user
        return $this->belongsToMany(Role::class, RoleUser::class);
    }
}
