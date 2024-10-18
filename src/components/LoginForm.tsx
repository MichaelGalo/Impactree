"use client"

import { useAuth } from '@/context/AuthContext'
import { login } from '@/services/auth'
import { LoginCredentials } from '@/types/auth.types'
import { useRouter } from 'next/navigation'
import { useState } from "react"

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);
    const { setIsAuthenticated, setUserProfile } = useAuth();
    const router = useRouter()

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const loginRequest: LoginCredentials = {
            username: username,
            password: password
        }

        try {
            const authData = await login(loginRequest);
            if (authData) {
                setIsAuthenticated(true);
                setUserProfile(authData.user);
                router.push('/')
            } else {
                window.alert("Please use valid username & password")
            }
        } catch (error) {
            console.error('login failed:', error)
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
                        Log In
                    </button>
                </div>
            </form>
            <br />
            <hr />
            <br />
            <div className="flex justify-center mx-auto max-w-md">
                <button 
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={()=>{router.push("/register")}}
                >
                    Don't have an account?
                </button>
            </div>
        </div>
    )
}

export default LoginForm