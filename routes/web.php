<?php

use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['controller' => AdminController::class], function () {
    Route::get('/', 'index')->name('home.page');
    Route::get('/admin', 'indexCategories')->name('admin.page');
    Route::get('/product/{product}', 'show')->name('product.details.page');
});

Route::group(['controller' => ProductsController::class, 'prefix' => '/api'], function () {
    Route::post('/product', 'create')->name('create.product');
    Route::delete('/product/{product}', 'destroy')->name('destroy.product');
});

Route::group(['controller' => CategoriesController::class, 'prefix' => '/api'], function () {
    Route::post('/category', 'create')->name('create.category');
});
