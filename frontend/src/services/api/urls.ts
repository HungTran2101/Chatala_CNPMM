const BASEURL = process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:5000'; // Staging

const API_BASE = `${BASEURL}/api`;

export const API_URL = {
  register: `${API_BASE}/user/register`,
  login: `${API_BASE}/user/login`,
  updateProfile: `${API_BASE}/user/update-profile`,
  profile: `${API_BASE}/user/profile`,
  logout: `${API_BASE}/user/logout`,
  authSocialSettings: `${API_BASE}/auth/social/settings/`,
  resetPassword: `${API_BASE}/auth/password/reset/`,
  facebookLogin: `${API_BASE}/auth/facebook/`,
  googleLogin: `${API_BASE}/auth/google/`,
  linkedinLogin: `${API_BASE}/auth/linkedin/`,
  getRoomList: `${API_BASE}/room`,
  getRoomInfo: `${API_BASE}/room`,
  sendMessage: `${API_BASE}/message`,
};
