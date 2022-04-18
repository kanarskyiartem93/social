<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Validator;

class ForgotPasswordController extends Controller
{
    public function sendResetLinkMail(Request $request)
    {
        $validator = Validator::make($request->all(),
            ['email' => 'required|string|email|max:255']);
        if ($validator->fails()) {
            return response(['error' => $validator->errors()->all()], 422);
        }

        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );

        return $response == Password::RESET_LINK_SENT
            ? $this->sendResetLinkResponse($response)
            : $this->sendResetLinkFailedResponse($response);
    }

    public function broker() {
        return Password::broker();
    }

    protected function sendResetLinkResponse($response){
        return response()->json(['message' => 'Email sent', 'response' => $response], 200);
    }

    protected function sendResetLinkFailedResponse($response){
        return response()->json(['message' => 'Fail to send email', 'response' => $response], 500);
    }

}
