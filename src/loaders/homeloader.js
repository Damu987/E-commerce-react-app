import { getHomeData } from "../api/api"; 

export async function homeLoader() {
  try {
    const data = await getHomeData();

    return {
      //each product has an 'image' property mapped from 'thumbnail'
      featured: (data.featured || []).map(product => ({
        ...product,
        image: product.image || product.thumbnail 
      })),
      categories: data.categories || [],
    };
  } catch (error) {
    console.error("Error loading home page data:", error);
    return { featured: [], categories: [] };
  }
}