import React, { useState } from 'react';
import './ProductDetails.css';

const ProductDetails = ({ product, onBack }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return <div>Product not found</div>;
  }

  const calculateOriginalPrice = (price, discountPercentage) => {
    if (!discountPercentage || discountPercentage === 0) return null;
    return (price / (1 - discountPercentage / 100)).toFixed(2);
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.title} to cart`);
    // Add to cart logic here
  };

  return (
    <div className="product-details">
      <div className="container">
        <button className="back-button" onClick={onBack}>
          ← Back to Products
        </button>
        
        <div className="product-details-content">
          <div className="product-image-section">
            <img 
              src={product.thumbnail || product.images?.[selectedImage] || product.images?.[0]} 
              alt={product.title}
              className="product-details-image"
            />
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-images">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                    onClick={() => setSelectedImage(index)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="product-info-section">
            <h1 className="product-details-title">{product.title}</h1>
            
            <div className="product-details-price">
              <span className="current-price">${product.price}</span>
              {product.discountPercentage > 0 && (
                <span className="original-price">
                  ${calculateOriginalPrice(product.price, product.discountPercentage)}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="discount-badge">
                  {Math.round(product.discountPercentage)}% OFF
                </span>
              )}
            </div>
            
            <div className="product-rating">
              <span className="rating-value">{product.rating} ★</span>
              <span className="rating-count">({product.reviews?.length || 0} reviews)</span>
            </div>
            
            <div className="product-description">
              <p>{product.description || 'No description available.'}</p>
            </div>
            
            <div className="product-actions">
              <input
                type="number"
                id="quantity"
                min="1"
                max="10"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                className="quantity-input"
              />
              
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
