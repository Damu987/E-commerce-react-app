import { useState } from "react";
import { Link, useLoaderData, useNavigation } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import Toast from "../components/common/Toast";
import Spinner from "../components/common/Spinner";
import { 
  FiTruck, 
  FiLock, 
  FiRotateCcw, 
  FiAward,
  FiShoppingCart,
  FiClipboard
} from "react-icons/fi";
import jewelery from "../assets/jewelery.webp";
import menclothing from "../assets/menclothing.webp";
import electronics from "../assets/electronics.webp";
import womenclothing from "../assets/womenclothing.webp";
import image from "../assets/image1.webp"

import "./Home.css";

function Home() {
 const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const USD_TO_INR = 84;
  const { featured = [], categories = [] } = useLoaderData();

  // --- Toast State Logic ---
  const [toast, setToast] = useState({ show: false, message: "" });

  const triggerToast = (productName, priceUsd) => {
    // We calculate the INR price here to match exactly what is shown on the card
    const priceInInr = Math.round(priceUsd * USD_TO_INR);
    setToast({
      show: true,
      message: `Added ${productName} (₹${priceInInr.toLocaleString("en-IN")}) to cart!`,
    });

    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };
  // CATEGORY GROUPING WITH IMAGES (Updated for DummyJSON)
  const categoryGroups = [
    {
      key: "electronics",
      label: "Electronics",
      match: ["smartphones", "laptops", "tablets", "mobile-accessories"],
      image: electronics,
    },
    {
      key: "jewelery",
      label: "Jewelery",
      match: ["womens-jewellery"],
      image: jewelery,
    },
    {
      key: "mens-clothing",
      label: "Men's Clothing",
      match: ["mens-shirts", "mens-shoes", "mens-watches", "tops"],
      image: menclothing,
    },
    {
      key: "womens-clothing",
      label: "Women's Clothing",
      match: [
        "womens-dresses",
        "womens-shoes",
        "womens-watches",
        "womens-bags",
        "tops",
      ],
      image: womenclothing,
    },
  ];

  //FILTER ONLY AVAILABLE GROUPS
  const filteredCategories = categoryGroups.filter((group) =>
    categories.some((cat) => group.match.includes(cat.slug))
  );

  return (
    <main className="home-page">
      {/* Toast component*/}
      <Toast message={toast.message} show={toast.show} />
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="hero-left fade-up">
          <span className="hero-tag">NEW COLLECTION</span>

          <h1 className="hero-heading">
            Discover <span className="highlight">Premium</span> Products
          </h1>

          <p className="description">
            Explore the best deals on electronics, fashion, beauty, and more.
            Quality products at unbeatable prices.
          </p>

          <div className="hero-buttons">
            <Link to="/shop" className="btn-primary">
             <FiShoppingCart className="btn-icon" />
              Shop Now
            </Link>
            <Link to="/shop" className="btn-secondary">
              Explore Categories
            </Link>
          </div>
        </div>

        <div className="hero-right fade-up delay-1">
          <div className="hero-image-wrapper">
            <img src={image} alt="Premium Electronics Collection" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ===== PROMO STRIP ===== */}
      <section className="promo-strip">
        <ul className="promo-list">
          <li className="promo-item">
            <FiTruck className="promo-icon" />
            <span>Free Shipping on Orders Over ₹999</span>
          </li>
          <li className="promo-item">
            <FiLock className="promo-icon" />
            <span>100% Secure Payment</span>
          </li>
          <li className="promo-item">
            <FiRotateCcw className="promo-icon" />
            <span>Easy 30-Day Returns</span>
          </li>
          <li className="promo-item">
            <FiAward className="promo-icon" />
            <span>Premium Quality Guaranteed</span>
          </li>
        </ul>
      </section>

      {/* ===== CATEGORY SECTION ===== */}
      <section className="section-container">
        <div className="section-header">
          <div className="header-text">
            <h2>Shop by Category</h2>
            <p className="sub-text">
              Explore our curated collection across different categories
            </p>
          </div>

          <Link to="/shop" className="see-all">
            View All →
          </Link>
        </div>
        { isLoading ? (
          <Spinner />
        ):(
        <ul className="category-grid">
          {filteredCategories.map((cat, index) => (
            <li key={cat.key} className={`fade-up delay-${index % 3}`}>
              <Link to={`/shop?category=${cat.key}`} className="category-card">
                <img
                  src={cat.image}
                  alt={`${cat.label} Collection`}
                  className="category-img"
                  loading = "lazy"
                />

                <div className="category-overlay">
                  <h3 className="category-name">{cat.label}</h3>
                  <span className="category-cta">Shop Now →</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        )}
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section-container featured-section">
        <div className="section-header">
          <div className="header-text">
            <h2>Featured Products</h2>
            <p className="sub-text">
              Handpicked products just for you - Limited stock available
            </p>
          </div>

          <Link to="/shop" className="see-all">
            View All Products →
          </Link>
        </div>
        {
          isLoading ? (
            <Spinner />
          ):(
        <ul className="product-grid">
          {featured.slice(0, 4).map((product) => {
            // 1. Calculate the INR price (Standardizing to 84)
            const priceInINR = Math.round(product.price * USD_TO_INR);
            const displayImage = product.image || product.thumbnail || product.images?.[0];
            const productForCart = {
              ...product,
              price: priceInINR,
              image: displayImage,
            };
        
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={priceInINR}
                oldPrice={
                  product.discountPercentage
                    ? Math.round(
                        (product.price / (1 - product.discountPercentage / 100)) *
                          USD_TO_INR
                      )
                    : null
                }
                image={displayImage}
                loading="lazy"
                width="200"
                height="200"
                // Pass the MODIFIED product object here
                product={productForCart}
                rating={product.rating}
                discount={product.discountPercentage}
                // Pass product.price (raw USD) to triggerToast so it can do its own conversion
                onAddToCart={() => triggerToast(product.title, product.price)}
              />
            );
          })}
        </ul>
     ) }
      </section>
  {/* ===== PROMO BANNER ===== */}
      <section className="banner-container fade-up">
        <div className="promo-container">
          <div className="promo-content">
            <span className="promo-pill">LIMITED TIME OFFER</span>
            <h2 className="promo-heading">
              Get <span className="highlight">25% OFF</span> on Your First Order
            </h2>
            <p className="promo-coupon">
              Use coupon code at checkout to redeem this exclusive offer
            </p>
            <Link to="/shop" className="promo-button">
              Claim Offer
            </Link>
          </div>

          <div className="promo-discount-coupon">
            <p className="promo-discount-text">YOUR COUPON CODE</p>
            <button
              className="coupon-code"
              onClick={(e) => {
                navigator.clipboard.writeText("LUXE20");
                const btn = e.currentTarget;
                const originalText = btn.innerHTML;
                btn.innerHTML = "Copied!";
                setTimeout(() => {
                  btn.innerHTML = originalText;
                }, 2000);
              }}
              aria-label="Copy coupon code LUXE20"
            >
              LUXE20
              <span style={{ fontSize: "1rem" }}><FiClipboard /></span>
            </button>
            <p className="copytext">Click to copy code</p>
          </div>
        </div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="newsletter-section fade-up delay-1">
        <div className="newsletter-container">
          <div className="newsletter-content">
            <h2>Stay Updated with Latest Deals</h2>
            <p>
              Subscribe to our newsletter and get exclusive offers, early access
              to sales, and product updates delivered to your inbox.
            </p>

            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                className="newsletter-input"
                placeholder="Enter your email address"
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn-newsletter">
                Subscribe
              </button>
            </form>

            <p className="newsletter-disclaimer">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;