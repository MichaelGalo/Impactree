"use client"

import { useState } from "react"

const Register = () => {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const registrationRequest: object = {
            username: username,
            first_Name: firstName, 
            last_Name: lastName,
            email: email,
            password: password
        }
        console.log(registrationRequest)

        // invoke registration fetch call

        // clear fields

        // navigate to home page with new auth

    }


    return (
        <div className="container mx-auto mt-10 max-w-md">
            <h1 className="text-2xl font-bold mb-5 text-center">Register Your Account</h1>
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
                <button className="bg-gray-500 text-white px-4 py-2 rounded">
                    Already have an account?
                </button>
            </div>
        </div>
    )
}

export default Register