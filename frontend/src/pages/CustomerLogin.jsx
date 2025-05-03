import LoginForm from '../components/LoginForm';

export default function CustomerLogin() {
    return (
        <LoginForm
            role="customer"
            title="Customer Login"
            registerPath="/customer-register"
        />
    );
} 