<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'surname' => $this->faker->name(),
            'patronymic' => $this->faker->name(),
            'ava' => $this->faker->imageUrl(640, 480, 'animals', true),
            'email' => $this->faker->unique()->email(),
            'password' => Hash::make('123123'),
        ];
    }
}
