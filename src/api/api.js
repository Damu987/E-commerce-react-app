const BASE_URL = "https://dummyjson.com";

/**
 * 💡 CENTRALIZED HELPER
 * We add this to ensure every product has the 'image' property 
 * instead of 'thumbnail' so your Cart and Shop work perfectly.
 */
const transformProduct = (p) => ({
  id: p.id,
  title: p.title,
  price: p.price, // Raw USD price
  rating: p.rating,
  category: p.category,
  image: p.thumbnail, // Standardizes the property name
  discountPercentage: p.discountPercentage,
});

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

export const getCategories = async () => {
  const res = await fetch(`${BASE_URL}/products/categories`);
  if (!res.ok) throw new Error("Failed to load categories");

  const data = await res.json();

  console.log("Categories Raw:", data);
  return data;
};

/* ---------------- HOME DATA ----------------*/

export const getHomeData = async () => {
  // We run both fetches in parallel for better performance
  const [productsRes, categoriesRes] = await Promise.all([
    fetch(`${BASE_URL}/products?limit=4&skip=0`),
    fetch(`${BASE_URL}/products/categories`)
  ]);

  if (!productsRes.ok || !categoriesRes.ok) throw new Error("Failed to fetch home data");

  const productsData = await productsRes.json();
  const categoriesData = await categoriesRes.json();

  return {
    // Now transformProduct is defined above, so this won't crash
    featured: productsData.products.map(transformProduct),
    categories: categoriesData
  };
};