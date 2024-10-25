
import { ImpactPlanCharity } from "@/types/impactPlan.types"
import { fetchWithResponse, fetchWithoutResponse } from "./fetcher"

export const createImpactPlanCharity = async (data: ImpactPlanCharity) => {
  return await fetchWithResponse(`impactplan_charities`, {
    method: "POST",
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

export const updateImpactPlanCharity = async (id: number, allocation_amount: number) => {
  return await fetchWithResponse(`impactplan_charities/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ allocation_amount })
  })
}

export const getUserImpactPlanCharities = async () => {
    return await fetchWithResponse<ImpactPlanCharity[]>(`impactplan_charities`, {
      method: "GET",
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
  }

export const getImpactPlanCharityById = async (id: number) => {
  return await fetchWithResponse<ImpactPlanCharity>(`impactplan_charities/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}

export const deleteImpactPlanCharity = async (id: number) => {
  return await fetchWithoutResponse(`impactplan_charities/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  })
}