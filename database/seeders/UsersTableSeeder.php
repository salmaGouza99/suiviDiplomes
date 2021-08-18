<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        for($i=1 ; $i <7 ; $i++){
            $user=User::create([
                'email' => 'salma'.$i.'@gmail.com',
                'password' => Hash::make('password'),
            ]);
            $user->attachRole($i);
        }

    }
}
