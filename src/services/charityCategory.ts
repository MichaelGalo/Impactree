
import { CharityCategory } from "@/types/charityCategory";
import { fetchWithResponse } from "./fetcher";

export const getCharityCategories = () => 
    fetchWithResponse<CharityCategory[]>("charitycategories", {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });