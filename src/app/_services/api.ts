import { RandomUserResponse } from '../_types/user';

export const fetchRandomUser = async (): Promise<RandomUserResponse> => {
  try {
    const response = await fetch('https://randomuser.me/api/?results=1&nat=us');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: RandomUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching random user:', error);
    throw new Error('Failed to fetch user data');
  }
}; 