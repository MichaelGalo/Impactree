import { Charity } from "@/types/charity.types";
import { fetchWithResponse } from "./fetcher";

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