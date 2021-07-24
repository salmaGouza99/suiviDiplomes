<?php

namespace Database\Seeders;

use App\Models\User;
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
        $user1 = User::create([
            'email' => 'asma@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user1->attachRole('admin');

        $user2 = User::create([
            'email' => 'salma@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user2->attachRole('admin');

        $user3 = User::create([
            'email' => 'chakib@gmail.com',
            'password' => bcrypt('password'),
        ]);
        $user3->attachRole('guichet_retrait');

    }
}
