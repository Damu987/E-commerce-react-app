const BASE_URL = "https://dummyjson.com";

/* ---------------- PRODUCTS ---------------- */

export const getAllProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to load products");

  const data = await res.json();

  return data.products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    rating: p.rating,
    category: p.category,
    image: p.thumbnail,
  }));
};

/* ---------------- FEATURED ---------------- */

export const getFeaturedProducts = async (limit = 4) => {
  const products = await getAllProducts();

  return products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);
};

/* ---------------- CATEGORY PRODUCTS ---------------- */

export const getProductByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error("Category not found");

  const data = await res.json();

  return data.products.map((p) => ({
    id: p.id,
    title: p.title,
    price: p.price,
    rating: p.rating,
    category: p.category,
    image: p.thumbnail,
  }));
};

/* ---------------- SINGLE PRODUCT ---------------- */

export const getProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/products/${id}`);
  if (!res.ok) throw new Error("Product not found");

  const p = await res.json();

  return {
    id: p.id,
    title: p.title,
    price: p.price,
    rating: p.rating,
    category: p.category,
    image: p.thumbnail,
  };
};

/* ---------------- CATEGORIES ----------------*/

// Get categories
export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to load categories");

  const data = await res.json();

 console.log("Categories Raw:", data);
 return data;
};