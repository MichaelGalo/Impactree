import { Charity } from "@/types/charity.types";
import { fetchWithResponse } from "./fetcher";
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