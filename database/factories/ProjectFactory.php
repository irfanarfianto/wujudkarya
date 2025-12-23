<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Project>
 */
class ProjectFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = fake()->sentence(3);
        $type = fake()->randomElement(['web', 'mobile', 'system', 'ui/ux']);
        
        return [
            'title' => $title,
            'slug' => Str::slug($title),
            'excerpt' => fake()->paragraph(1),
            'description' => fake()->paragraphs(3, true),
            'tech_stack' => fake()->randomElements(
                ['Laravel', 'React', 'Vue', 'Flutter', 'Tailwind CSS', 'PostgreSQL', 'Docker', 'Figma'], 
                rand(2, 5)
            ),
            'type' => $type,
            'published_at' => fake()->dateTimeBetween('-2 years', 'now'),
            'thumbnail' => null, // Nanti diisi manual atau placeholder
            'demo_url' => fake()->url(),
            'is_featured' => fake()->boolean(20), // 20% featured
            'private_notes' => fake()->optional()->sentence(),
        ];
    }
}
