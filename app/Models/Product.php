<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
    ];

    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'product_categories');
    }

    public function thumbnail(): HasMany
    {
        return $this->hasMany(Thumbnail::class);
    }

    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where('name', 'LIKE', '%' . $search . '%');
        }
    }

    public static function filters($name, $min, $max, $categories)
    {
        $search = trim($name);
        $categoriesArr = explode('_', $categories);

        $products = self::search($search)
            ->select('price', 'name', 'id', 'description')
            ->with('categories', 'thumbnail');

        if ($min && $max) {
            $products = $products->whereBetween('price', [$min, $max]);
        } elseif (!$min && $max) {
            $products = $products->where('price', '<=', $max);
        } elseif ($min && !$max) {
            $products = $products->where('price', '>=', $min);
        }

        if (count($categoriesArr) > 0 && $categories) {
            $products->whereHas('categories', function ($query) use ($categoriesArr) {
                $query->whereIn('id', $categoriesArr);
            });
        }

        $paginated = $products->latest()->paginate(100)->withQueryString();

        return $paginated;
    }
}
