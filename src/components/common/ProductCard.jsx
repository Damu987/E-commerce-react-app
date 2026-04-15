import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FiShoppingCart } from "react-icons/fi";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ 
  id, 
  name, 
  price, 
  oldPrice, 
  image, 
  product,
  rating,
  discount,
  onAddToCart 
}) {
  const { addToCart } = useCart();

  // Calculate discount percentage
  const discountPercent = discount || 
    (oldPrice && price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0);

  // Format rating display
  const ratingValue = rating || product?.rating || 0;
  const reviewCount = product?.reviews?.length || Math.floor(Math.random() * 500) + 50;

  // Memoize star rendering - avoid recalculating on every render
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.round(ratingValue));

  const handleAddToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add to cart
    addToCart(product, 1);
    
    // Trigger toast notification
    if (onAddToCart) {
      onAddToCart(name);
    }
  };

  return (
    <li className="product-item">
      <Link
        to={`/product/${id}`}
        className="product-link"
        aria-label={`View details for ${name}`}
      >
        <article className="product-card">
          
          {/* Discount Badge - Only render if discount exists */}
          {discountPercent > 0 && (
            <div 
              className="discount-badge" 
              aria-label={`${discountPercent}% discount`}
              style={{ '--discount': discountPercent }} 
            >
              -{discountPercent}%
            </div>
          )}

          {/* Image Section */}
          <div className="product-image-wrapper">
            <div className="product-image">
              {image ? (
                <img 
                  src={image} 
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    if (e.target.nextElementSibling) {
                      e.target.nextElementSibling.style.display = 'flex';
                    }
                  }}
                  // Prevent layout shift by using width/height hints
                  width="250"
                  height="250"
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <span className="product-emoji" aria-hidden="true">🛍️</span>
              )}
              {/* Fallback emoji (hidden by default) */}
              {image && (
                <span className="product-emoji" style={{ display: 'none' }} aria-hidden="true">🛍️</span>
              )}
            </div>
          </div>

          {/* Content Section */}
          <div className="product-content">
            
            {/* Title */}
            <h3 className="product-name" title={name}>
              {name}
            </h3>

            {/* Rating & Reviews */}
            <div className="product-rating" aria-label={`Rated ${ratingValue.toFixed(1)} out of 5 stars`}>
              <div className="stars" role="img" aria-label={`${Math.round(ratingValue)} out of 5 stars`}>
               
               <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    i < Math.round(ratingValue) ? (
                      <FaStar key={i} className="star filled" />
                    ) : (
                      <FaRegStar key={i} className="star empty" />
                    )
                  ))}
                </div>
              </div>
              <span className="rating-value" aria-hidden="true">
                {ratingValue.toFixed(1)}
              </span>
              <span className="review-count">
                ({reviewCount.toLocaleString()})
              </span>
            </div>

            {/* Price Section */}
            <div className="price-section">
              <div className="price-wrapper">
                <span className="new-price" aria-label={`Current price ₹${price}`}>
                  ₹{price?.toLocaleString("en-IN")}
                </span>

                {oldPrice && oldPrice > price && (
                  <span className="old-price" aria-label={`Original price ₹${oldPrice}`}>
                    ₹{oldPrice?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>

             
              <div className="savings-container">
                {discountPercent > 0 && (
                  <span className="savings-text">
                    Save ₹{(oldPrice - price)?.toLocaleString("en-IN")}
                  </span>
                )}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              className="add-to-cart-btn"
              onClick={handleAddToCartClick}
              aria-label={`Add ${name} to cart`}
              type="button"
            >
              <span className="btn-icon" aria-hidden="true"><FiShoppingCart /></span>
              <span className="btn-text">Add to Cart</span>
            </button>

          </div>
        </article>
      </Link>
    </li>
  );
}

export default ProductCard;