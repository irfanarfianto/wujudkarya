<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'title',
        'slug',
        'excerpt',
        'description',
        'tech_stack',
        'type',
        'published_at',
        'thumbnail',
        'demo_url',
        'is_featured',
        'private_notes',
    ];

    protected $casts = [
        'tech_stack' => 'array',
        'is_featured' => 'boolean',
        'published_at' => 'date',
    ];

    public function client(): BelongsTo
    {
        return $this->belongsTo(Client::class);
    }

    public function images(): HasMany
    {
        return $this->hasMany(ProjectImage::class);
    }
}
