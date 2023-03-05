<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Foundation\Auth\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $userIds = \App\Models\User::all()->pluck('id')->toArray();
        return [
            'name'=>$this->faker->name(),
            'description'=>$this->faker->text(),
            'data'=>$this->faker->name(),
            'count_lesson'=>$this->faker->randomDigit(),
            'user_id' => $this->faker->randomElement($userIds),
            'profession'=>$this->faker->name(),
            'img_course'=>$this->faker->imageUrl(640, 480, 'animals', true),
            'goal'=>$this->faker->name(),
            'price'=>$this->faker->randomElement($userIds)
        ];
    }
}
