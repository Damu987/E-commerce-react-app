import { useLoaderData } from "react-router-dom";
import { useState, useCallback, memo } from "react";
import ProductCard from "../components/common/ProductCard";
import { FiTag, FiMail } from "react-icons/fi";
import "./Deal.css";

const COUPON_CODE = "LUXE20";
const DISCOUNT_PERCENT = 20;

/* Memoized Newsletter Form Component */
const NewsletterForm = memo(({ onSubmit, email, onChange, subscribed }) => (
  <form className="newsletter-form" onSubmit={onSubmit}>
    <div className="newsletter-input-wrapper">
      <input
        type="email"
        placeholder="Enter your email address"
        className="newsletter-input"
        value={email}
        onChange={onChange}
        required
        aria-label="Email address"
      />
      <button 
        type="submit" 
        className="btn-newsletter"
        aria-label="Subscribe to newsletter"
      >
        Subscribe
      </button>
    </div>
    {subscribed && (
      <p className="newsletter-success" role="status">
        ✓ Successfully subscribed! Check your email for the coupon code.
      </p>
    )}
  </form>
));

NewsletterForm.displayName = 'NewsletterForm';

/* Memoized Offer Banner Component */
const OfferBanner = memo(() => (
  <section className="deal-offer-banner" aria-label="Special offer">
    <h1>
      <span className="banner-icon">
        <FiTag size={32} />
      </span>
      Limited Time Offer: {DISCOUNT_PERCENT}% OFF
    </h1>
    <p>
      Use code: <strong className="coupon-highlight">{COUPON_CODE}</strong> at checkout
    </p>
  </section>
));

OfferBanner.displayName = 'OfferBanner';

/* Memoized Header Component */
const DealsHeader = memo(({ productCount }) => (
  <header className="deals-header">
    <h2>Today's Best Deals</h2>
    <p>{productCount} exclusive offers curated just for you</p>
  </header>
));

DealsHeader.displayName = 'DealsHeader';

/* Memoized Product Grid Component */
const ProductGrid = memo(({ products, formatPrice }) => (
  <ul aria-label="Deal products">
    <li className="deals-grid">
      {products.map((product) => (
        <section key={product.id}>
          <ProductCard
            id={product.id}
            name={product.title}
            price={formatPrice(product.price)}
            oldPrice={formatPrice(product.price * 1.2)}
            image={product.image} width="200" height="200"
            product={product}
          />
        </section>
      ))}
    </li>
  </ul>
));

ProductGrid.displayName = 'ProductGrid';

/* Main Deal Component */
export default function Deal() {
  const dealProducts = useLoaderData();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  /* Optimized handlers */
  const handleNewsletterSubmit = useCallback((e) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Subscribed with email:", email);
      setSubscribed(true);
      setEmail("");
      
      /* Auto-hide success message after 3 seconds */
      const timer = setTimeout(() => setSubscribed(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [email]);

  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  /* Memoized price formatter */
  const formatPrice = useCallback((price) => {
    return `${Math.round(price).toLocaleString("en-IN")}`;
  }, []);

  return (
    <main className="deals-page">
      <OfferBanner />
      <DealsHeader productCount={dealProducts.length} />
      <ProductGrid products={dealProducts} formatPrice={formatPrice} />

      <section className="newsletter-section" aria-labelledby="newsletter-heading">
        <div className="newsletter-container">
          <div className="newsletter-icon">
            <FiMail size={40} />
          </div>
          <h2 id="newsletter-heading">Join Our Newsletter & Save {DISCOUNT_PERCENT}%</h2>
          <p>
            Subscribe now and get <strong>{COUPON_CODE}</strong> code sent to your inbox
          </p>

          <NewsletterForm
            onSubmit={handleNewsletterSubmit}
            email={email}
            onChange={handleEmailChange}
            subscribed={subscribed}
          />

          <p className="newsletter-disclaimer">
            By subscribing, you agree to receive promotional emails. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </main>
  );
}