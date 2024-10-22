"use client"

import { useAuth } from "@/context/AuthContext"
import { getCharities } from "@/services/charity"
import { getCharityCategories } from "@/services/charityCategory"
import { Charity } from "@/types/charity.types"
import { CharityCategory } from "@/types/charityCategory"
import { useEffect, useState } from "react"

const Explore = () => {
    const { userProfile } = useAuth()
    const [charities, setCharities] = useState<Charity[]>([])
    const [categories, setCategories] = useState<CharityCategory[]>([])
    const [selectedCategoryId, setSelectedCategoryId] = useState<number>(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (isLoading) {
            // Add SSR Loading Cards Component here during stretch goals
        }

        getCharities().then(response => {
          if (response.data) {  
            setCharities(response.data) 
            setIsLoading(false)
          }
        })

        getCharityCategories().then(response => {
            if (response.data) {
                setCategories(response.data)
            }
        })
    }, [])

    const filteredCharities = selectedCategoryId
        ? charities.filter(charity => charity.category.id === selectedCategoryId)
        : charities

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
            <select 
                value={selectedCategoryId}
                onChange={(e) => setSelectedCategoryId(Number(e.target.value))}
                className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            >
                    <option value={0}>Filter by Cause</option>
                    {categories.map((category) => (
                        <option key={category.id} value={Number(category.id)}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {userProfile?.is_staff && (
                    <button 
                        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 flex items-center gap-2"
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
                    {filteredCharities.map((charity) => (
                        <div 
                        key={charity.id} 
                        className="border rounded-lg overflow-hidden hover:shadow-lg transition-shadow border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        >
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-2">
                                    {charity.name}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                    {charity.category.name}
                                </p>
                                <p className="line-clamp-3 mb-4">
                                    {charity.description}
                                </p>
                                <button 
                                    className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
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