import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, isCartOpen, setIsCartOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-xl">
        <div className="p-4 flex justify-between items-center border-b dark:border-gray-700">
          <h2 className="text-xl font-semibold flex items-center gap-2 dark:text-white">
            <ShoppingCart />
            Shopping Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-4 overflow-y-auto h-[calc(100vh-180px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 dark:text-gray-400">
              Your cart is empty
            </p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 py-4 border-b dark:border-gray-700"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium dark:text-white">{item.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    ${item.price}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="dark:text-white">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={20} />
                </button>
              </div>
            ))
          )}
        </div>
        
        <div className="p-4 border-t dark:border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold dark:text-white">Total:</span>
            <span className="text-xl font-bold dark:text-white">
              ${cartTotal.toFixed(2)}
            </span>
          </div>
          <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}