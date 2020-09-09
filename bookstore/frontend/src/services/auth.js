export const TOKEN_KEY = "Books-Token";
export const ROLE_KEY = "User-Role";
export const NAME_KEY = "User-Name";

export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const isAdminAuthenticated = () => localStorage.getItem(ROLE_KEY) === 'admin';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getRole = () => localStorage.getItem(ROLE_KEY);
export const getName = () => localStorage.getItem(NAME_KEY);

export const login = data => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ROLE_KEY, data.user.role);
  localStorage.setItem(NAME_KEY, data.user.name);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
  localStorage.removeItem(NAME_KEY);
};
