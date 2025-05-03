import RegistrationForm from '../components/RegistrationForm';

export default function CustomerRegister() {
    return (
        <RegistrationForm
            role="customer"
            title="Customer Registration"
            loginPath="/customer-login"
        />
    );
}