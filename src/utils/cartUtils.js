export const calculateTotals = (cartItems) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const totalSavings = cartItems.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum +
        (item.product.originalPrice - item.product.price) *
        item.quantity;
    }
    return sum;
  }, 0);

  return { totalItems, totalPrice, totalSavings };
};