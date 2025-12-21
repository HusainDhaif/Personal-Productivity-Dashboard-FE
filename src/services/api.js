// API base URL - update this to match your backend URL
const API_BASE_URL = 'http://localhost:8000/api';

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);
  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Something went wrong');
  }

  return result;
}

export default apiCall;

