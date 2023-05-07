<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class UserController extends Controller
{
    public function index(){
        return User::where('role', '!=', 'Админ')->get();
    }

    public function destroy(User $user){
        $user->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }

    public function update(Request $request, User $user){
        $user->role = $request->role;
        $user->update();

        return response($user);
    }
}
