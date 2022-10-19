const BASEURL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000'; // Staging

const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  login: `${API_BASE}/auth/login/`,
  logout: `${API_BASE}/auth/logout/`,
  authSocialSettings: `${API_BASE}/auth/social/settings/`,
  resetPassword: `${API_BASE}/auth/password/reset/`,
  facebookLogin: `${API_BASE}/auth/facebook/`,
  googleLogin: `${API_BASE}/auth/google/`,
  linkedinLogin: `${API_BASE}/auth/linkedin/`,
};