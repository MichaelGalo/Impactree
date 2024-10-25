import { ImpactPlan } from "@/types/impactPlan.types"
import { fetchWithoutResponse, fetchWithResponse } from "./fetcher"

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

export const createImpactPlan = async (plan: any) => {
  return await fetchWithResponse<ImpactPlan>(`impactplans`, {
    method: "POST",
    headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(plan)
  })
}

export const updateImpactPlan = async (planId: number, plan: any) => {
  return await fetchWithResponse<ImpactPlan>(`impactplans/${planId}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plan)
  });
}

export const deleteImpactPlan = async (planId: number) => {
  return await fetchWithoutResponse(`impactplans/${planId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  });
}