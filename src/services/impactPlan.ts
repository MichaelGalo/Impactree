import { ImpactPlan } from "@/types/impactPlan.types"
import { fetchWithResponse } from "./fetcher"

export const getImpactPlanById = async (planId: number) => {
  return await fetchWithResponse<ImpactPlan>(`impactplans/${planId}`, {
    method: "GET",
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export const getAllImpactPlans = async () => {
  return await fetchWithResponse<ImpactPlan[]>(`impactplans`, {
    method: "GET",
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
    }
})
}