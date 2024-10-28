import { Charity } from "@/types/charity.types";
import { fetchWithoutResponse, fetchWithResponse } from "./fetcher";
import { CharityFormData } from "@/app/charities/create/page";

export const getCharities = async () => {
  return await fetchWithResponse<Charity[]>("charities", {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
}

export const getCharityById = async (charityId: number) => {
    return await fetchWithResponse<Charity>(`charities/${charityId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    })
}

export const createCharity = async (formData: CharityFormData) => {
  return await fetchWithResponse<Charity>("charities", {
    method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData)
  })
}

export const updateCharity = async (charityId: number, formData: CharityFormData) => {
  return await fetchWithoutResponse(`charities/${charityId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${localStorage.getItem('token')}`,
    },
    body: JSON.stringify(formData)
  });
}

export const deleteCharity = async (charityId: number) => {
  return await fetchWithoutResponse(`charities/${charityId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });
}