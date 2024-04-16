<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoriesCreateRequest;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    public function create(CategoriesCreateRequest $request)
    {
        $args = $request->validated();

        Category::create($args);
    }
}
