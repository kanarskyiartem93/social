<?php

namespace App\Http\Controllers\Api;

use App\Actions\Auth\LoginAction;
use App\Actions\Auth\RegisterAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;

class AuthController extends Controller
{
    public function login(UserLoginRequest $request, LoginAction $action)
    {
        $passwordRequired = $action->run($request->all());
        $tokenContent = $passwordRequired['content'];

        if (!empty($tokenContent['access_token'])) {
            return $passwordRequired['response'];
        }

        return response()->json([
            'message' => 'Invalid credentials'
        ],401);
    }

    public function register(UserRegisterRequest $request, RegisterAction $action)
    {

        $user = $action->run($request);

        if (!$user) {
            return response()->json(['success' => false, 'message' => 'Registration failed'], 500);
        }
        return response()->json(['success' => true, 'message' => 'Registration succeeded'], 200);

    }
}
