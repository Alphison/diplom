<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseUpdateActiveController extends Controller
{
    public function course_update(Request $request)
    {
        $course = Course::find($request->id);
        $course->active=$request->active;
        $result = $course->save();
        if($result){
            return [
                'result' => 'course_success_update',
                'data' => $course
            ];
        }else{
            return ['result' => 'course_unsuccess_update'];
        }
    }
}
