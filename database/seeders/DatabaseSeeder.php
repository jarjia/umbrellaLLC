<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Category;
use App\Models\Product;
use App\Models\Thumbnail;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $category = [];

        for ($i = 0; $i <= 1000; $i++) {
            $item = Category::factory()->create();
            array_push($category, $item);
        }

        for ($i = 0; $i <= 100000; $i++) {
            $randomNumber = rand(0, 100);
            $randomNumberForThumbnails = rand(1, 6);

            $item = Product::factory()->create();

            for ($i = 0; $i <= $randomNumberForThumbnails; $i++) {
                Thumbnail::factory()->create([
                    'product_id' => $item['id']
                ]);
            }

            $item->categories()->sync($category[$randomNumber]);
        }
    }
}
