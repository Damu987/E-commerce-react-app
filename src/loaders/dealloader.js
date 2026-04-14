import { getAllProducts } from "../api/api";
import { convertToINR } from "../utils/Currency";

export async function dealLoader() {
  try {
    const products = await getAllProducts();
    const DISCOUNT = 20; // 20% off

    return products.map((p) => {
      const inr = convertToINR(p.price);
      return {
        ...p,
        price: Math.round(inr * (1 - DISCOUNT / 100)), // discounted price
        oldPrice: inr, // original price
        discountPercent: DISCOUNT,
      };
    });
  } catch (err) {
    console.error(err);
    return [];
  }
}