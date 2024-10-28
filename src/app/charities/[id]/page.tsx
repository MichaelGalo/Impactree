"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from "@/context/AuthContext";
import { Charity } from '@/types/charity.types';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { deleteCharity, getCharityById } from '@/services/charity';
import { getAllImpactPlans } from '@/services/impactPlan';
import { ImpactPlan, ImpactPlanCharity } from '@/types/impactPlan.types';
import { createImpactPlanCharity } from '@/services/impactPlanCharity';
import { useRouter } from 'next/navigation';

const CharityDetails = () => {
  const { userProfile } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [charity, setCharity] = useState<Charity | undefined>(undefined);
  const [impactPlan, setImpactPlan] = useState<ImpactPlan | null>(null);
  const [error, setError] = useState<string | null>(null); 
  const router = useRouter()
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const charityId = parseInt(id);
        const charityResponse = await getCharityById(charityId);
        if (charityResponse?.data) {
          setCharity(charityResponse.data);
        } else {
          console.error('No data in response');
        }

        // Fetch user's specific impact plan
        const plansResponse = await getAllImpactPlans();
        if (plansResponse?.data) {
          const userImpactPlan = plansResponse.data.find(
            (plan: ImpactPlan) => plan.user.id === userProfile?.id
          );
          if (userImpactPlan) {
            setImpactPlan(userImpactPlan);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load data. Please try again.');
      }
    };

    fetchData();
  }, [id, userProfile?.id]);

  const handleDelete = async () => {
    if (!charity?.id) return;

    if (window.confirm('Are you sure you want to delete this charity?')) {
      try {
        await deleteCharity(charity.id);
        router.push('/charities');  
      } catch (error) {
        console.error('Error deleting charity:', error);
        setError('Failed to delete charity. Please try again.');
      }
    }
  }

  const handleEdit = () => {
    if (!charity?.id) return;
    router.push(`/charities/${charity.id}/edit`);
  }

  const handleAddToImpact = async () => {
    if (!impactPlan) {
      setError("Please create an Impact Plan first to add charities.");
      return;
    }

    if (!charity) {
      setError("No charity selected.");
      return;
    }

    // Check if charity is already in the plan
    const charityExists = impactPlan.charities.some(
        (planCharity: any) => planCharity.charity_id === charity.id
    );

    if (charityExists) {
      setError("This charity is already in your impact plan.");
      return;
    }

    try {
      await createImpactPlanCharity({
        impact_plan_id: impactPlan.id,
        charity_id: charity.id,
        allocation_amount: 0 // Default to 0, to be updated later
      });
      window.alert('Charity Added to Your Impact Plan!');
    } catch (error: any) {
      setError("Failed to add charity to impact plan");
    }
  }

  return (
    <div className="details-container pt-0 pb-4">
        <div className="max-w-4xl mx-auto p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl my-24">
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
            {error}
          </div>
        )}
        <div className="space-y-6">
            {/* Header Section with Title and Action Buttons */}
            <div className="flex items-center justify-between">
            <div className="flex-grow">
                {charity?.website_url ? (
                <Link 
                    href={charity.website_url}
                    className="text-xl font-semibold text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {charity.name}
                </Link>
                ) : (
                <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {charity?.name}
                </h1>
                )}
            </div>
            
            {userProfile?.is_staff && (
                <div className="flex gap-2">
                <button 
                    onClick={handleEdit}
                    className="px-4 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50"
                >
                    Edit
                </button>
                <button 
                    onClick={handleDelete}
                    className="px-4 py-1.5 text-sm border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50"
                >
                    Delete
                </button>
                </div>
            )}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column - Info */}
            <div className="space-y-6">
                {/* Category Box */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
                    Charity Category
                </h3>
                <p className="text-gray-900 dark:text-gray-100">
                    {charity?.category.name}
                </p>
                </div>

                {/* Description Box */}
                <div className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <p className="text-gray-900 dark:text-gray-100">
                    {charity?.description}
                </p>
                </div>
            </div>

            {/* Right Column - Image */}
            <div className="h-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                {charity?.image ? (
                <div className="relative w-full h-full">
                    <Image
                    src={charity?.image}
                    alt={`${charity.name} image`}
                    fill
                    className="object-cover"
                    />
                </div>
                ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-50 dark:bg-gray-700">
                    <span className="text-gray-400 dark:text-gray-500">Image Card</span>
                </div>
                )}
            </div>
            </div>

            {/* Add to Impact Button */}
            <div className="flex justify-end">
            <button 
                onClick={handleAddToImpact}
                className="px-6 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
                Add to Impact
            </button>
            </div>
        </div>
        </div>
    </div>
  );
}

export default CharityDetails;