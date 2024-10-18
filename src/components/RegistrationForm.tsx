"use client"

import { register } from "@/services/auth"
import { RegisterData } from "@/types/auth.types"
import { useRouter } from 'next/navigation'
import { useState } from "react"

const RegistrationForm = () => {
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
            await register(registrationRequest)
            router.push('/')
        } catch (error) {
            console.error('Registration failed:', error)
        }

    }


    return (
        <div className="container mx-auto mt-10 max-w-md">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full border rounded p-2 dark:text-gray-800" 
                    />
                </div>
                <div>
                    <label htmlFor="firstName" className="block mb-1">First Name</label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border rounded p-2 dark:text-gray-800" 
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="block mb-1">Last Name</label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border rounded p-2 dark:text-gray-800" 
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded p-2 dark:text-gray-800" 
                    />
                </div>
                <div>
                    <div className="relative">
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input 
                        type={showPassword ? "text" : "password"}
                        id="password" 
                        name="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded p-2 pr-10 dark:text-gray-800" 
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center text-gray-600 hover:text-gray-800"
                    >
                        {showPassword ? "🫣" : "👀"}
                    </button>
                </div>
                </div>
                <div className="text-center">
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Register
                    </button>
                </div>
            </form>
            <br />
            <hr />
            <br />
            <div className="flex justify-center mx-auto max-w-md">
                <button 
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={()=>{router.push("/login")}}
                >
                    Already have an account?
                </button>
            </div>
        </div>
    )
}

export default RegistrationForm