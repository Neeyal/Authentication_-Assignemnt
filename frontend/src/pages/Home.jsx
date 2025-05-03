// 5. Home.jsx (Landing page to select registration)
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
            <div className="bg-white p-10 rounded-xl shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-6">Welcome to Auth Portal</h1>
                <div className="space-y-4">
                    <Link
                        to="/customer-register"
                        className="block w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded shadow"
                    >
                        Customer Panel
                    </Link>
                    <Link
                        to="/admin-register"
                        className="block w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded shadow"
                    >
                        Admin Panel
                    </Link>
                </div>
            </div>
        </div>
    );
}
