'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getAllImpactPlans } from "@/services/impactPlan";
import { ImpactPlan, ImpactPlanCharity } from "@/types/impactPlan.types";
import { formatCurrency } from '@/utils/impactMetrics';

const ImpactPlanSettings = () => {
  const { userProfile } = useAuth();
  const [impactPlan, setImpactPlan] = useState<ImpactPlan | null>(null);
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [philanthropyPercentage, setPhilanthropyPercentage] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    const fetchImpactPlan = async () => {
      try {
        const response = await getAllImpactPlans();
        const userImpactPlan = response.data.find(
          (plan: ImpactPlan) => plan.user.id === userProfile?.id
        );
        if (userImpactPlan) {
          setImpactPlan(userImpactPlan);
          setAnnualIncome(userImpactPlan.annual_income);
          setPhilanthropyPercentage(userImpactPlan.philanthropy_percentage);
        }
      } catch (error) {
        console.error('Error fetching impact plans:', error);
      }
    };

    fetchImpactPlan();
  }, [userProfile?.id]);

  const handleAnnualIncomeChange = (value: string) => {
    if (!isNaN(Number(value))) {
      setAnnualIncome(value);
      
      if (impactPlan) {
        const updatedPlan: ImpactPlan = {
          ...impactPlan,
          annual_income: value,
          total_annual_allocation: (Number(value) * (Number(philanthropyPercentage) / 100)).toString()
        };
        setImpactPlan(updatedPlan);
      }
    }
  };

  const handlePercentageChange = (value: string) => {
    const numberValue = Number(value);
    if (!isNaN(numberValue) && numberValue <= 100) {
      setPhilanthropyPercentage(value);
      
      if (impactPlan) {
        const updatedPlan: ImpactPlan = {
          ...impactPlan,
          philanthropy_percentage: value,
          total_annual_allocation: (Number(annualIncome) * (numberValue / 100)).toString()
        };
        setImpactPlan(updatedPlan);
      }
    }
  };

  const handleSavePlan = async () => {
    try {
      if (!impactPlan) return;
      
      const updatedPlan: ImpactPlan = {
        ...impactPlan,
        annual_income: annualIncome,
        philanthropy_percentage: philanthropyPercentage,
        total_annual_allocation: (Number(annualIncome) * (Number(philanthropyPercentage) / 100)).toString()
      };
      
      // TODO: Add  API call here to save the plan
      console.log('Saving plan:', updatedPlan);
    } catch (error) {
      console.error('Error saving impact plan:', error);
    }
  };

  const handleDeletePlan = async () => {
    try {
      if (impactPlan?.id) {
        // TODO: Add  API call here to delete the plan
        console.log('Deleting plan:', impactPlan.id);
        setDeleteModalOpen(false);
      }
    } catch (error) {
      console.error('Error deleting impact plan:', error);
    }
  };

  // Class bundles 
  const inputClasses = `w-full border rounded p-2
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    border-gray-300 dark:border-gray-600
    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    focus:border-blue-500 dark:focus:border-blue-400
    placeholder-gray-400 dark:placeholder-gray-500`

  const labelClasses = `block mb-1 text-gray-900 dark:text-gray-100`

  const primaryButtonClasses = `bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 
    text-blue-600 dark:text-blue-400 
    px-4 py-2 rounded
    border border-blue-600 dark:border-blue-400`

  const secondaryButtonClasses = `bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700
    text-gray-600 dark:text-gray-400
    px-4 py-2 rounded
    border border-gray-600 dark:border-gray-400`

  const cardClasses = `bg-white dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-sm`

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Left Column - Settings */}
        <div className="w-1/3 space-y-4">
          <div className={cardClasses}>
            <div className="p-4">
              <div className="mb-4">
              <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Annual Allocation
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {impactPlan ? formatCurrency(Number(impactPlan.total_annual_allocation)) : '$0.00'}
                </p>
              </div>

              
                <label htmlFor="annual-income" className={labelClasses}>
                  Annual Income
                </label>
                <input
                  type="number"
                  id="annual-income"
                  value={annualIncome}
                  onChange={(e) => handleAnnualIncomeChange(e.target.value)}
                  className={inputClasses}
                  min={0}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="philanthropy-percentage" className={labelClasses}>
                  Philanthropy Percentage
                </label>
                <input
                  type="number"
                  id="philanthropy-percentage"
                  value={philanthropyPercentage}
                  onChange={(e) => handlePercentageChange(e.target.value)}
                  className={inputClasses}
                  min={0}
                  max={100}
                  step={0.1}
                />
              </div>


              <div className="flex flex-col gap-2">
                <button onClick={handleSavePlan} className={primaryButtonClasses}>
                  Save Plan
                </button>
                <button 
                  onClick={() => setDeleteModalOpen(true)} 
                  className={secondaryButtonClasses}
                >
                  Delete Plan
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Charities */}
        <div className="w-2/3">
          <div className={cardClasses}>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Selected Charities & Causes
              </h2>
              <div className="space-y-4">
                {impactPlan?.charities.map((charity) => (
                  <div 
                    key={charity.id} 
                    className="flex items-center justify-between p-4 border rounded-lg border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {charity.charity.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Current allocation: {formatCurrency(Number(charity.allocation_amount))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      {deleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className={`${cardClasses} p-6 max-w-md mx-auto`}>
            <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
              Are you sure?
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This action cannot be undone. This will permanently delete your impact plan.
            </p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setDeleteModalOpen(false)}
                className={secondaryButtonClasses}
              >
                Cancel
              </button>
              <button 
                onClick={handleDeletePlan}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ImpactPlanSettings