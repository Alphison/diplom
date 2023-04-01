<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class ProfileController extends Controller
{
    public function updateProfile(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' =>'required|string|max:255',
            'surname' =>'required|string|max:255',
            'patronymic' =>'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users,email,'.$request->user()->id,
        ], [
            'email.unique' => "Такой email уже зарегистрирован"
        ]);

        if($validator->fails()){
            return response()->json([
                'message' => 'Error update profile',
                'errors' => $validator->errors()
            ], 422);
        }else{
            $user = User::find($request->user()->id);
            $user->name = $request->name;
            $user->surname = $request->surname;
            $user->patronymic = $request->patronymic;
            $user->email = $request->email;
            $user->update();
            return response()->json([
               'message' => 'Profile updated successfully',
               'user' => $user
            ], 200);
        }
    }
}
