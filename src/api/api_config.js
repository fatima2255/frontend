export const signUpUser = async (formData) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Signup failed');
    }

    return data;
  } catch (error) {
    throw error;
  }
};


export const signInUser = async (formData) => {
  try {
    const res = await fetch('http://localhost:5000/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.message || 'Login failed');
    }

    return {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
      user: data.user,
    };
  } catch (error) {
    throw error;
  }
};


export const fetchAllUsers = async () => {
  const accessToken = localStorage.getItem('accessToken');

  try{
    const res = await axios.get(`${API_URL}/getAllUsers`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch users');
    }

    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};
