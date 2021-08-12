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

        for($i=0 ; $i <1000 ; $i++){
            $user=User::create([
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
            ]);
            $user->attachRole(random_int(1,8));
        }

    }
}
