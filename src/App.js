import React, { useState } from 'react';
import './App.css';
import ProductList from './ProductList';
import ProductDetailPage from './ProductDetailPage';

const App = () => {
  const [currentView, setCurrentView] = useState('products'); // 'products' or 'details'
  const [selectedProductId, setSelectedProductId] = useState(null);

  const handleProductClick = (product) => {
    setSelectedProductId(product.id);
    setCurrentView('details');
  };

  const handleBackToProducts = () => {
    setCurrentView('products');
    setSelectedProductId(null);
  };

  return (
    <div className="App">
      {currentView === 'products' ? (
        <ProductList onProductClick={handleProductClick} />
      ) : (
        <ProductDetailPage 
          productId={selectedProductId} 
          onBack={handleBackToProducts}
        />
      )}
      
      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <p>Copyright © 2023 | CodeYogi</p>
            <p>Powered by CodeYogi</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
