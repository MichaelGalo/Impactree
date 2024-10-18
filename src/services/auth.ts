// import { LoginCredentials, RegisterData, TokenResponse } from "@/types/auth.types";
// import { fetchWithResponse } from "./fetcher";
// import { UserProfile } from "@/types/user.types";

// export const login = async (credentials: LoginCredentials): Promise<boolean> => {
//   const response = await fetchWithResponse<TokenResponse>('login', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(credentials),
//   });
  
//   if (response.data.valid && response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     return true;
//   }
  
//   return false;
// };

// export const register = async (userData: RegisterData): Promise<string | null> => {
//   const response = await fetchWithResponse<TokenResponse>('register', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userData),
//   });
  
//   if (response.data.token) {
//     localStorage.setItem('token', response.data.token);
//     return response.data.token;
//   }
  
//   return null;
// };

// export const getUserProfile = (userId: number) => 
//   fetchWithResponse<UserProfile>(`users/${userId}`, {
//     headers: {
//       Authorization: `Token ${localStorage.getItem('token')}`,
//     },
//   });

// export const getUsers = () => 
//   fetchWithResponse<UserProfile[]>("users", {
//     headers: {
//       Authorization: `Token ${localStorage.getItem('token')}`
//     }
//   });

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