import React, { useState, useEffect } from 'react';
import { getProductList } from './api';
import Loading from './Loading';
import './App.css';

const ProductList = ({ onProductClick }) => {
  const [sortBy, setSortBy] = useState('default');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await getProductList();
        setProducts(response.data.products);
        setError(null);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push('☆');
    }
    return stars.join('');
  };

  const calculateOriginalPrice = (price, discountPercentage) => {
    if (!discountPercentage || discountPercentage === 0) return null;
    return (price / (1 - discountPercentage / 100)).toFixed(2);
  };

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'title':
        return a.title.localeCompare(b.title);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'default':
      default:
        return a.id - b.id;
    }
  });

  const ProductCard = ({ product }) => (
    <div className="product-card" onClick={() => onProductClick(product)}>
      {product.discountPercentage > 10 && <div className="sale-badge">Sale</div>}
      <img 
        src={product.thumbnail || product.images?.[0]} 
        alt={product.title}
        className="product-image"
        loading="lazy"
        decoding="async"
      />
      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">{product.title}</h3>
        <div className="product-rating">
          <span className="stars">{renderStars(product.rating)}</span>
        </div>
        <div className="product-price">
          <span className="current-price">${product.price}</span>
          {product.discountPercentage > 0 && (
            <span className="original-price">
              ${calculateOriginalPrice(product.price, product.discountPercentage)}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="container">
          <div style={{
            textAlign: 'center',
            padding: '50px',
            color: '#d32f2f'
          }}>
            <h2>Error Loading Products</h2>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 20px',
                backgroundColor: '#ff9900',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginTop: '20px'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container">
          <div className="header-content">
            <img src="/Amazon_logo.svg" alt="Amazon" className="logo" />
            <div className="search-and-controls">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="default">Sort by: Featured</option>
                <option value="title">Sort by: Title</option>
                <option value="price-low">Sort by: Price (Low to High)</option>
                <option value="price-high">Sort by: Price (High to Low)</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="results-info">
            <span>{sortedProducts.length} results</span>
          </div>
          
          <div className="products-grid">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductList;
