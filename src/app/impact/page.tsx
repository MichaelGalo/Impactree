"use client"

import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import { useAuth } from "@/context/AuthContext";
import { ImpactPlan } from '@/types/impactPlan.types';

ChartJS.register(ArcElement, Tooltip, Legend);

const ImpactDashboard = () => {
  const { userProfile } = useAuth();
  const [impactPlan, setImpactPlan] = useState<ImpactPlan | null>(null);
  const [charities, setCharities] = useState<ImpactPlanCharity | null>(null)

  // add a useEffect to grab: 
  // impactPlan of the userProfile
  // impactPlan_Charity of the userProfiles

  const donationData = {
    labels: ['Committed', 'Remaining'],
    datasets: [{
      data: [
        Number(impactPlan?.philanthropy_percentage || 0), 
        100 - Number(impactPlan?.philanthropy_percentage || 0)
      ],
      backgroundColor: [
        '#10B981', // Green for donations
        '#E5E7EB'  // Light gray for remaining
      ],
      borderWidth: 0,
    }]
  };
  
  const chartOptions: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
        labels: {
          color: 'gray',
          font: { size: 12 },
          generateLabels: (chart) => {
            const percentage = Number(impactPlan?.philanthropy_percentage || 0);
            return [{
              text: `Committed: ${percentage}%`,
              fillStyle: '#10B981',
              index: 0
            }, {
              text: `Remaining: ${(100 - percentage).toFixed(1)}%`,
              fillStyle: '#E5E7EB',
              index: 1
            }]
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = Number(context.raw) || 0;
            return `${label}: ${value.toFixed(1)}%`;
          }
        }
      }
    },
    cutout: '70%',
    elements: {
      arc: { borderWidth: 0 }
    }
  };

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
        <button className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          Plan Settings
        </button>
        <button className="px-4 py-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400">
          Profile Settings
        </button>
      </div>

        {/* Metrics Panel */}
      <div className="grid lg:grid-cols-2 gap-6">
        <section className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6 dark:text-gray-200">Metrics Visualized</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Monthly Commitment
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Insert Monthly Donation Logic Return Here
              </p>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Committed Income %
              </h3>
              <div className="h-32 relative">
                <Doughnut data={donationData} options={chartOptions} />
                <div className="absolute inset-0 flex items-center justify-center">
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Annual Commitment
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Insert Annual Donation Logic Return Here
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Charities Supporting
              </h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Count impactPlan_charity length for user id
              </p>
            </div>
          </div>
        </section>

        {/* Impact Panel */}
        <section className="border rounded-lg overflow-hidden border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 p-6">
          <h2 className="text-xl font-semibold mb-6 dark:text-gray-200">Your Impact</h2>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                  Charities You Support
                </h3>
                <p>Insert mapped unordered list with list items as charity names</p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-3">
                  Annual Projected Impact
                </h3>
                <p>Insert mapped unordered list with list items as charity impact metrics & ratios</p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg flex flex-col items-center justify-center">
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