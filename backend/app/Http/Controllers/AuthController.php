<?php

namespace App\Http\Controllers;

use App\Models\Document;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth as JWTAuth;

class AuthController extends Controller
{
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => ['required', 'string', 'email'],
            'password' => ['required', 'string'],
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please enter required field',
            ], 401);
        }

        $credentials = $request->only('email', 'password');

        $token = JWTAuth::attempt($credentials);
        if (!$token) {
            return response()->json([
                'status' => 'error',
                'message' => 'Unauthorized',
            ], 401);
        }

        $user = Auth::user();
        return response()->json([
            'status' => 'success',
            'user' => $user,
            'token' => $token,
            'type' => 'bearer',
        ]);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'phone' => 'required',
            'technology' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please enter required field',
            ], 401);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'phone' => $request->phone,
            'technology' => implode(',', $request->technology)
        ]);

        $token = JWTAuth::fromUser($user);
        return response()->json([
            'status' => 'success',
            'message' => 'User created successfully',
            'user' => $user,
            'token' => $token,
            'type' => 'bearer',
        ]);
    }

    public function addDocument(Request $request)
    {
        try {
            if (!JWTAuth::parseToken()->authenticate()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid Token',
                ], 401);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Token',
            ], 401);
        }
        $user = JWTAuth::toUser(JWTAuth::parseToken());
        $validator = Validator::make($request->all(), [
            'document' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 'error',
                'message' => 'Please enter required field',
            ], 401);
        }

        $document = Document::where('user_id',$user->id)->update([
            'description' => $request->document,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Document created successfully',
            'document' => $document,
        ]);
    }

    public function getDocument(Request $request)
    {
        try {
            if (!JWTAuth::parseToken()->authenticate()) {
                return response()->json([
                    'status' => 'error',
                    'message' => 'Invalid Token',
                ], 401);
            }
        } catch (Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'Invalid Token',
            ], 401);
        }
        $user = JWTAuth::toUser(JWTAuth::parseToken());
        $document = Document::where('user_id',$user->id)->first();
        if(empty($document)){
            $document = Document::create([
                'description' => '',
                'user_id' =>$user->id
            ]);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'Document Data',
            'document' => $document->description,
        ]);
    }
}
