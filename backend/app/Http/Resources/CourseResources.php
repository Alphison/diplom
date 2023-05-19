<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CourseResources extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'duration' => $this->duration,
            'user_id' => $this->user_id,
            'category_id' => $this->category_id,
            'profession' => $this->profession,
            'img_course' => $this->img_course,
            'goal' => $this->goal,
            'price' => $this->price,
            'active' => $this->active,
            'created_at' => $this->created_at,
        ];
    }
}
