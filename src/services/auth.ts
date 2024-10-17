import { fetchWithResponse } from "./fetcher";

// Input interfaces
interface LoginCredentials {
  username: string;
  password: string;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

// Output interfaces
interface UserProfile {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
}

export const login = (credentials: LoginCredentials) => 
  fetchWithResponse<UserProfile>('login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

export const register = (userData: RegisterData) => 
  fetchWithResponse<UserProfile>('register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

export const getUserProfile = (userId: number) => 
  fetchWithResponse<UserProfile>(`users/${userId}`, {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`,
    },
  });

export const getUsers = () => 
  fetchWithResponse<UserProfile[]>("users", {
    headers: {
      Authorization: `Token ${localStorage.getItem('token')}`
    }
  });