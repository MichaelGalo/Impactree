"use client"

import { useAuth } from "@/context/AuthContext"
import { getCharities } from "@/services/charity"
import { Charity } from "@/types/charity.types"
import { Category } from "@/types/charityCategory"
import { useEffect, useState } from "react"

const Explore = () => {
    const { userProfile } = useAuth()
    const [charities, setCharities] = useState<Charity[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            // do loading things
        }

        getCharities().then(response => {
          if (response.data) {  
            setCharities(response.data) 
            setIsLoading(false)
          }
        })

        // get categories
    }, [])

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Title Banner */}
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Browse and Support Your Favorite Cause
                </h1>
                <p>
                    Discover organizations making a difference
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center mb-8">
                <button 
                    className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 flex items-center gap-2"
                >
                    <span className="text-lg">⚡</span>
                    Filter by Cause
                </button>

                {userProfile?.is_staff && (
                    <button 
                        className="px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800 flex items-center gap-2"
                    >
                        <span className="text-lg">+</span>
                        Add Organization
                    </button>
                )}
            </div>

            {/* Charity Cards Grid */}
            {isLoading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {charities.map((charity) => (
                        <div 
                        key={charity.id} 
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow dark:border-gray-600"
                    >
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">
                                {charity.name}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                {charity.category_id}
                            </p>
                            <p className="line-clamp-3 mb-4">
                                {charity.description}
                            </p>
                            <button 
                                className="w-full px-4 py-2 border rounded-lg hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
                            >
                                Learn More
                            </button>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Explore