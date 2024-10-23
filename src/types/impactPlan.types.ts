import { Milestone } from "./milestone.types";
import { UserProfile } from "./user.types";

export interface ImpactPlan {
    id: number;
    user: UserProfile;
    annual_income: string;
    philanthropy_percentage: string;
    total_annual_allocation: string;
    current_milestone: Milestone | null;
  }
