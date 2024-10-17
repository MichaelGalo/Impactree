const Register = () => {
    // FIXME: Need to Add Button Handler Functions for Register & Redirect from Already have an account


    return (
        <div className="container mx-auto mt-10 max-w-md">
            <h1 className="text-2xl font-bold mb-5 text-center">Register Your Account</h1>
            <form className="space-y-4">
                <div>
                    <label htmlFor="username" className="block mb-1">Username</label>
                    <input type="text" id="username" name="username" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="firstName" className="block mb-1">First Name</label>
                    <input type="text" id="firstName" name="firstName" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="lastName" className="block mb-1">Last Name</label>
                    <input type="text" id="lastName" name="lastName" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="email" className="block mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full border rounded p-2" />
                </div>
                <div>
                    <label htmlFor="password" className="block mb-1">Password</label>
                    <input type="password" id="password" name="password" className="w-full border rounded p-2" />
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