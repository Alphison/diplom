<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\CourseStoreRequest;
use App\Http\Resources\CourseResources;
use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
       return CourseResources::collection(Course::all());
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(CourseStoreRequest $request)
    {
        $data = $request->validated();
        $data['img_course'] = Storage::put('/courses', $data['img_course']);

        $created_course = Course::create($data);

        return new CourseResources($created_course);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return new CourseResources(Course::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(CourseStoreRequest $request, Course $course)
    {
        $data = $request->validated();

        $course->name = $data->name;
        $course->description = $data->description;
        $course->duration = $data->duration;
        $course->user_id = $data->user_id;
        $course->category_id = $data->category_id;
        $course->profession = $data->profession;
        $course->img_course = $data->img_course;
        $course->price = $data->price;
        $course->goal = $data->goal;
        $course->update();

        return response($course);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
