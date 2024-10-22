import { Charity } from "@/types/charity.types";
import { fetchWithResponse } from "./fetcher";

export const getCharities = () => 
    fetchWithResponse<Charity[]>("charities", {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`
      }
    });