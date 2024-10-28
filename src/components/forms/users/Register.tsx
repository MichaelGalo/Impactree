"use client"

import { useAuth } from "@/context/AuthContext"
import { register } from "@/services/auth"
import { RegisterData } from "@/types/auth.types"
import { useRouter } from 'next/navigation'
import { useState } from "react"

const RegistrationForm = () => {
    const { setIsAuthenticated, setUserProfile } = useAuth();
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const registrationRequest: RegisterData = {
            username: username,
            first_name: firstName, 
            last_name: lastName,
            email: email,
            password: password
        }

        try {
            const authData = await register(registrationRequest)

            if (authData) {
                setIsAuthenticated(true);
                setUserProfile(authData.user);
                router.push('/')
            } else {
                window.alert("Sorry, something went wrong")
            }

        } catch (error) {
            console.error('Registration failed:', error)
        }
    }

    const inputClasses = `w-full border rounded p-2
        bg-white dark:bg-gray-700
        text-gray-900 dark:text-gray-100
        border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        focus:border-blue-500 dark:focus:border-blue-400
        placeholder-gray-400 dark:placeholder-gray-500`;

    const labelClasses = `block mb-1 text-gray-900 dark:text-gray-100`;

    const primaryButtonClasses = `bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 
        text-blue-600 dark:text-blue-400 
        px-4 py-2 rounded
        border border-blue-600 dark:border-blue-400`;

    const secondaryButtonClasses = `bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700
        text-gray-600 dark:text-gray-400
        px-4 py-2 rounded
        border border-gray-600 dark:border-gray-400`;

    const passwordToggleClasses = `absolute inset-y-0 right-0 top-6 pr-3 flex items-center 
        text-gray-600 dark:text-gray-400 
        hover:text-gray-800 dark:hover:text-gray-200`;

    return (
        <div className="container mx-auto mt-10 max-w-md">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="username" className={labelClasses}>
                        Username
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="firstName" className={labelClasses}>
                        First Name
                    </label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className={labelClasses}>
                        Last Name
                    </label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label htmlFor="email" className={labelClasses}>
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <div className="relative">
                        <label htmlFor="password" className={labelClasses}>
                            Password
                        </label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`${inputClasses} pr-10`}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className={passwordToggleClasses}
                        >
                            {showPassword ? "🫣" : "👀"}
                        </button>
                    </div>
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className={primaryButtonClasses}
                    >
                        Register
                    </button>
                </div>
            </form>
            <div className="my-8 border-t border-gray-300 dark:border-gray-700" />
            <div className="flex justify-center mx-auto max-w-md">
                <button 
                    className={secondaryButtonClasses}
                    onClick={() => router.push("/login")}
                >
                    Already have an account?
                </button>
            </div>
        </div>
    )
}

export default RegistrationForm