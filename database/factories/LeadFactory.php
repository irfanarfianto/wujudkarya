<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Lead>
 */
class LeadFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->safeEmail(),
            'service_interest' => fake()->randomElement(['Web Development', 'Mobile App', 'System Integrator', 'UI/UX Design']),
            'message' => fake()->paragraph(),
            'status' => fake()->randomElement(['new', 'contacted', 'deal', 'closed']),
        ];
    }
}
