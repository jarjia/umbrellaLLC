<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductsCreateRequest;
use App\Models\Product;
use App\Models\Thumbnail;

class ProductsController extends Controller
{
    public function create(ProductsCreateRequest $request)
    {
        $args = $request->validated();

        $product = Product::create([
            'name' => $args['name'],
            'description' => $args['description'],
            'price' => $args['price']
        ]);

        foreach (request()->file('images') as $img) {
            $filePath = $img->store('assets', 'public');
            Thumbnail::create([
                'path' => $filePath,
                'product_id' => $product->id
            ]);
        }

        $product->categories()->sync(array_unique($args['categories']));

        return redirect('admin')->with('Product posted successfully');
    }

    public function destroy(Product $product)
    {
        $product->delete();
    }
}
