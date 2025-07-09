import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;


export const signUpUser = async (formData) => {
  try {
    console.log(API_URL);
    const res = await axios.post(`${API_URL}/auth/signup`, formData);
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Signup failed');
  }
};


export const signInUser = async (formData) => {
  try {
    const res = await axios.post(`${API_URL}/auth/signin`, formData);

    const { accessToken, refreshToken, user } = res.data;

    return { accessToken, refreshToken, user };
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

//get all users
export const fetchAllUsers = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try{
    const res = await axios.get(`${API_URL}/getAllUsers`, {

      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  }
  catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch users');
  }
};


//Products API calls

// gets all products
export const fetchAllProducts = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try {
    const res = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch products');
  }
};

// adds a new product 
export const addProduct = async (productData) => {
  const token = localStorage.getItem('accessToken');
  try {
    const res = await axios.post(`${API_URL}/products/add`, productData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to add product');
  }
};

// delete product
export const deleteProduct = async (productId) => {
  const token = localStorage.getItem('accessToken');
  try {
    const res = await axios.delete(`${API_URL}/products/${productId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete product');
  }
};

// update product
export const updateProduct = async (productId, updatedData) => {
  const token = localStorage.getItem('accessToken');
  try {
    const res = await axios.put(`${API_URL}/products/${productId}`, updatedData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update product');
  }
};