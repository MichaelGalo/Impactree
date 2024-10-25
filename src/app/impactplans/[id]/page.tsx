'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { createImpactPlan, getAllImpactPlans, updateImpactPlan } from "@/services/impactPlan";
import { ImpactPlan } from "@/types/impactPlan.types";
import { formatCurrency } from '@/utils/impactMetrics';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";
import LoadingOverlay from "@/components/loadingOverlay";

const ImpactPlanSettings = () => {
  const { userProfile } = useAuth();
  const [impactPlan, setImpactPlan] = useState<ImpactPlan | null>(null);
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [philanthropyPercentage, setPhilanthropyPercentage] = useState<string>("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  // TODO: create a charity modal state here (stretch)
  const [isLoading, setIsLoading] = useState(true);
  const [isNewPlan, setIsNewPlan] = useState(false);

  useEffect(() => {
    const fetchImpactPlan = async () => {
      setIsLoading(true);
      try {
        const response = await getAllImpactPlans();
        const userImpactPlan = response.data.find(
          (plan: ImpactPlan) => plan.user.id === userProfile?.id
        );
        
        if (userImpactPlan) {
          setImpactPlan(userImpactPlan);
          setAnnualIncome(String(userImpactPlan.annual_income)); 
          setPhilanthropyPercentage(String(userImpactPlan.philanthropy_percentage)); 
          setIsNewPlan(false);
        } else {
          setIsNewPlan(true);
          setImpactPlan(null);
          setAnnualIncome("");  
          setPhilanthropyPercentage("");  
        }
      } catch (error) {
        console.error('Error fetching impact plans:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchImpactPlan();
  }, [userProfile?.id]);

  const handleAnnualIncomeChange = (value: string) => {
    setAnnualIncome(value);  
    
    const numberValue = value === "" ? 0 : Number(value);
    if (!isNaN(numberValue)) {
      if (isNewPlan) {
        const newPlan: Partial<ImpactPlan> = {
          annual_income: numberValue,
          philanthropy_percentage: Number(philanthropyPercentage) || 0,
          total_annual_allocation: (numberValue * (Number(philanthropyPercentage) || 0)) / 100,
          charities: []
        };
        setImpactPlan(newPlan as ImpactPlan);
      } else if (impactPlan) {
        const updatedPlan: ImpactPlan = {
          ...impactPlan,
          annual_income: numberValue,
          total_annual_allocation: (numberValue * Number(philanthropyPercentage)) / 100
        };
        setImpactPlan(updatedPlan);
      }
    }
  };
  
  const handlePercentageChange = (value: string) => {
    setPhilanthropyPercentage(value);  
    
    const numberValue = value === "" ? 0 : Number(value);
    if (!isNaN(numberValue) && numberValue <= 100) {
      if (isNewPlan) {
        const newPlan: Partial<ImpactPlan> = {
          annual_income: Number(annualIncome) || 0,
          philanthropy_percentage: numberValue,
          total_annual_allocation: ((Number(annualIncome) || 0) * numberValue) / 100,
          charities: []
        };
        setImpactPlan(newPlan as ImpactPlan);
      } else if (impactPlan) {
        const updatedPlan: ImpactPlan = {
          ...impactPlan,
          philanthropy_percentage: numberValue,
          total_annual_allocation: ((Number(annualIncome) * numberValue) / 100)
        };
        setImpactPlan(updatedPlan);
      }
    }
  };

  const createNewPlan = async () => {
    try {
      if (!impactPlan || !userProfile?.id) return;
  
      const requestBody = {
        user: Number(userProfile.id),
        annual_income: Number(annualIncome),
        philanthropy_percentage: Number(philanthropyPercentage),
        total_annual_allocation: Number(((Number(annualIncome) * Number(philanthropyPercentage)) / 100).toFixed(2)),
        charities: []
      };
  
      const response = await createImpactPlan(requestBody);
      setImpactPlan(response.data);
      setIsNewPlan(false);
    } catch (error) {
      console.error('Error creating impact plan:', error);
    }
  };

  const updatePlan = async () => {
    try {
      if (!impactPlan?.id || !userProfile?.id) return;
      
      const requestBody = {
        user: Number(userProfile.id),
        annual_income: Number(annualIncome),
        philanthropy_percentage: Number(philanthropyPercentage),
        total_annual_allocation: Number(((Number(annualIncome) * Number(philanthropyPercentage)) / 100).toFixed(2)),
        charities: impactPlan.charities
      };
  
      const response = await updateImpactPlan(impactPlan.id, requestBody);
      setImpactPlan(response.data);
      
      console.log('Updating plan:', requestBody);
    } catch (error) {
      console.error('Error updating impact plan:', error);
    }
  };

  const handleDeletePlan = async () => {
    try {
      if (impactPlan?.id) {
        // TODO: Add API call to delete plan
        console.log('Deleting plan:', impactPlan.id);
        setDeleteModalOpen(false);
        // After successful delete, reset to new plan state
        setIsNewPlan(true);
        setImpactPlan(null);
        setAnnualIncome("");
        setPhilanthropyPercentage("");
      }
    } catch (error) {
      console.error('Error deleting impact plan:', error);
    }
  };

  const handleSavePlan = async () => {
    if (isNewPlan) {
      await createNewPlan();
    } else {
      await updatePlan();
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

  const secondaryButtonClasses = `bg-transparent hover:bg-red-300 dark:hover:bg-gray-700
    text-red-600 dark:text-gray-400
    px-4 py-2 rounded
    border border-red-600 dark:border-gray-400`

  const cardClasses = `bg-gray-100 dark:bg-gray-800 
    border border-gray-200 dark:border-gray-700 
    rounded-lg shadow-sm`

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
      
          {/* Delete Modal */}
          <Modal 
            isOpen={deleteModalOpen} 
            onClose={() => setDeleteModalOpen(false)}
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
                    Are you sure?
                  </ModalHeader>
                  <ModalBody>
                    <p>
                      This action cannot be undone. This will permanently delete your impact plan.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button 
                      className={secondaryButtonClasses}
                      onPress={onClose}
                      variant="light"
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                      onPress={() => {
                        handleDeletePlan();
                        onClose();
                      }}
                    >
                      Delete
                    </Button>
                  </ModalFooter>
                </>
              )}
            </ModalContent>
          </Modal>
      
          {/* Loading Overlay */}
          {isLoading && (
            <LoadingOverlay/>
          )}
        </div>
      )
    }

export default ImpactPlanSettings
