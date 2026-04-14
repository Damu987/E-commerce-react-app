// homeLoader.js - Loader for Home component with DummyJSON API

export async function homeLoader() {
  try {
    // Fetch featured products (limit to 4 products)
    const productsResponse = await fetch(
      "https://dummyjson.com/products?limit=4&skip=0"
    );
    
    if (!productsResponse.ok) {
      throw new Error("Failed to fetch products");
    }
    
    const productsData = await productsResponse.json();

    // Fetch all categories
    const categoriesResponse = await fetch(
      "https://dummyjson.com/products/categories"
    );
    
    if (!categoriesResponse.ok) {
      throw new Error("Failed to fetch categories");
    }
    
    const categoriesData = await categoriesResponse.json();

    return {
      featured: productsData.products || [],
      categories: categoriesData || [],
    };
  } catch (error) {
    console.error("Error loading home page data:", error);
    
    // Return empty arrays on error so the page still renders
    return {
      featured: [],
      categories: [],
    };
  }
}

/* 
  DummyJSON API Reference:
  
  1. Get products with pagination:
     https://dummyjson.com/products?limit=10&skip=0
  
  2. Get all categories:
     https://dummyjson.com/products/categories
  
  3. Get products by category:
     https://dummyjson.com/products/category/{categorySlug}
  
  4. Search products:
     https://dummyjson.com/products/search?q=phone
  
  5. Get single product:
     https://dummyjson.com/products/{id}
  
  Category slugs available:
  - smartphones
  - laptops
  - fragrances
  - skincare
  - groceries
  - home-decoration
  - furniture
  - tops
  - womens-dresses
  - womens-shoes
  - mens-shirts
  - mens-shoes
  - mens-watches
  - womens-watches
  - womens-bags
  - womens-jewellery
  - sunglasses
  - automotive
  - motorcycle
  - lighting
*/