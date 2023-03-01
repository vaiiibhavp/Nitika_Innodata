<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    
    public function login(Request $request){

        $validator = Validator::make($request->all(),[
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'message' => 'Please entered required fields'
            ],401);
        }

        $credentials = $request->only('email','password');

        $token = JWTAuth::attempt($credentials);

        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Creditials'
            ],401);
        }

        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'message' => 'User logged in Successfully',
            'user' => $user,
            'token' =>  $token,
            'type' => 'bearer'
        ]);

    }

    public function register(Request $request){

        $validator = Validator::make($request->all(),[
            'name' => ['required'],
            'email' => ['required'],
            'password' => ['required'],
            'phone' => ['required'],
            'technology' => ['required'],
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => 'error',
                'message' => 'Please enterd required fields'
            ],401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'technology' => implode(',',$request->technology),
        ]);

        $token = JWTAuth::fromUser($user);

        if(!$token){
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Creditials'
            ],401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'User logged in Successfully',
            'user' => $user,
            'token' =>  $token,
            'type' => 'bearer'
        ]);



    }
}
