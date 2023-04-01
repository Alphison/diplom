<?php

namespace Database\Factories;


use App\Models\Category;
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
        return [
            'name'=>$this->faker->name(),
            'description'=>$this->faker->text(),
            'data'=>$this->faker->name(),
            'count_lesson'=>$this->faker->randomDigit(),
            'user_id' => $this->faker->numberBetween(1, 3),
            'category_id' => $this->faker->numberBetween(1, 3),
            'profession'=>$this->faker->name(),
            'img_course'=>$this->faker->imageUrl(640, 480, 'animals', true),
            'goal'=>$this->faker->name(),
            'price'=>$this->faker->randomNumber()
        ];
    }
}
