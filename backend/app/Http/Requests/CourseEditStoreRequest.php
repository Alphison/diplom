<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CourseEditStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' =>'required|max:255',
            'description' =>'required',
            'price' =>'required|numeric|min:0',
            'duration' => 'required',
            'category_id' => 'required',
            'user_id' =>'required',
            'profession' => 'required',
            'goal' => 'required',
            'img_course' => 'nullable|image|mimes:jpeg,png,jpg'
        ];
    }

    public function messages()
    {
        return [
            'img_course.image' => 'Файл должен быть изображением',
            'img_course.mimes' => 'Изображение может быть формата jpeg, png, jpg',
        ];
    }
}
