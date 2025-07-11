import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../../../api/api_config';
import { createStripeSession } from '../../../api/api_config';

const Checkout = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const token = localStorage.getItem('accessToken');

  const loadCart = async () => {
    try {
      const data = await getCart(token);
      setCart(data);
      setLoading(false);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      setError(`Failed to fetch cart: ${msg}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadCart();
    } else {
      setError('User not authenticated');
      setLoading(false);
    }
  }, [token]);

  const handleQuantityChange = async (productId, newQuantity) => {
    try {
      const updatedCart = await updateCartItem(token, productId, newQuantity);
      setCart(updatedCart);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(token, productId);
      setCart(updatedCart);
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  const handleStripePayment = async () => {
    try {
      const res = await createStripeSession(token);
      window.location.href = res.url;
    } catch (err) {
      alert('Stripe error: ' + (err.response?.data?.message || err.message));
    }
  };

  const calculateTotalBill = () => {
    if (!cart?.items) return 0;
    return cart.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
  };

  if (loading) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Cart</h2>

      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <>
          <ul className="divide-y divide-gray-200">
            {cart.items?.map((item, idx) => (
              <li key={idx} className="py-4 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-700">
                    {item.product.name}
                  </h4>
                  <div className="text-sm text-gray-500">
                    Quantity:
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.product._id, parseInt(e.target.value))
                      }
                      className="border border-gray-300 rounded w-16 ml-2 px-1 py-0.5"
                    />
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-md text-gray-800 font-semibold">
                    Rs {item.product.price * item.quantity}
                  </p>
                  <p className="text-xs text-gray-400">Rs {item.product.price} each</p>
                  <button
                    className="text-red-500 text-sm mt-1 hover:underline"
                    onClick={() => handleRemoveItem(item.product._id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className="border-t mt-6 pt-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Total</h3>
            <p className="text-xl text-green-600 font-bold">
              Rs {calculateTotalBill()}
            </p>
          </div>
        </>
      )}

      <button
        onClick={handleStripePayment}
        className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg"
      >
        🧾 Pay with card
      </button>

    </div>
  );
};

export default Checkout;
