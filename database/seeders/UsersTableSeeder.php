<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Crypt;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user1 = User::create([
            'email' => 'asmaa@gmail.com',
            'password' =>Hash::make('password1'),
        ]);
        $user1->attachRole('admin');

        $user2 = User::create([
            'email' => 'salmaa@gmail.com',
            'password' =>Hash::make('password2'),
        ]);
        $user2->attachRole('admin');

        $user3 = User::create([
            'email' => 'chakibe@gmail.com',
            'password' =>Hash::make('password3'),
        ]);
        $user3->attachRole('guichet_retrait');

    }
}
