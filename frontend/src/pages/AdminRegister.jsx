import RegistrationForm from '../components/RegistrationForm';

export default function AdminRegister() {
    return (
        <RegistrationForm
            role="admin"
            title="Admin Registration"
            loginPath="/admin-login"
        />
    );
}