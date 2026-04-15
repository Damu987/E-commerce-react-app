import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import Toast from "../../components/common/Toast";
import { calculateTotals } from "../../utils/cartUtils";
import { FiTrash2, FiShoppingBag, FiMinus, FiPlus } from "react-icons/fi";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [toast, setToast] = useState({ show: false, message: ""});
  const { cartItems, updateQuantity, removeFromCart } = useCart();

  // Use centralized calculation utility for consistency with Checkout
  const { totalItems, totalPrice, totalSavings } = calculateTotals(cartItems);

  const formatPrice = (price) =>
    `₹${Math.round(price).toLocaleString("en-IN")}`;

  if (cartItems.length === 0) {
    return (
      <main className="cart-page" aria-labelledby="cart-heading">
        <section className="empty-cart" role="status">
          <div className="empty-cart-icon">
            <FiShoppingBag size={64} />
          </div>
          <h1 id="cart-heading">Your cart is empty</h1>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/shop" className="go-shop-btn">
            Browse Shop
          </Link>
        </section>
      </main>
    );
  }

  const handleRemove = (id, title) => {
    removeFromCart(id);
    setToast({
      show: true,
      message: `Removed ${title} from cart`,
    });
    setTimeout(() => {
      setToast({ show: false, message: ""});
    }, 3000);
  };

  return (
    <main className="cart-page" aria-labelledby="cart-heading">

      <Toast show={toast.show} message={toast.message} />
      <h1 id="cart-heading">
        Your Cart ({totalItems} {totalItems === 1 ? "item" : "items"})
      </h1>

      {/* Cart Items */}
      <section className="cart-items-list" aria-label="Shopping cart items">
        {cartItems.map((item) => {
          const product = item.product;
          const quantity = item.quantity;

          // Safely access price with fallback
          const currentPrice = product?.price || 0;
          const originalPrice = product?.originalPrice || null;

          const itemTotal = currentPrice * quantity;
          const hasDiscount = originalPrice && originalPrice > currentPrice;
          const originalTotal = hasDiscount ? originalPrice * quantity : null;
          const itemSavings = hasDiscount ? originalTotal - itemTotal : 0;

          return (
            <article
              key={product.id}
              className="cart-item"
              aria-labelledby={`product-${product.id}`}
            >
              <img
                src={product.image || "/placeholder.png"}
                alt={product.title || "Product"}
                className="cart-item-image"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/placeholder.png";
                }}
              />

              <div className="cart-item-info">
                <h2
                  id={`product-${product.id}`}
                  className="cart-item-title"
                >
                  {product.title || "Unnamed Product"}
                </h2>
                <p className="cart-item-category">
                  {product.category || "Uncategorized"}
                </p>

                {/* Price display */}
                <div className="cart-item-price-section">
                  <p className="cart-item-price">
                    {formatPrice(itemTotal)}
                  </p>
                  {hasDiscount && (
                    <p className="cart-item-old-price">
                      {formatPrice(originalTotal)}
                    </p>
                  )}
                </div>

                {hasDiscount && itemSavings > 0 && (
                  <p className="cart-item-savings">
                    You save {formatPrice(itemSavings)}
                  </p>
                )}
              </div>

              {/* Quantity Controls */}
              <div
                className="quantity-controls"
                role="group"
                aria-label={`Change quantity for ${product.title}`}
              >
                <button
                  onClick={() => updateQuantity(product.id, -1)}
                  aria-label="Decrease quantity"
                  disabled={quantity === 1}
                  title={quantity === 1 ? "Minimum quantity is 1" : "Decrease quantity"}
                >
                  <FiMinus aria-hidden="true" />
                </button>

                <span aria-live="polite" aria-atomic="true">
                  {quantity}
                </span>

                <button
                  onClick={() => updateQuantity(product.id, 1)}
                  aria-label="Increase quantity"
                  disabled={quantity >= 99}
                  title={quantity >= 99 ? "Maximum quantity is 99" : "Increase quantity"}
                >
                  <FiPlus aria-hidden="true" />
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() => handleRemove(product.id, product.title)}
                aria-label={`Remove ${product.title} from cart`}
              >
                <FiTrash2 aria-hidden="true" />
                <span>Remove</span>
              </button>
            </article>
          );
        })}
      </section>

      {/* Order Summary */}
      <aside className="cart-summary" aria-label="Order summary">
        <h2>Order Summary</h2>

        <div className="summary-row">
          <span>
            Subtotal ({totalItems} {totalItems === 1 ? "item" : "items"})
          </span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        {totalSavings > 0 && (
          <div className="summary-row savings-row">
            <span>Total Savings</span>
            <span className="savings-amount">
              −{formatPrice(totalSavings)}
            </span>
          </div>
        )}

        <div className="summary-row">
          <span>Delivery</span>
          <span className="free-delivery">Free</span>
        </div>

        <hr />

        <div className="summary-total">
          <span>Total Amount</span>
          <span>{formatPrice(totalPrice)}</span>
        </div>

        {totalSavings > 0 && (
          <p className="total-savings-note">
            You're saving {formatPrice(totalSavings)} on this order!
          </p>
        )}

        <button
          className="checkout-btn"
          aria-label="Proceed to checkout"
          onClick={() => navigate("/checkout")}
        >
          Proceed to Checkout
        </button>

        <Link to="/shop" className="continue-shopping">
          Continue Shopping
        </Link>
      </aside>
    </main>
  );
}

export default Cart;