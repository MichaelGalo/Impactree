const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface ApiResponse<T = any> {
  data: T;
  status: number;
}

export class ApiError extends Error {
  status: number;
  
  constructor(status: number, message?: string) {
    super(message || `HTTP error! status: ${status}`);
    this.status = status;
    this.name = 'ApiError';
  }
}

const checkError = (response: Response): Response => {
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  return response;
};

const checkErrorJson = async <T>(response: Response): Promise<ApiResponse<T>> => {
  if (!response.ok) {
    throw new ApiError(response.status);
  }
  const data = await response.json();
  return { data, status: response.status };
};

const catchError = (err: ApiError): never => {
  if (err.status === 401) {
    window.location.href = '/login';
  }
  throw err;
};

export const fetchWithResponse = async <T>(resource: string, options: RequestInit): Promise<ApiResponse<T>> => {
  try {
    const response = await fetch(`${baseUrl}/${resource}`, options);
    return await checkErrorJson<T>(response);
  } catch (error) {
    return catchError(error as ApiError);
  }
};

export const fetchWithoutResponse = async (resource: string, options: RequestInit): Promise<Response> => {
  try {
    const response = await fetch(`${baseUrl}/${resource}`, options);
    return checkError(response);
  } catch (error) {
    return catchError(error as ApiError);
  }
};