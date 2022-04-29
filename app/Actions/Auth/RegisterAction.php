<?php

namespace App\Actions\Auth;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class RegisterAction
{
 public function run($request) {
     $developRole = Role::developer()->first();
     $user = User::create([
         'name' => $request['name'],
         'email' => $request['email'],
         'password' => Hash::make($request['password'])
     ]);

     $user->roles()->attach($developRole->id);

     return $user;
 }
}
