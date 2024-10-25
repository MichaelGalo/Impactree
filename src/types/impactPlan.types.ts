
import { Charity } from "./charity.types";
import { Milestone } from "./milestone.types";
import { UserProfile } from "./user.types";

export interface ImpactPlanCharity {
    id: number;
    charity: Charity;
    allocation_amount: number;
}

export interface ImpactPlan {
    id: number;
    user: UserProfile;
    annual_income: number;
    philanthropy_percentage: number;
    total_annual_allocation: number;
    current_milestone: Milestone | null;
    charities: ImpactPlanCharity[]
  }
