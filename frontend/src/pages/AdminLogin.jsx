import LoginForm from '../components/LoginForm';

export default function AdminLogin() {
    return (
        <LoginForm
            role="admin"
            title="Admin Login"
            registerPath="/admin-register"
        />
    );
}