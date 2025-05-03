import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';

export default function EmailVerification() {
    const location = useLocation();
    const [form, setForm] = useState({
        email: location.state?.email || '',
        code: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { verifyEmail } = useAuthStore();

    useEffect(() => {
        if (!form.email) {
            navigate('/');
        }
    }, [form.email, navigate]);

    const validateForm = () => {
        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(form.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!form.code.trim()) {
            newErrors.code = 'Verification code is required';
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

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setIsLoading(true);
        try {
            const result = await verifyEmail(form.code);
            if (result.error) {
                setErrors(prev => ({ ...prev, submit: result.error }));
            } else {
                navigate('/verify');
            }
        } catch (error) {
            setErrors(prev => ({ ...prev, submit: error.message }));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Email Verification</h2>
                <p className="text-sm text-gray-600 mb-6 text-center">
                    Please enter the verification code sent to your email address.
                </p>
                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={form.email}
                            onChange={handleChange}
                            disabled
                            className="w-full p-3 border rounded-lg bg-gray-100 text-gray-600"
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            name="code"
                            placeholder="Verification Code"
                            value={form.code}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 ${
                                errors.code ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.code && <p className="text-red-500 text-sm mt-1">{errors.code}</p>}
                    </div>
                    {errors.submit && <p className="text-red-500 text-sm text-center">{errors.submit}</p>}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-purple-600 text-white py-2 rounded-lg font-semibold hover:bg-purple-700 disabled:bg-purple-300"
                    >
                        {isLoading ? 'Verifying...' : 'Verify Email'}
                    </button>
                </form>
            </div>
        </div>
    );
}