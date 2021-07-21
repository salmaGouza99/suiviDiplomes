<?php

namespace Database\Seeders;

use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i=0;$i<8;$i++){
            DB::table('users')->insert([
                'email' => Str::random(10).'@gmail.com',
                'password' => Hash::make('password'),
                'profil_id' => rand(1,8),            
            ]);
        }
    }
}
