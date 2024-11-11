import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { 
  createImpactPlan, 
  deleteImpactPlan, 
  getAllImpactPlans, 
  updateImpactPlan 
} from "@/services/impactPlan";
import { 
  deleteImpactPlanCharity, 
  updateImpactPlanCharity 
} from "@/services/impactPlanCharity";
import { ImpactPlan, ImpactPlanCharity } from "@/types/impactPlan.types";

type Message = {
  type: 'success' | 'error';
  text: string;
} | null;


export const useImpactPlanManager = () => {
  const { userProfile } = useAuth();
  const [impactPlan, setImpactPlan] = useState<ImpactPlan | null>(null);
  const [annualIncome, setAnnualIncome] = useState<string>("");
  const [philanthropyPercentage, setPhilanthropyPercentage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isNewPlan, setIsNewPlan] = useState(false);
  const [message, setMessage] = useState<Message>(null);

  useEffect(() => {
    fetchImpactPlan();
  }, [userProfile?.id]);

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

  const handleSavePlan = async () => {
    if (isNewPlan) {
      await createNewPlan();
    } else {
      await updateExistingPlan();
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
      setMessage({ type: 'success', text: 'Impact Plan updated successfully!' });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Error creating impact plan:', error);
      setMessage({ type: 'error', text: 'Failed to create Impact Plan. Please try again.' });
    }
  };

  const updateExistingPlan = async () => {
    try {
      if (!impactPlan?.id || !userProfile?.id) return;
      
      const requestBody = {
        user: Number(userProfile.id),
        annual_income: Number(annualIncome),
        philanthropy_percentage: Number(philanthropyPercentage),
        total_annual_allocation: Number(((Number(annualIncome) * Number(philanthropyPercentage)) / 100).toFixed(2)),
      };

      const response = await updateImpactPlan(impactPlan.id, requestBody);
      setImpactPlan(response.data);
      setMessage({ type: 'success', text: 'Impact Plan created successfully!' });
      setTimeout(() => setMessage(null), 5000);
    } catch (error) {
      console.error('Error updating impact plan:', error);
      setMessage({ type: 'error', text: 'Failed to create Impact Plan. Please try again.' });
    }
  };

  const handleDeletePlan = async () => {
    try {
      if (impactPlan?.id) {
        await deleteImpactPlan(impactPlan.id);
        // Reset to new plan state
        setIsNewPlan(true);
        setImpactPlan(null);
        setAnnualIncome("");
        setPhilanthropyPercentage("");
        setMessage({ type: 'success', text: 'Impact Plan deleted successfully!' });
        setTimeout(() => setMessage(null), 5000);
      }
    } catch (error) {
      console.error('Error deleting impact plan:', error);
      setMessage({ type: 'error', text: 'Failed to delete Impact Plan. Please try again.' });
    }
  };

  const handleUpdateAllocation = async (charityId: number, newAmount: number) => {
    try {
      await updateImpactPlanCharity(charityId, newAmount);
      await fetchImpactPlan(); // Refresh data
    } catch (error) {
      console.error('Error updating allocation:', error);
    }
  };

  const handleDeleteCharity = async (charityId: number) => {
    try {
      await deleteImpactPlanCharity(charityId);
      await fetchImpactPlan(); // Refresh data
    } catch (error) {
      console.error('Error deleting charity:', error);
    }
  };

  return {
    impactPlan,
    annualIncome,
    philanthropyPercentage,
    isLoading,
    isNewPlan,
    message,
    handleAnnualIncomeChange,
    handlePercentageChange,
    handleSavePlan,
    handleDeletePlan,
    handleUpdateAllocation,
    handleDeleteCharity
  };
};