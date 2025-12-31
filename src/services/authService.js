const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

export const register = async (userData) => {
  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.error("Register error:", error);
    return { error: "Server error. Please try again later." };
  }
};

export const login = async (credentials) => {
  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
    return { error: "Server error. Please try again later." };
  }
};

export const getProfile = async (token) => {
  try {
    const res = await fetch(`${API_URL}/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error) {
    console.error("Profile fetch error:", error);
    return { error: "Unable to fetch profile." };
  }
};
