import axios from 'axios';

// Create axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:3000',  // Update with your backend URL
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const LoginHandler = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  } catch (err) {
    console.error("Error logging in:", err);
    return { success: false, message: err.message };
  }
};

export const RegisterHandler = async (username, email, password) => {
  try {
    const response = await api.post('/auth/register', { 
      username,
      email, 
      password 
    });
    
    if (response.data.success && response.data.accessToken) {
      // Set the token in axios default headers for subsequent requests
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
      return response.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || 'Registration failed'
    };
  }
};

export const LogoutHandler = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error("Error logging out:", error);
    return { success: false, message: error.message };
  }
};

export const validateToken = async () => {
  try {
    const response = await api.post('/auth/validate');
    return response.data;
  } catch (error) {
    console.error("Error validating token:", error);
    return { success: false, message: error.message };
  }
};

export const getUserHandler = async () => {
  try {
    const response = await api.get('/user/getuser');
    return response.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to get user'
    };
  }
};
