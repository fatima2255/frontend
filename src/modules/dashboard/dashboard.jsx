import { useEffect, useState } from 'react';
import {
  fetchAllProducts,
  fetchPaginatedProducts,
  addProduct,
  deleteProduct,
  updateProduct,
  addToCart,
} from '../../api/api_config';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stockQuantity: '',
  });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentPage, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const role = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const loadProducts = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/signin');
        return;
      }

      try {
        const data = await fetchPaginatedProducts(currentPage);
        setProducts(data.products || []);
        setTotalPages(data.totalPages || 1);
      } catch (err) {
        setError(err.message);
        if (err.message.toLowerCase().includes('jwt')) {
          navigate('/signin');
        }
      }
    };

    loadProducts();
  }, [navigate, currentPage]);

  const handleSignOut = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('role');
    navigate('/signin');
  };

  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleAddProduct = async () => {
    try {
      await addProduct(newProduct);
      setShowModal(false);
      setNewProduct({ name: '', description: '', price: '', category: '', stockQuantity: '' });
      const data = await fetchPaginatedProducts(currentPage);
      setProducts(data.products);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  const handleUpdateSubmit = async () => {
    try {
      await updateProduct(selectedProduct._id, selectedProduct);
      setShowUpdateModal(false);
      const data = await fetchPaginatedProducts(currentPage);
      setProducts(data.products);
    } catch (err) {
      alert(err.message);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) setPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setPage(currentPage + 1);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">All Products</h2>
        <button
          onClick={handleSignOut}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-4">
        {products.map((product) => (
          <li
            key={product._id}
            className="p-4 bg-gray-100 rounded shadow relative cursor-pointer hover:bg-gray-200"
            onClick={() => {
              if (role === 'admin') {
                setSelectedProduct(product);
                setShowUpdateModal(true);
              }
            }}
          >
            <p><strong>Name:</strong> {product.name}</p>
            <p><strong>Price:</strong> Rs.{product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>

            {(role === 'admin' || role === 'client') && (
              <button
                className="absolute top-2 right-2 text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(product._id);
                }}
              >
                🗑️
              </button>
            )}

            {role === 'user' && (
              <div className="mt-2">
                <input
                  type="number"
                  min="1"
                  max={product.stockQuantity}
                  defaultValue={1}
                  className="w-16 border px-1 py-0.5 rounded mr-2"
                  onChange={(e) => product.quantity = e.target.value}
                />
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    const qty = product.quantity ? parseInt(product.quantity) : 1;

                    try {
                      await addToCart(userId, product._id, qty);
                      alert('Added to cart');
                    } catch (err) {
                      alert('Failed to add to cart: ' + err.message);
                    }
                  }}
                  className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Add to Cart
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <p>Page {currentPage} of {totalPages}</p>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div><div className="flex justify-between items-center gap-4 mt-6">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* ➕ Add Product Button */}
      {['admin', 'client'].includes(role) && (
        <button
          onClick={() => setShowModal(true)}
          className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full w-12 h-12 text-2xl shadow-lg"
          title="Add Product"
        >
          +
        </button>
      )}

      {/* 📦 Add Product Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Product</h3>
            {['name', 'description', 'price', 'category', 'stockQuantity'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={newProduct[field]}
                onChange={handleInputChange}
                type={field === 'price' || field === 'stockQuantity' ? 'number' : 'text'}
                className="w-full mb-2 p-2 border rounded"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✏️ Update Product Modal */}
      {showUpdateModal && selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Update Product</h3>
            {['name', 'description', 'price', 'category', 'stockQuantity'].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={selectedProduct[field]}
                onChange={(e) => setSelectedProduct({ ...selectedProduct, [field]: e.target.value })}
                type={field === 'price' || field === 'stockQuantity' ? 'number' : 'text'}
                className="w-full mb-2 p-2 border rounded"
              />
            ))}
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => navigate('/checkout')}
        className="fixed bottom-6 left-6 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded shadow-lg"
      >
        🧾 Go to Checkout
      </button>
    </div>
  );
};

export default Dashboard;