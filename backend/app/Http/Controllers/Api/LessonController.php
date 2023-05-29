<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LessonStoreRequest;
use App\Http\Resources\LessonResources;
use App\Models\Lesson;
use App\Models\Image;
use App\Models\Video;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class LessonController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Lesson::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' =>'required|max:255',
            'description' =>'required',
            'course_id' =>'required',
            'img.*' => 'required|image|mimes:jpeg,png,jpg',
            'preview' => 'required|image|mimes:jpeg,png,jpg',
            'video.*' => 'required|mimetypes:video/mp4'
        ],
        [
            'img.*' => [
                'image' => 'Файл должен быть изображением',
                'mimes' => 'Изображение должно быть формата jpeg, png, jpg',
                'required' => 'Выберите изображение'
            ],
            'video.*' => [
                'mimetypes' => 'Видео должно быть формата mp4',
                'required' => 'Выберите видео'
            ],
            'preview.image' => 'Файл должен быть изображением',
            'preview.mimes' => 'Изображение должно быть формата jpeg, png, jpg',
            'preview.required' => 'Выберите изображение',
        ]
        );
        if ($validator->fails()) {
            return response([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }else{
            $data = $request->all();
            $data['preview'] = Storage::putFile('lessons', $data['preview']);

            $lesson = Lesson::create($data);

            $images = $request->file('img');
            foreach ($images as $image) {
                $path = Storage::putFile('lessons/' . $lesson->id, $image);
                $lesson->images()->create([
                    'img' => $path,
                ]);
            }


            $videos = $request->file('video');
            foreach ($videos as $video) {
                $path = Storage::putFile('lessons/' . $lesson->id, $video);
                $lesson->videos()->create([
                    'video' => $path,
                ]);
            }


            return response(['message' => 'Add lesson successfully']);
        }
        

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
       return new LessonResources(Lesson::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Lesson $lesson)
    {
        $lesson->delete();

        return response(null, Response::HTTP_NO_CONTENT);
    }
}
