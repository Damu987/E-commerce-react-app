import React, { useState, useEffect, useCallback } from "react";
import { useLoaderData, useSearchParams, useNavigation } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import ProductSkeleton from "../components/common/ProductSkeleton";
import Toast from "../components/common/Toast";
import "./Shop.css";

function Shop() {
  const data = useLoaderData() || {};
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const products = data.products || [];
  const categories = data.categories || [];

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category") || "all";
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "";

  // LOAD MORE STATE
  const [visibleCount, setVisibleCount] = useState(8);

  // TOAST STATE
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  // SEARCH INPUT STATE (LOCAL) - prevents immediate URL updates
  const [searchInput, setSearchInput] = useState(search);

  // RESET WHEN FILTER CHANGES
  useEffect(() => {
    setVisibleCount(8);
  }, [category, search, sort]);

  // DEBOUNCED SEARCH - waits 500ms before updating URL params
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchInput !== search) {
        updateParams({ search: searchInput });
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchInput]);

  // AUTO-HIDE TOAST AFTER 3 SECONDS
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const updateParams = useCallback((newParams) => {
    const params = {
      category: newParams.category ?? category,
      search: newParams.search ?? search,
      sort: newParams.sort ?? sort,
    };

    if (params.category === "all") delete params.category;
    if (!params.search) delete params.search;
    if (!params.sort) delete params.sort;

    setSearchParams(params);
  }, [category, search, sort, setSearchParams]);

  // HANDLE ADD TO CART - shows toast notification
  const handleAddToCart = useCallback((productName) => {
    setToastMessage(`✓ ${productName} added to cart!`);
    setShowToast(true);
  }, []);

  // FILTER PRODUCTS
  let filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" ||
      product.category.toLowerCase() === category.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  // SORT
  if (sort === "price-low")
    filteredProducts.sort((a, b) => a.price - b.price);

  if (sort === "price-high")
    filteredProducts.sort((a, b) => b.price - a.price);

  return (
    <main className="shop-container">
      {/* TOAST NOTIFICATION */}
      <Toast message={toastMessage} show={showToast} />

      {isLoading ? (
        <ul className="product-grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </ul>
      ) : (
        <>
          {/* HEADER */}
          <header className="shop-header">
            <h1>All Products</h1>
            <p>{filteredProducts.length} products found</p>
          </header>

          {/* SEARCH & FILTERS */}
          <section className="filters">
            <input
              type="text"
              className="search-btn"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <select
              value={sort}
              className="sort-btn"
              onChange={(e) => updateParams({ sort: e.target.value })}
            >
              <option value="">Sort</option>
              <option value="price-low">Low → High</option>
              <option value="price-high">High → Low</option>
            </select>

            <button onClick={() => {
              setSearchParams({});
              setSearchInput("");
            }}>
              Reset
            </button>
          </section>

          {/* CATEGORIES */}
          <div className="category-row">
            {[{ slug: "all", name: "All" }, ...categories].map((cat) => (
              <button
                key={cat.slug}
                onClick={() => updateParams({ category: cat.slug })}
                className={category === cat.slug ? "active" : ""}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* PRODUCTS */}
          <section className="product-grid">
            {filteredProducts.slice(0, visibleCount).map((product) => {
              // Convert price to INR (multiply by 84)
              const priceInINR = Math.round(product.price * 84);
              
              // Create product object with converted price for cart
              const productForCart = {
                ...product,
                price: priceInINR,
              };
              
              return (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.title}
                  price={priceInINR}
                  image={product.image}
                  loading="lazy"
                  width="200"
                  height="200"
                  product={productForCart}
                  onAddToCart={() => handleAddToCart(product.title)}
                />
              );
            })}
          </section>

          {/* LOAD MORE BUTTON */}
          {visibleCount < filteredProducts.length && (
            <div style={{ textAlign: "center", margin: "20px 0" }}>
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="load-more-btn"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}

export default Shop;