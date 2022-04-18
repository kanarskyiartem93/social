<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\PasswordReset;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;

class ResetPasswordController extends Controller
{
    public function reset(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|between:8,255',
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response(['errors' => $validator->errors()->all()], 422);
        }

        $response = $this->broker()->reset($this->credentials($request), function (User $user, $password) {
            $this->resetPassword($user, $password);
        });

        return $response == Password::PASSWORD_RESET
            ? $this->sendResetResponse($response)
            : $this->sendResetFailedResponse($response);

    }

    protected function credentials(Request $request)
    {
        return $request->only('email', 'password', 'password_confirmation', 'token');
    }

    protected function resetPassword(User $user, $password)
    {
        $this->setUserPassword($user, $password);
        $user->setRememberToken(Str::random(60));
        $user->save();
        event(new PasswordReset($user));
    }

    protected function setUserPassword(User $user, $password)
    {
        $user->password = Hash::make($password);
    }

    public function broker()
    {
        return Password::broker();
    }

    protected function sendResetResponse($response)
    {
        return response()->json([
            "message" => "Password reset succeeded",
            "response" => $response
        ], 200);
    }

    protected function sendResetFailedResponse($response)
    {
        return response()->json([
            "message" => "Password reset failed",
            "response" => $response
        ], 500);
    }
}
