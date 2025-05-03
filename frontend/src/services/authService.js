import api from './api';

const users = [];

export const registerUser = ({ firstName, lastName, email, password, role }) => {
    const verificationCode = generateVerificationCode();
    const newUser = { firstName, lastName, email, password, role, isVerified: false, verificationCode };
    users.push(newUser);
    console.log(`Verification code for ${email}: ${verificationCode}`);
    return newUser;
};

export const verifyEmail = (email, code) => {
    const user = users.find(u => u.email === email && u.verificationCode === code);
    if (user) user.isVerified = true;
    return !!user;
};

export const loginAdmin = ({ email, password }) => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return { error: 'Invalid credentials' };
    if (user.role !== 'admin') return { error: 'Access denied' };
    if (!user.isVerified) return { error: 'Verify your email first' };
    return { success: true, user };
};

export const generateVerificationCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const authService = {
    // Register a new user
    async register(data) {
        try {
            const response = await api.post('/auth/register', data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Registration failed');
        }
    },

    // Login user
    async login(data) {
        try {
            const response = await api.post('/auth/login', data);
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            return user;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    },

    // Verify email
    async verifyEmail(data) {
        try {
            const response = await api.post('/auth/verify-email', data);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Email verification failed');
        }
    },

    // Get current user
    async getCurrentUser() {
        try {
            const response = await api.get('/auth/me');
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to get user data');
        }
    },

    // Logout user
    logout() {
        localStorage.removeItem('token');
    },

    // Check if user is authenticated
    isAuthenticated() {
        return !!localStorage.getItem('token');
    }
};
