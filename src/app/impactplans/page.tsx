"use client"

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useAuth } from "@/context/AuthContext";
import { ImpactPlan } from '@/types/impactPlan.types';

import DoughnutChart from '@/components/DoughnutChart';
import { useRouter } from 'next/navigation';
import { getAllImpactPlans } from '@/services/impactPlan';
import { monthlyAllocation, unallocatedFunds } from '@/utils/impactMetrics';

ChartJS.register(ArcElement, Tooltip, Legend);

const ImpactDashboard = () => {
  const { userProfile } = useAuth();
  const [impactPlan, setImpactPlan] = useState<ImpactPlan | null>(null);
  const userId = userProfile?.id
  const router = useRouter()

  useEffect(() => {
    const fetchImpactPlan = async () => {
      try {
        const response = await getAllImpactPlans();
        
        // Find the impact plan for the current user
        const userImpactPlan = response.data.find(
          (plan: ImpactPlan) => plan.user.id === userProfile?.id
        );
        if (userImpactPlan) {
          setImpactPlan(userImpactPlan);
        }
      } catch (error) {
        console.error('Error fetching impact plans:', error);
      }
    };
  
    fetchImpactPlan();
  }, [userId]); 


  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Impact Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Watch your seeds of change grow
        </p>
      </div>

      {/* Settings Buttons */}
      <div className="flex justify-end gap-4 mb-8">
        <button 
        className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        onClick={()=>{router.push(`/impactplans/${impactPlan?.id}`)}}
        >
          Plan Settings
        </button>
        <button className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
        onClick={()=>{router.push(`/users/${userProfile?.id}`)}}
        >
          Profile Settings
        </button>
      </div>

      {/* Metrics Panel */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6 dark:text-gray-200">Your Metrics</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Current Monthly Commitment
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {impactPlan ? monthlyAllocation(impactPlan) : '$0.00'}
              </p>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                    Committed Income %
                </h3>
                <div className="h-48 w-full relative flex items-center justify-center">
                    <div className="w-full max-w-[200px]">
                    <DoughnutChart 
                        percentage={impactPlan?.philanthropy_percentage || 0}
                        // Optional customizations:
                        primaryColor="#10B981"
                        secondaryColor="#E5E7EB"
                        cutoutPercentage="70%"
                        legendPosition="bottom"
                        fontSize={12}
                        labelPadding={20}
                    />
                    </div>
                </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Remaining Unallocated Funds
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {impactPlan ? unallocatedFunds(impactPlan) : '$0.00'}
              </p>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Projected Annual Commitment 
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(Number(impactPlan?.total_annual_allocation ?? 0))}
              </p>
            </div>
          </div>
        </section>

        {/* Impact Panel */}
        <section className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6 dark:text-gray-200">Your Impact</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                  Charities You Support
                </h3>
                <ul className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-3'>
                  {impactPlan?.charities.map(charityObject => (
                    <li key={charityObject.id} className="text-black dark:text-gray-100">
                      {charityObject.charity.name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                  Annual Projected Impact
                </h3>
                <ul className='text-sm font-medium text-gray-600 dark:text-gray-300 mb-3'>
                {impactPlan?.charities.map(charityObject => {
                    const impact = Number(charityObject.allocation_amount) * charityObject.charity.impact_ratio;
                    const formattedImpact = Number.isInteger(impact) ? impact.toString() : impact.toFixed(2);
                    
                    return (
                      <li key={charityObject.id} className="text-black dark:text-gray-100">
                        {charityObject.charity.impact_metric}: {formattedImpact}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-4">
                    {impactPlan?.current_milestone?.name || 'Future Green Thumb'}
                </h3>
                
                {impactPlan?.current_milestone?.image_url ? (
                    <div className="w-16 h-16 mb-4 relative">
                    <img 
                        src={impactPlan.current_milestone.image_url} 
                        alt={impactPlan.current_milestone.name}
                        className="w-full h-full object-cover rounded-full"
                    />
                    </div>
                ) : (
                    <div className="w-16 h-16 mb-4 relative">
                        {/* Simple tree icon fallback */}
                        <div className="absolute bottom-0 left-1/2 w-4 h-8 bg-green-600 dark:bg-green-500 transform -translate-x-1/2"></div>
                        <div className="absolute bottom-4 left-1/2 w-12 h-12 bg-green-500 dark:bg-green-400 rounded-full transform -translate-x-1/2">
                        <div className="absolute top-1/4 left-1/4 w-6 h-6 bg-green-400 dark:bg-green-300 rounded-full"></div>
                        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-green-400 dark:bg-green-300 rounded-full"></div>
                        </div>
                    </div>
                )}
                
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {impactPlan?.current_milestone?.description || 'Start your giving journey'}
                </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ImpactDashboard;