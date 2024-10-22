"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/context/AuthContext";
import { Charity } from '@/types/charity.types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getCharityById } from '@/services/charity';

const CharityDetails = () => {
  const { userProfile } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [charity, setCharity] = useState<Charity | undefined>(undefined);
 
  useEffect(() => {
    const fetchCharity = async () => {
    const charityId = parseInt(id);
    const response = await getCharityById(charityId);
    if (response?.data) {
        setCharity(response.data);
    } else {
        console.error('No data in response');
    }
    };

    fetchCharity();
}, [id]);

  // loading state
  if (!charity) {
    return <div>Loading...</div>;
  }

  // handleDelete function
  const handleDelete = () => {
    return null;
  }

  // handleEdit function
  const handleEdit = () => {
    return null;
  }

  // handleAddToImpact function
  const handleAddToImpact = () => {
    return null;
  }

  if (!charity) {
    return null; // or return a loading state build
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Title Section */}
      <div className="mb-8">
        {charity.website_url && (
          <Link 
            href={charity.website_url}
            className="text-2xl font-bold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {charity.name}
          </Link>
        )}
      </div>

      {/* Action Buttons */}
      {userProfile?.is_staff && (
        <div className="flex justify-end gap-2 mb-6">
          <button 
            onClick={handleEdit}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            Edit
          </button>
          <button 
            onClick={handleDelete}
            className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
          >
            Delete
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          {/* Category Info */}
          <div className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
              Charity Category
            </h3>
            <p className="text-gray-900 dark:text-gray-100">
              {charity.category.name}
            </p>
          </div>

          {/* Impact Description */}
          <div className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
            <p className="text-gray-900 dark:text-gray-100 mb-4">
              {charity.description}
            </p>
          </div>
        </div>
      </div>

      {/* Add to Impact Button */}
      <div className="mt-6">
        <button 
          onClick={handleAddToImpact}
          className="w-full px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        >
          Add to Impact
        </button>
      </div>

    {/* Image Section */}
    <div className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
        <div className="relative h-64 w-full">
        {charity.image ? (
            <Image
            src={charity.image}
            alt={`${charity.name} image`}
            fill
            className="object-cover rounded-lg"
            />
        ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-400 dark:text-gray-500">Image Card</span>
            </div>
        )}
        </div>
    </div>

    </div>
  );
}

export default CharityDetails;