<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Invoice>
 */
class InvoiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = fake()->numberBetween(1000000, 50000000);
        $tax = $subtotal * 0.11; // PPN 11%
        
        return [
            'invoice_number' => 'WK/INV/' . date('Y') . '/' . fake()->unique()->numerify('###'),
            'issued_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'due_date' => fake()->dateTimeBetween('now', '+1 month'),
            'subtotal' => $subtotal,
            'tax_amount' => $tax,
            'total' => $subtotal + $tax,
            'status' => fake()->randomElement(['draft', 'sent', 'paid', 'cancelled']),
            'notes' => fake()->optional()->sentence(),
        ];
    }
}
