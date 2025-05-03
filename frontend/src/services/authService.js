import api from "./api";

const users = [];

export const registerUser = ({
  firstName,
  lastName,
  email,
  password,
  role,
}) => {
  const newUser = { firstName, lastName, email, password, role };
  users.push(newUser);
  return newUser;
};

export const verifyEmail = (email, code) => {
  const user = users.find(
    (u) => u.email === email && u.verificationCode === code
  );
  if (user) user.isVerified = true;
  return !!user;
};

export const loginAdmin = ({ email, password }) => {
  const user = users.find((u) => u.email === email && u.password === password);
  if (!user) return { error: "Invalid credentials" };
  if (user.role !== "admin") return { error: "Access denied" };
  if (!user.isVerified) return { error: "Verify your email first" };
  return { success: true, user };
};


export const authService = {
  // Register a new user
  async register(data) {
    try {
      const response = await api.post("/auth/register", data);
      return {
        message: response.data.message,
        userId: response.data.userId,
      };
    } catch (error) {
      throw new Error(error.response?.data?.error || "Registration failed");
    }
  },

  // Login user
  async login(data) {
    try {
      const response = await api.post("/auth/login", data);
      const { token, user } = response.data;
      return { token, user };
    } catch (error) {
      throw new Error(error.response?.data?.error || "Login failed");
    }
  },

  // Verify email
  async verifyEmail(data) {
    try {
      const response = await api.post("/auth/verify-email", data);
      return {
        message: response.data.message,
        user: response.data.user,
      };
    } catch (error) {
      throw new Error(
        error.response?.data?.error || "Email verification failed"
      );
    }
  },

  // Check if user is authenticated
  isAuthenticated() {
    return false; // This will be handled by the auth store
  },
};
