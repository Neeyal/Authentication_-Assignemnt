// 9. Verify.jsx (Welcome Page)
export default function Verify() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-indigo-300">
            <div className="bg-white p-10 rounded-lg shadow-xl w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-4">Welcome!</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Your email has been successfully verified. Thank you for joining us!
                </p>
                <button
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded"
                    onClick={() => {
                        // Redirect to the homepage or dashboard
                        window.location.href = '/';
                    }}
                >
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
}
