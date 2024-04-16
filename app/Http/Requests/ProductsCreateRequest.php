<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductsCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        return [
            'name' => 'required|string|max:64',
            'price' => 'required',
            'description' => 'required',
            'images' => 'required|array',
            'categories' => 'required|array'
        ];
    }
}
