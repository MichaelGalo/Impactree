import { AuthResponse, LoginCredentials, RegisterData } from "@/types/auth.types";
import { fetchWithResponse } from "./fetcher";


export const login = async (credentials: LoginCredentials): Promise<AuthResponse | null> => {
  const response = await fetchWithResponse<AuthResponse>('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  
  if (response.data.valid && response.data.token) {
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
  
  return null;
};

export const register = async (userData: RegisterData): Promise<AuthResponse | null> => {
  const response = await fetchWithResponse<AuthResponse>('register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (response.data.valid && response.data.token) {
    localStorage.setItem('token', response.data.token);
    return response.data;
  }
  
  return null;
};