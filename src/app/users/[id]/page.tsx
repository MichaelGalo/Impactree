"use client"

import { useAuth } from "@/context/AuthContext"
import { useState, useEffect } from "react"
import { useRouter } from 'next/navigation'
import { updateProfile } from "@/services/user"
import { UserProfile } from "@/types/user.types"

const Profile = () => {
    const { userProfile, setUserProfile } = useAuth();
    const router = useRouter();
    
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (userProfile) {
            setUsername(userProfile.username);
            setFirstName(userProfile.first_name);
            setLastName(userProfile.last_name);
            setEmail(userProfile.email);
        }
    }, [userProfile]);

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userProfile?.id) return;
        setIsSubmitting(true);

        try {
            const updateRequest: Partial<UserProfile> = {
                username,
                first_name: firstName,
                last_name: lastName,
                email
            };
            
            const response = await updateProfile(userProfile.id, updateRequest);
            if (response && response.data) {
                setUserProfile(response.data);
                window.alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            window.alert('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const inputClasses = `w-full border rounded p-2
        bg-white dark:bg-gray-600
        text-gray-900 dark:text-gray-100
        border-gray-300 dark:border-gray-600
        focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
        focus:border-blue-500 dark:focus:border-blue-400
        placeholder-gray-400 dark:placeholder-gray-500`;

    const labelClasses = `block mb-1 text-gray-900 dark:text-gray-100`;

    const buttonClasses = `bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 
        text-blue-600 dark:text-blue-400 
        px-4 py-2 rounded
        border border-blue-600 dark:border-blue-400
        disabled:opacity-50 disabled:cursor-not-allowed`;

    if (!userProfile) {
        return <div>Loading...</div>;
    }

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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                    />
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className={buttonClasses}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;