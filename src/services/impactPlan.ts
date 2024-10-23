import { ImpactPlan } from "@/types/impactPlan.types"
import { fetchWithResponse } from "./fetcher"

export const getImpactPlanByUserId = async (userId: any) => {
    return await fetchWithResponse<ImpactPlan>(`impactplans/${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
}