import React, { useState, useEffect } from "react";
import { useLoaderData, useSearchParams, useNavigation } from "react-router-dom";
import ProductCard from "../components/common/ProductCard";
import ProductSkeleton from "../components/common/ProductSkeleton";
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

  // RESET WHEN FILTER CHANGES
  useEffect(() => {
    setVisibleCount(8);
  }, [category, search, sort]);

  const updateParams = (newParams) => {
    const params = {
      category: newParams.category ?? category,
      search: newParams.search ?? search,
      sort: newParams.sort ?? sort,
    };

    if (params.category === "all") delete params.category;
    if (!params.search) delete params.search;
    if (!params.sort) delete params.sort;

    setSearchParams(params);
  };

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

          {/* SEARCH */}
          <section className="filters">
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => updateParams({ search: e.target.value })}
            />

            <select
              value={sort}
              onChange={(e) => updateParams({ sort: e.target.value })}
            >
              <option value="">Sort</option>
              <option value="price-low">Low → High</option>
              <option value="price-high">High → Low</option>
            </select>

            <button onClick={() => setSearchParams({})}>
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
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.title}
                price={Math.round(product.price * 84)}
                image={product.image} loading="lazy" width="200" height="200"
                product={product}
              />
            ))}
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