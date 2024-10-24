import { ImpactPlan } from '@/types/impactPlan.types';

export const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(amount);
};

export const getTotalAllocated = (impactPlan: ImpactPlan): number => {
    return impactPlan.charities.reduce((sum, charity) => {
        return sum + Number(charity.allocation_amount);
    }, 0);
};

export const getCurrentlyAllocated = (impactPlan: ImpactPlan): number => {
    return impactPlan.charities.reduce((sum, charity) => {
        return sum + Number(charity.allocation_amount);
    }, 0);
};

export const monthlyAllocation = (impactPlan: ImpactPlan): string => {
    const currentlyAllocated = getCurrentlyAllocated(impactPlan);
    const monthlyAmount = currentlyAllocated / 12;
    return formatCurrency(monthlyAmount);
};

export const unallocatedFunds = (impactPlan: ImpactPlan): string => {
    const unallocated = Number(impactPlan.total_annual_allocation) - getTotalAllocated(impactPlan);
    return formatCurrency(unallocated);
};

// Optional: helper type for all metrics
export type ImpactMetrics = {
    totalAllocated: number;
    currentlyAllocated: number;
    monthlyAllocation: string;
    unallocatedFunds: string;
};

// Optional: helper function to get all metrics at once
export const calculateAllMetrics = (impactPlan: ImpactPlan): ImpactMetrics => {
    return {
        totalAllocated: getTotalAllocated(impactPlan),
        currentlyAllocated: getCurrentlyAllocated(impactPlan),
        monthlyAllocation: monthlyAllocation(impactPlan),
        unallocatedFunds: unallocatedFunds(impactPlan)
    };
};