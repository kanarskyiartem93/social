<?php

namespace App\Http\Controllers\Api;

use App\Actions\Users\UpdateUserDetailsAction;
use App\Actions\Users\UpdateUserPasswordAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeDetailRequest;
use App\Http\Requests\ChangePasswordRequest;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function user()
    {
        return new UserResource(Auth::user());
    }

    public function changePassword(ChangePasswordRequest $request, UpdateUserPasswordAction $action)
    {
        if ($action->run($request->all(), Auth::id())) {
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }

    public function changeDetails(ChangeDetailRequest $request, UpdateUserDetailsAction $action)
    {
        if ($action->run($request->all(), Auth::id())) {
            return response()->json(['success' => true]);
        }
        return response()->json(['success' => false]);
    }
}
