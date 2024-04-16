<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Thumbnail extends Model
{
    use HasFactory;

    protected $fillable = [
        'path',
        'product_id'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }
}
