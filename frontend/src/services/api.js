const API_BASE_URL = 'http://localhost:8000';

function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Login failed.');
  }
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function signupUser(userData) {
  const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Registration failed.');
  }
  const data = await response.json();
  if (data.token) {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
  }
  return data;
}

export async function runAudit(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/audit`, {
    method: 'POST',
    headers: {
      ...getAuthHeaders(),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Audit execution failed.');
  }
  return await response.json();
}

export async function fetchAudits() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/audits`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return { audits: [] };
    return await response.json();
  } catch (err) {
    console.warn('Backend API unreachable, using cached state.', err);
    return { audits: [] };
  }
}

export async function fetchAuditDetails(auditId) {
  const response = await fetch(`${API_BASE_URL}/api/audits/${auditId}`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    throw new Error('Failed to fetch audit details.');
  }
  return await response.json();
}

export async function deleteAudit(auditId) {
  const response = await fetch(`${API_BASE_URL}/api/audits/${auditId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return await response.json();
}

export async function fetchSettings() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/settings`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (err) {
    return null;
  }
}

export async function updateSettings(settingsData) {
  const response = await fetch(`${API_BASE_URL}/api/settings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(settingsData),
  });
  return await response.json();
}
