import { getProductById } from "../api/api";

export async function productLoader({ params }) {
  try {
    const product = await getProductById(params.id);
    return product;
  } catch (error) {
    console.error(error);
    return null;
  }
}