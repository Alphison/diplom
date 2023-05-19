<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\CourseUpdateActiveController;
use App\Http\Controllers\Api\LessonController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\UpdateAvatarController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\CourseUser;
use App\Http\Controllers\Api\LessonUserController;
use App\Models\LessonUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResources([
    'courses' => CourseController::class,
    'category' => CategoryController::class,
    'users' => UserController::class,
    'lessons' => LessonController::class,
    'course_user' => CourseUser::class,
    'lesson_user' => LessonUserController::class,
]);

Route::post('/course_update', [CourseUpdateActiveController::class, 'course_update']);

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/me', [AuthController::class, 'me']);
});

Route::group(['middleware' => 'api', 'prefix' => 'profile'], function ($router) {
    Route::post('/updateAvatar', [UpdateAvatarController::class, 'updateAvatar']);
    Route::post('/updateProfile', [ProfileController::class, 'updateProfile']);
    Route::post('/updateRole', [ProfileController::class, 'updateRole']);
});