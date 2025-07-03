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


export const fetchAllUsers = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try{
    const res = await axios.get(`${API_URL}/dashboard`, {
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
