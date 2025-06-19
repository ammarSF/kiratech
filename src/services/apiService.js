import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://randomuser.me/api/', 
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': 
  },
  // timeout: 10000, 
});

export const apiService = {

  /**
   * Fetches a list of users from the /users endpoint.
   * @returns {Promise<Array>} A promise that resolves to an array of user objects.
   * @throws {Error} Throws an error if the API request fails.
   */
  async getUsers(results = 20) {
    console.log('Fetching users from API...');
    try {
      const response = await apiClient.get(`/?results=${results}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);

      if (error.response) {
        console.error('Data:', error.response.data);
        console.error('Status:', error.response.status);
      } else if (error.request) {
        console.error('Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
      
      throw new Error('Failed to fetch users. Please try again later.');
    }
  },

};
