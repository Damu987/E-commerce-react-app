import React from "react";
import "./ProductSkeleton.css";

function ProductSkeleton() {
  return (
    <div className="product-skeleton-card">
      <div className="product-grid">
      <div className="skeleton-image"></div>
      <div className="skeleton-text title"></div>
      <div className="skeleton-text price"></div>
      </div>
    </div>
  );
}

export default ProductSkeleton;