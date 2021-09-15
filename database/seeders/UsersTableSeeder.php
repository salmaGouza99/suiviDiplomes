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

        $user=User::create([
            'email' => 'Admin@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(1);

        $user=User::create([
            'email' => 'user1@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(2);

        $user=User::create([
            'email' => 'user2@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(3);

        $user=User::create([
            'email' => 'user3@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(4);

        $user=User::create([
            'email' => 'user4@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(5);

        $user=User::create([
            'email' => 'user5@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(6);

        $user=User::create([
            'email' => 'user6@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(7);

        $user=User::create([
            'email' => 'user7@gmail.com',
            'password' => Hash::make('password'),
        ]);
        $user->attachRole(8);

    }
}
