import { useNavigate, useLoaderData } from "react-router-dom";
import { useState, useCallback, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import {
  FiArrowLeft, FiStar, FiShoppingCart,
  FiTag, FiPlus, FiMinus,
} from "react-icons/fi";
import Toast from "../../components/common/Toast";
import SmallSpinner from "../../components/common/SmallSpinner";
import "./ProductDetail.css";

const COUPON_CODE = "LUXE20";
const DISCOUNT_PERCENT = 20;
const USD_TO_INR = 84;

/* ================= QUANTITY ================= */
function QuantityControl({ quantity, onIncrement, onDecrement, disabled = false }) {
  return (
    <div className="quantity-box">
      <button className="qty-btn" onClick={onDecrement} disabled={quantity === 1 || disabled}>
        <FiMinus className="qty-icon" />
      </button>

      <span className="qty-display">{quantity}</span>

      <button className="qty-btn" onClick={onIncrement} disabled={disabled}>
        <FiPlus className="qty-icon" />
      </button>
    </div>
  );
}

/* ================= PRICE ================= */
function PriceDisplay({ currentPrice, originalPrice, discountPercent, showDiscount = true }) {
  return (
    <div className="price-display">
      <span className="price-current">
        ₹{currentPrice.toLocaleString("en-IN")}
      </span>

      {originalPrice && originalPrice !== currentPrice && showDiscount && (
        <>
          <span className="price-original">
            ₹{originalPrice.toLocaleString("en-IN")}
          </span>

          {discountPercent > 0 && (
            <span className="discount-badge">
              <FiTag /> {discountPercent}% off
            </span>
          )}
        </>
      )}
    </div>
  );
}

/* ================= COUPON ================= */
function CouponInput({ value, onChange, onApply, error, applied, loading = false }) {
  return (
    <div className="coupon-section">
      <div className="coupon-box">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Enter coupon code"
          disabled={applied}
          className="coupon-input"
        />
        <button className="coupon-btn" onClick={onApply} disabled={applied || loading}>
          {applied ? "Applied" : "Apply"}
        </button>
      </div>

      {error && <p className="coupon-error">{error}</p>}
      {applied && <p className="coupon-success"> Coupon applied!</p>}
    </div>
  );
}

/* ================= BUTTONS ================= */
function ActionButtons({ loading, added, onAddToCart, onBuyNow }) {
  return (
    <div className="cart-buttons">
      <button className={`add-to-cart-btn ${added ? "added" : ""}`} onClick={onAddToCart}>
        {loading ? (
          <>
            <SmallSpinner /> Adding...
          </>
        ) : (
          <>
            <FiShoppingCart /> {added ? "Added!" : "Add to Cart"}
          </>
        )}
      </button>

      <button className="order-now-btn" onClick={onBuyNow}>
        Buy Now
      </button>
    </div>
  );
}

/* ================= MAIN ================= */
export default function ProductDetail() {
  const product = useLoaderData();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [showMore, setShowMore] = useState(false);

  const [state, setState] = useState({
    added: false,
    quantity: 1,
    coupon: "",
    applied: false,
    couponError: "",
    loading: false,
  });

  /* ===== SAFE DESCRIPTION ===== */
  const description = product?.description || "No description available";
  const isLong = description.length > 120;

  /* ===== PRICE ===== */
  const priceInfo = useMemo(() => {
    const inrPrice = Math.round(product.price * USD_TO_INR);
    const discountedPrice = state.applied
      ? Math.round(inrPrice * (1 - DISCOUNT_PERCENT / 100))
      : inrPrice;

    return { inrPrice, discountedPrice };
  }, [product.price, state.applied]);

  /* ===== HANDLERS ===== */
  const handleCouponChange = useCallback((e) => {
    setState(prev => ({
      ...prev,
      coupon: e.target.value,
      couponError: "",
    }));
  }, []);

  const handleApplyCoupon = useCallback(() => {
    if (state.coupon.toUpperCase() === COUPON_CODE) {
      setState(prev => ({
        ...prev,
        applied: true,
        couponError: "",
      }));
    } else {
      setState(prev => ({
        ...prev,
        couponError: "Invalid coupon code! Try LUXE20",
        applied: false,
      }));
    }
  }, [state.coupon]);

  const incrementQuantity = useCallback(() => {
    setState(prev => ({
      ...prev,
      quantity: prev.quantity + 1,
    }));
  }, []);

  const decrementQuantity = useCallback(() => {
    setState(prev => ({
      ...prev,
      quantity: Math.max(1, prev.quantity - 1),
    }));
  }, []);

  const handleAddToCart = async (e) => {
    e.preventDefault();

    setState(prev => ({ ...prev, loading: true }));

    await new Promise(res => setTimeout(res, 600));

    addToCart({ ...product, price: priceInfo.discountedPrice }, state.quantity);

    setState(prev => ({ ...prev, added: true, loading: false }));

    setTimeout(() => {
      setState(prev => ({ ...prev, added: false }));
    }, 2000);
  };

  const handleBuyNow = () => {
    addToCart({ ...product, price: priceInfo.discountedPrice }, state.quantity);
    navigate("/checkout");
  };

  if (!product) return <p>Product not found</p>;

  const rating = product.rating?.rate ?? 4;

  return (
    <main className="pd-container-page">

      <div className="pd-container">

        {/* BACK BUTTON */}
        <div className="back-nav">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <FiArrowLeft />
            <span>Back</span>
          </button>
        </div>

        {/* GRID */}
        <div className="pd-grid">

          {/* IMAGE */}
          <div className="pd-image-box">
            <img src={product.image} alt={product.title} className="pd-image" />
          </div>

          {/* DETAILS */}
          <div className="pd-details">

            <h1 className="pd-title">{product.title}</h1>

            {/* RATING */}
            <div className="rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <FiStar
                    key={i}
                    className={i < Math.round(rating) ? "star filled" : "star"}
                  />
                ))}
              </div>
              <span className="rating-value">{rating.toFixed(1)}</span>
            </div>

            {/* PRICE */}
            <PriceDisplay
              currentPrice={priceInfo.discountedPrice}
              originalPrice={priceInfo.inrPrice}
              discountPercent={state.applied ? DISCOUNT_PERCENT : 0}
              showDiscount={state.applied}
            />

            {/* DESCRIPTION */}
            <p className="pd-description">
              {showMore ? description : description.slice(0, 120)}
              {isLong && (
                <span className="read-more" onClick={() => setShowMore(prev => !prev)}>
                  {showMore ? " Show less" : "... Read more"}
                </span>
              )}
            </p>

            {/* EXTRA INFO */}
            <div className="extra-info">
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Stock:</strong> Available</p>
              <p><strong>Brand:</strong> Premium</p>
            </div>

            {/* COUPON */}
            {!state.applied && (
              <CouponInput
                value={state.coupon}
                onChange={handleCouponChange}
                onApply={handleApplyCoupon}
                error={state.couponError}
                applied={state.applied}
                loading={state.loading}
              />
            )}

            {/* QUANTITY */}
            <QuantityControl
              quantity={state.quantity}
              onIncrement={incrementQuantity}
              onDecrement={decrementQuantity}
            />

            {/* BUTTONS */}
            <ActionButtons
              loading={state.loading}
              added={state.added}
              onAddToCart={handleAddToCart}
              onBuyNow={handleBuyNow}
            />

          </div>
        </div>
      </div>

      <Toast message="Added to cart!" show={state.added} />
    </main>
  );
}