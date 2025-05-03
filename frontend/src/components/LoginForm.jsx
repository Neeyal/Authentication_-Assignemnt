import { useState } from 'react';
import {  Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function LoginForm({ role, title, registerPath }) {
    const [form, setForm] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const loginUser = useAuthStore((state) => state.loginUser);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const user = await loginUser({ ...form, role } );
            
            // Check if the user's role matches the login page role
            if (role === 'admin' && user.role !== 'admin') {
                throw new Error('You are not allowed to login from here');
            }
            
            setShowSuccess(true);
        } catch (error) {
            setErrors(prev => ({ ...prev, submit: error.message }));
        } finally {
            setIsLoading(false);
        }
    };

    if (showSuccess) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="bg-white p-8 rounded-xl shadow-2xl w-96 text-center">
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Login Successful!</h2>
                    <p className="text-green-600 mb-4">✓ You have successfully logged in</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{title}</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.email ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.password ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                    {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-blue-300"
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Don't have an account?{' '}
                    <Link to={registerPath} className="text-blue-500 hover:underline">
                        Register here
                    </Link>
                </p>
            </div>
        </div>
    );
} 