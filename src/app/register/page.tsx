import RegistrationForm from "@/components/forms/users/Register"




const RegisterPage = () => {
    return (
        <div className="container mx-auto mt-10 max-w-md">
            <h1 className="text-2xl font-bold mb-5 text-center">Register Your Account</h1>
            <RegistrationForm />
        </div>
    )
}

export default RegisterPage