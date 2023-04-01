<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Auth;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Validator;

class AuthController extends Controller
{
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function register(Request $request){
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'patronymic' => 'required|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ], [
            'email.unique' => "Такой email уже зарегистрирован"
        ]);
        if($validator->fails()){
            return response()->json([
                'message' => 'Error registering',
                'errors' => $validator->errors()
            ], 400);
        }
        $user = User::create(array_merge($validator->validated(), ['password' => bcrypt($request->get('password'))]));

        return response()->json([
            'message' => 'success',
            'user' => $user,
        ], 201);
    }

    public function login(Request $request){
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::where('email', $request->get('email'))->first();

        if(!$user || !Hash::check($request->password, $user->password)){
            return response()->json([
               'message' => 'Error logging in',
                'errors' => 'Неверный email или пароль'
            ], 401);
        }

        if($validator->fails()){
            return response()->json($validator->errors()->toJson(), 422);
        }

        if(!$token=auth()->attempt($validator->validated())){
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        return $this->createNewToken($token);
    }

    public function createNewToken($token){
        return response()->json([
            'message' => 'success',
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user'=>auth()->user(),
        ]);
    }

    public function logout(Request $request){
        auth()->logout();
        return response()->json(['message' =>'success'], 201);
    }

    public function me(Request $request){
        return response()->json(auth()->user());
    }
}


// ---------------------
