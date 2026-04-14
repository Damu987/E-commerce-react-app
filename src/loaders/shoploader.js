import { getAllProducts, getCategories } from "../api/api";

export async function shopLoader() {
  try {
    const [products, categories] = await Promise.all([
      getAllProducts(),
      getCategories(),
    ]);

    return {
      products: products || [],
      categories: categories || [],
    };
  } catch (error) {
    console.error(error);

    return {
      products: [],
      categories: [],
    };
  }
}