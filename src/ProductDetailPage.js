import React, { useState, useEffect } from 'react';
import { getProduct } from './api';
import ProductDetails from './ProductDetails';
import Loading from './Loading';

const ProductDetailPage = ({ productId, onBack }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await getProduct(productId);
        setProduct(response.data);
        setError(null);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) return <Loading />;

  if (error || !product) {
    return (
      <div className="container">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Product not found</h2>
          <button 
            onClick={onBack}
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
            ← Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <ProductDetails 
      product={product} 
      onBack={onBack}
    />
  );
};

export default ProductDetailPage;
