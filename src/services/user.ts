import { UserProfile } from "@/types/user.types";
import { fetchWithResponse } from "./fetcher";

export const getUserProfile = async (userId: number): Promise<UserProfile | null> => {
    const response = await fetchWithResponse<UserProfile>(`users/${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
  
    return response.data;
  };
  
  
export const getUsers = () => 
  fetchWithResponse<UserProfile[]>("users", {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });


export const updateProfile = async (userId: any, request: any) => {
  return await fetchWithResponse<UserProfile>(`users/${userId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Token ${localStorage.getItem('token')}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  })
}