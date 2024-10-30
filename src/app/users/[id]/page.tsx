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
                // Update both the context state and localStorage
                setUserProfile(response.data);
                localStorage.setItem('userProfile', JSON.stringify(response.data));
                
                // Maintain the existing token
                const token = localStorage.getItem('token');
                if (token) {
                    // Optionally dispatch a storage event to notify other tabs
                    window.dispatchEvent(new Event('storage'));
                }
                
                window.alert('Profile updated successfully!');
            }
        } catch (error) {
            console.error('Failed to update profile:', error);
            window.alert('Failed to update profile. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto mt-10 max-w-md">
            <form onSubmit={submit} className="space-y-4">
                <div>
                    <label htmlFor="username" className="labelClasses">
                        Username
                    </label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="inputClasses"
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label htmlFor="firstName" className="labelClasses">
                        First Name
                    </label>
                    <input 
                        type="text" 
                        id="firstName" 
                        name="firstName" 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="inputClasses"
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label htmlFor="lastName" className="labelClasses">
                        Last Name
                    </label>
                    <input 
                        type="text" 
                        id="lastName" 
                        name="lastName" 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="inputClasses"
                        disabled={isSubmitting}
                    />
                </div>
                <div>
                    <label htmlFor="email" className="labelClasses">
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="inputClasses"
                        disabled={isSubmitting}
                    />
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="primaryButtonClasses disabled:opacity-50 disabled:cursor-not-allowed"
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