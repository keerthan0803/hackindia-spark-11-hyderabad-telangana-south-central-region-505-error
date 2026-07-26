const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.detail || 'Login failed.');
  }
  const res = await response.json();
  const data = res.data || res;
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.detail || 'Registration failed.');
  }
  const res = await response.json();
  const data = res.data || res;
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function googleAuthUser(credentialToken) {
  const response = await fetch(`${API_BASE_URL}/api/v1/auth/google`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ credential: credentialToken }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.detail || 'Google authentication failed.');
  }
  const res = await response.json();
  const data = res.data || res;
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function runAudit(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/v1/audit/run`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || errorData.detail || 'Audit execution failed.');
  }
  return await response.json();
}

export async function fetchAudits() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/history`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return { audits: [] };
    const res = await response.json();
    return res.data || res;
  } catch (err) {
    console.warn('Backend API unreachable, using cached state.', err);
    return { audits: [] };
  }
}

export async function fetchAuditDetails(auditId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/history/${auditId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch audit details.');
  }
  const res = await response.json();
  return res.data || res;
}

export async function deleteAudit(auditId) {
  const response = await fetch(`${API_BASE_URL}/api/v1/audits/${auditId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return await response.json();
}

export async function fetchSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/settings`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    const res = await response.json();
    return res.data || res;
  } catch (err) {
    return null;
  }
}

export async function updateSettings(settingsData) {
  const response = await fetch(`${API_BASE_URL}/api/v1/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(settingsData),
  });
  return await response.json();
}
