const API_BASE_URL = 'http://127.0.0.1:8000';

async function apiCall(endpoint, method = 'GET', data = null) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
    console.log('Using token for authentication');
  } else {
    console.log('No token found - making unauthenticated request');
  }

  const options = {
    method: method,
    headers: headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  console.log('API Request:', { 
    method, 
    url, 
    endpoint: endpoint,
    baseURL: API_BASE_URL,
    fullURL: url,
    hasToken: !!token,
    data 
  });

  try {
    const response = await fetch(url, options);

    console.log('API Response Status:', {
      status: response.status,
      statusText: response.statusText,
      url: response.url,
      ok: response.ok
    });

    const contentType = response.headers.get('content-type');
    let result;

    if (contentType && contentType.includes('application/json')) {
      result = await response.json();
      console.log('API Response Data:', result);
    } else {
      const text = await response.text();
      console.error('API Response (non-JSON):', text);
      throw new Error(`Server returned non-JSON response: ${text || response.statusText}`);
    }

    if (!response.ok) {
      const errorMessage = result.detail || result.message || result.error || `Request failed with status ${response.status}`;
      console.error('API Error Response:', {
        status: response.status,
        statusText: response.statusText,
        error: errorMessage,
        fullResponse: result
      });
      throw new Error(errorMessage);
    }

    return result;
  } catch (error) {
    console.error('API Call Failed:', {
      errorType: error.constructor.name,
      errorMessage: error.message,
      url: url,
      method: method,
      baseURL: API_BASE_URL,
      endpoint: endpoint
    });

    if (error instanceof TypeError && error.message.includes('fetch')) {
      const networkError = new Error(
        `Cannot connect to server at ${API_BASE_URL}. ` +
        `Please verify:\n` +
        `1. Backend is running on http://127.0.0.1:8000\n` +
        `2. No firewall is blocking the connection\n` +
        `3. CORS is properly configured on the backend`
      );
      console.error('Network Error Details:', {
        originalError: error.message,
        attemptedURL: url,
        baseURL: API_BASE_URL
      });
      throw networkError;
    }

    if (error instanceof SyntaxError) {
      console.error('JSON Parse Error:', error.message);
      throw new Error(`Invalid JSON response from server: ${error.message}`);
    }

    throw error;
  }
}

export default apiCall;

