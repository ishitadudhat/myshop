import React, { useState, useEffect } from 'react';
import { ShoppingCart as CartIcon } from 'lucide-react';
import { CartProvider, useCart } from './context/CartContext';
import ProductCard from './components/ProductCard';
import Cart from './components/Cart';
import ThemeToggle from './components/ThemeToggle';
import { products } from './data/products';

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const { cart, setIsCartOpen } = useCart();
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 bg-white dark:bg-gray-800 shadow-md z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            TechStore
          </h1>
          <div className="flex items-center gap-4">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2"
            >
              <CartIcon className="h-6 w-6 text-gray-700 dark:text-white" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <div className="relative bg-gray-900 text-white">
      <img
        src="https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1600&q=80"
        alt="Hero background"
        className="w-full h-[500px] object-cover opacity-50"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to TechStore
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Discover the latest in technology and gadgets
          </p>
          <a
            href="#products"
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium transition-colors"
          >
            Shop Now
          </a>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Hero />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8" id="products">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
        
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;