<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index(Request $request)
    {
        $query = $request->query();

        $products = Product::filters(
            $query['name'] ?? null,
            $query['min'] ?? null,
            $query['max'] ?? null,
            $query['categories'] ?? null
        );

        return Inertia::render('Home', [
            'products' => $products,
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function indexCategories()
    {
        return Inertia::render('Admin', [
            'categories' => Category::select('id', 'name')->get()
        ]);
    }

    public function show(Product $product)
    {
        $product->load('categories', 'thumbnail');

        return Inertia::render('Show', [
            'product' => $product
        ]);
    }
}
