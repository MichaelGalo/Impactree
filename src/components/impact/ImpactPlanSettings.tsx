'use client'

import { useState } from "react";
import { ImpactPlanCharity } from "@/types/impactPlan.types";
import { formatCurrency, getTotalAllocated, unallocatedFunds } from '@/utils/impactMetrics';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import LoadingOverlay from "@/components/loadingOverlay";
import { DeletePlanModal } from "../modals/DeletePlanModal";
import { useImpactPlanManager } from "@/hooks/useImpactPlanManager";

const ImpactPlanSettings = () => {
  // Hook state and handlers
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

  // Local modal state
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [allocationModalOpen, setAllocationModalOpen] = useState(false);
  const [selectedCharity, setSelectedCharity] = useState<ImpactPlanCharity | null>(null);
  const [newAllocationAmount, setNewAllocationAmount] = useState<string>("");

  // Modal handlers
  const openAllocationModal = (charity: ImpactPlanCharity) => {
    setSelectedCharity(charity);
    setNewAllocationAmount(String(charity.allocation_amount));
    setAllocationModalOpen(true);
  };

  const handleAllocationUpdate = async () => {
    if (!selectedCharity || !newAllocationAmount) return;
    await handleUpdateAllocation(selectedCharity.id, Number(newAllocationAmount));
    setAllocationModalOpen(false);
    setNewAllocationAmount("");
    setSelectedCharity(null);
  };

  const handleCharityDelete = async () => {
    if (!selectedCharity) return;
    await handleDeleteCharity(selectedCharity.id);
    setAllocationModalOpen(false);
    setNewAllocationAmount("");
    setSelectedCharity(null);
  };

  // Style classes
  const inputClasses = `w-full border rounded p-2
    bg-white dark:bg-gray-700
    text-gray-900 dark:text-gray-100
    border-gray-300 dark:border-gray-600
    focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
    focus:border-blue-500 dark:focus:border-blue-400
    placeholder-gray-400 dark:placeholder-gray-500`;

  const labelClasses = `block mb-1 text-gray-900 dark:text-gray-100`;

  const primaryButtonClasses = `bg-transparent hover:bg-blue-100 dark:hover:bg-blue-900/40 
    text-blue-600 dark:text-blue-400 
    px-4 py-2 rounded
    border border-blue-600 dark:border-blue-400`;

  const secondaryButtonClasses = `bg-transparent hover:bg-red-300 dark:hover:bg-gray-700
    text-red-600 dark:text-gray-400
    px-4 py-2 rounded
    border border-red-600 dark:border-gray-400`;

  const cardClasses = `bg-gray-100 dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-sm`;

  return (
    <div className="container mx-auto p-6">
      <div className="flex gap-6">
        {/* Left Column - Settings */}
        <div className="w-1/3 space-y-4">
          <div className={cardClasses}>
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
                  placeholder="Enter your annual income"
                />
              </div>

              {/* Philanthropy Percentage Input */}
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
                  placeholder="Enter percentage (0-100)"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={handleSavePlan} 
                  className={primaryButtonClasses}
                  disabled={isLoading}
                >
                  {isNewPlan ? 'Create Plan' : 'Save Plan'}
                </button>
                {!isNewPlan && (
                  <button 
                    onClick={() => setDeleteModalOpen(true)} 
                    className={secondaryButtonClasses}
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
          <div className={cardClasses}>
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
                      className={primaryButtonClasses}
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

      <Modal 
        isOpen={allocationModalOpen} 
        onClose={() => {
          setAllocationModalOpen(false);
          setSelectedCharity(null);
          setNewAllocationAmount("");
        }}
        backdrop="blur"
        classNames={{
          backdrop: "bg-black/50",
          base: cardClasses,
          header: "border-b border-gray-200 dark:border-gray-700",
          footer: "border-t border-gray-200 dark:border-gray-700",
          closeButton: "hover:bg-gray-100 dark:hover:bg-gray-700",
          body: "text-gray-600 dark:text-gray-400",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="text-gray-900 dark:text-gray-100">
                Update Donation for {selectedCharity?.charity.name}
              </ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                      Total Annual Allocation Available
                    </p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      {impactPlan ? unallocatedFunds(impactPlan) : '$0.00'}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      of {impactPlan ? formatCurrency(Number(impactPlan.total_annual_allocation)) : '$0.00'} total
                    </p>
                  </div>
                  <div>
                    <label htmlFor="allocation-amount" className={labelClasses}>
                      Allocation Amount
                    </label>
                    <input
                      type="number"
                      id="allocation-amount"
                      value={newAllocationAmount}
                      onChange={(e) => setNewAllocationAmount(e.target.value)}
                      className={inputClasses}
                      min={0}
                      max={impactPlan ? (
                        Number(impactPlan.total_annual_allocation) - 
                        getTotalAllocated(impactPlan) + 
                        (selectedCharity ? Number(selectedCharity.allocation_amount) : 0)
                      ) : 0}
                      step={0.01}
                      placeholder="Enter allocation amount"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-between">
                <Button 
                  className={secondaryButtonClasses}
                  onPress={handleCharityDelete}
                >
                  Remove Charity
                </Button>
                <div className="flex gap-2">
                  <Button 
                    className={secondaryButtonClasses}
                    onPress={onClose}
                    variant="light"
                  >
                    Cancel
                  </Button>
                  <Button 
                    className={primaryButtonClasses}
                    onPress={handleAllocationUpdate}
                  >
                    Save
                  </Button>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Loading Overlay */}
      {isLoading && <LoadingOverlay />}
    </div>
  );
};

export default ImpactPlanSettings;