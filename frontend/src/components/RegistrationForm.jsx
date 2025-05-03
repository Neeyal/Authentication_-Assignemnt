import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function RegistrationForm({ role, title, loginPath }) {
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const navigate = useNavigate();
    const registerUser = useAuthStore((state) => state.registerUser);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!form.password) {
            newErrors.password = 'Password is required';
        } else if (!passwordRegex.test(form.password)) {
            newErrors.password = 'Password must be at least 8 characters long and contain at least one letter and one number';
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            await registerUser({ ...form, role });
            setShowSuccess(true);
            // Wait for 2 seconds to show the success message
            setTimeout(() => {
                navigate('/verify-email', { state: { email: form.email } });
            }, 2000);
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
                    <h2 className="text-3xl font-bold mb-6 text-gray-800">Registration Successful!</h2>
                    <p className="text-green-600 mb-4">✓ Your account has been created successfully</p>
                    <p className="text-gray-600 mb-6">Please check your email for the verification code.</p>
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
                    <p className="text-sm text-gray-500">Redirecting to verification page...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">{title}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={form.firstName}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.firstName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={form.lastName}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
                                errors.lastName ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
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
                        {isLoading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{' '}
                    <Link to={loginPath} className="text-blue-500 hover:underline">
                        Login here
                    </Link>
                </p>
            </div>
        </div>
    );
} 