import { useEffect } from 'react';
import { markCartPaid } from '../../../api/api_config';

const CheckoutSuccess = () => {
  useEffect(() => {
    const updateCart = async () => {
      const token = localStorage.getItem('accessToken');
      try {
        await markCartPaid(token);
      } catch (e) {
        console.error('Failed to mark cart as paid', e);
      }
    };
    updateCart();
  }, []);

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful 🎉</h1>
      <p className="mt-4">Thank you for your purchase!</p>
    </div>
  );
};

export default CheckoutSuccess;