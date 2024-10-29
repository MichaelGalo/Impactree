'use client'

import { useState } from "react";
import { ImpactPlanCharity } from "@/types/impactPlan.types";
import { formatCurrency } from '@/utils/impactMetrics';
import LoadingOverlay from "@/components/loadingOverlay";
import { DeletePlanModal } from "../modals/DeletePlanModal";
import { useImpactPlanManager } from "@/hooks/useImpactPlanManager";
import AllocationModal from "../modals/AllocationModal";


const ImpactPlanSettings = () => {
  // Custom hook for plan management
  const {
    impactPlan,
    annualIncome,
    philanthropyPercentage,
    isLoading,
    isNewPlan,
    handleAnnualIncomeChange,
    handlePercentageChange,
    handleSavePlan,
    handleDeletePlan,
    handleUpdateAllocation,
    handleDeleteCharity
  } = useImpactPlanManager();

  // Local state for modals
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState<ImpactPlanCharity | null>(null);

  // Modal handlers
  const openAllocationModal = (charity: ImpactPlanCharity) => {
    setSelectedCharity(charity);
    setAllocationModalOpen(true);
  };

  const closeAllocationModal = () => {
    setAllocationModalOpen(false);
    setSelectedCharity(null);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Left Column - Settings */}
        <div className="w-1/3 space-y-4">
          <div className="cardClasses ">
            <div className="p-4">
              {/* Total Annual Allocation */}
              <div className="mb-4 p-4 bg-white dark:bg-gray-700 rounded-lg">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  Total Annual Allocation
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {impactPlan ? formatCurrency(Number(impactPlan.total_annual_allocation)) : '$0.00'}
                </p>
              </div>

              {/* Annual Income Input */}
              <div className="mb-4">
                <label htmlFor="annual-income" className="labelClasses">
                  Annual Income
                </label>
                <input
                  type="number"
                  id="annual-income"
                  value={annualIncome}
                  onChange={(e) => handleAnnualIncomeChange(e.target.value)}
                  className="inputClasses"
                  min={0}
                  placeholder="Enter your annual income"
                />
              </div>

              {/* Philanthropy Percentage Input */}
              <div className="mb-4">
                <label htmlFor="philanthropy-percentage" className="labelClasses">
                  Philanthropy Percentage
                </label>
                <input
                  type="number"
                  id="philanthropy-percentage"
                  value={philanthropyPercentage}
                  onChange={(e) => handlePercentageChange(e.target.value)}
                  className="inputClasses"
                  min={0}
                  max={100}
                  step={0.1}
                  placeholder="Enter percentage (0-100)"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleSavePlan} 
                  className="primaryButtonClasses"
                  disabled={isLoading}
                >
                  {isNewPlan ? 'Create Plan' : 'Save Plan'}
                </button>
                {!isNewPlan && (
                  <button 
                    onClick={() => setDeleteModalOpen(true)} 
                    className="secondaryButtonClasses"
                    disabled={isLoading}
                  >
                    Delete Plan
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Charities */}
        <div className="w-2/3">
          <div className="cardClasses">
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Selected Charities & Causes
              </h2>
              <div className="space-y-4">
                {impactPlan?.charities.map((charity) => (
                  <div 
                    key={charity.id} 
                    className="flex items-center justify-between p-4 border rounded-lg bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-700"
                  >
                    <div className="flex-grow">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {charity.charity.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Current allocation: {formatCurrency(Number(charity.allocation_amount))}
                      </p>
                    </div>
                    <button
                      onClick={() => openAllocationModal(charity)}
                      className="primaryButtonClasses"
                    >
                      Edit Donation
                    </button>
                  </div>
                ))}
                {(!impactPlan?.charities || impactPlan.charities.length === 0) && (
                  <div className="text-center py-8 text-gray-600 dark:text-gray-400">
                    No charities have been added to your impact plan yet.
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DeletePlanModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={handleDeletePlan}
      />

      <AllocationModal
        isOpen={allocationModalOpen}
        onClose={closeAllocationModal}
        selectedCharity={selectedCharity}
        impactPlan={impactPlan}
        onUpdateAllocation={handleUpdateAllocation}
        onDeleteCharity={handleDeleteCharity}
      />

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default ImpactPlanSettings;