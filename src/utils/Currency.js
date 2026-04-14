// utils/Currency.js
export function convertToINR(usdPrice, discountPercent = 0) {
  const USD_TO_INR = 93; // exchange rate
  const inr = usdPrice * USD_TO_INR;

  if (discountPercent > 0) {
    return Math.round(inr * (1 - discountPercent / 100)); // discounted price
  }

  return Math.round(inr); // regular price
}

export function oldPriceInINR(usdPrice, discountPercent = 0) {
  const USD_TO_INR = 84;
  const inr = usdPrice * USD_TO_INR;

  if (discountPercent > 0) {
    return Math.round(inr); // old price before discount
  }

  return Math.round(inr);
}