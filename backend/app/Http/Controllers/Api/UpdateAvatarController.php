<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class UpdateAvatarController extends Controller
{
    public function updateAvatar(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'ava' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:5120'
        ],
        [
            'ava.image' => 'Файл должен быть изображением',
            'ava.mimes' => 'Изображение может быть формата jpeg, png, jpg, gif, svg',
            'ava.max' => 'Максимальный размер 5 мб',
            'ava.required' => 'Выберите изображение'
        ]
        );
        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }else{
            $user = User::find($request->user()->id);
            if($request->ava && $request->ava->isValid()){
                $file_name = time().'.'.$request->ava->extension();
                $request->ava->move(public_path('images'), $file_name);
                $path = "images/$file_name";
                $user->ava = $path;
            }
            $user->update();
            return response()->json([
               'message' => 'Avatar updated successfully',
               'user' => $user
            ], 200);
        }
    }
}
