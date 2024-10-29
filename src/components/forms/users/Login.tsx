"use client"

import { useAuth } from '@/context/AuthContext';
import { login } from '@/services/auth';
import { LoginCredentials } from '@/types/auth.types';
import { IconEye, IconEyeOff } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useState } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { setAuthData } = useAuth();
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const loginRequest: LoginCredentials = {
            username: username,
            password: password
        };

        try {
            const authData = await login(loginRequest);
            if (authData?.token && authData.user) {
                setAuthData(authData.token, authData.user);
                router.push('/');
            } else {
                window.alert("Please use valid username & password");
            }
        } catch (error) {
            console.error('login failed:', error);
        }
    };

    return (
        <div className="container mx-auto mt-10 max-w-md">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label 
                        htmlFor="username" 
                        className="labelClasses"
                    >
                        Username
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="inputClasses"
                    />
                </div>
                <div>
                    <div className="relative">
                        <label 
                            htmlFor="password" 
                            className="labelClasses"
                        >
                            Password
                        </label>
                        <input 
                            type={showPassword ? "text" : "password"}
                            id="password" 
                            name="password" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`inputClasses pr-10`}
                        />
                        <button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute inset-y-0 right-0 top-6 pr-3 flex items-center 
                                text-gray-600 dark:text-gray-400 
                                hover:text-gray-800 dark:hover:text-gray-200"
                        >
                            {showPassword ? <IconEyeOff size={20} /> : <IconEye size={20} />}
                        </button>
                    </div>
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="primaryButtonClasses"
                    >
                        Log In
                    </button>
                </div>
            </form>
            <div className="my-8 border-t border-gray-300 dark:border-gray-700" />
            <div className="flex justify-center mx-auto max-w-md">
                <button 
                    className="tertiaryButtonClasses"
                    onClick={() => router.push("/register")}
                >
                    Don't have an account?
                </button>
            </div>
        </div>
    );
};

export default LoginForm;