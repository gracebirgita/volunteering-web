<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    //Display Function
    public function index()
    {
        //Get categories from DB
        $categories = Category::query()
            ->orderBy('name', 'asc')
            ->paginate(10)
            ->withQueryString(); // Keeps page numbers during searches

        return Inertia::render('Admin/ContentManage', [ // <--- Check this path matches your file
            'categories' => $categories,
        ]);
    }

    //Store new Category
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:50|unique:categories,name',
            'color' => 'required|string|max:7', // Validate Hex Code
        ]);
    
        Category::create([
            'name' => $validated['name'],
            'slug' => Str::slug($validated['name']),
            'color' => $validated['color'], // Save the color
            'is_active' => true,
        ]);
    
        return redirect()->back();
    }

    //Toggle Category Status
    public function toggleStatus(Category $category)
    {
        $category->update([
            'is_active' => ! $category->is_active
        ]);

        return redirect()->back();
    }

    //Delete Category
    public function destroy(Category $category)
    {
        $category->delete();
        return redirect()->back();
    }
}