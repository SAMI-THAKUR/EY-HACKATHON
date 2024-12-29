import axios from "axios";

const BACKEND_URL = "http://localhost:3000";
export const LoginHandler = async (email, password) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (err) {
    console.error("Error logging in:", err);
    return { success: false, message: err.message };
  }
};

export const RegisterHandler = async (email, password) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/register`,
      { email, password },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.error("Error register in:", error);
    return { success: false, message: error.message };
  }
};

export const LogoutHandler = async () => {
  try {
    axios.post(`${BACKEND_URL}/auth/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error("Error register in:", error);
    return { success: false, message: error.message };
  }
};

export const validateToken = async () => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/auth/validate`,
      {},
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error validating token:", error);
    return { success: false, message: error.message };
  }
};

export const getUserHandler = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/user/getuser`, {
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    console.error("Error getting user:", error);
    return { success: false, message: error.message };
  }
};
