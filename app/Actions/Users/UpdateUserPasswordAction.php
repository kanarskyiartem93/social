<?php

namespace App\Actions\Users;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UpdateUserPasswordAction
{
    public function run($request, $userId)
    {
        $user = User::findOrFail($userId);

        if (!Hash::check($request['old_password'], $user->password)) {
            return false;
        }

        $user->password = Hash::make($request['new_password']);
        if (!$user->save()) {
            return false;
        } else {
            return true;
        }
    }

}
