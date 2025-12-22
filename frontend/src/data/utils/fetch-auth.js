const TOKEN_KEY = "jwt";
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// // ===== Header Helper für fetch =====
// export const withAuthHeaders = (headers = {}) => {
//   const token = getToken();
//   if (token) {
//     return {
//       ...headers,
//       Authorization: `Bearer ${token}`,
//     };
//   }
//   return headers;
// };

const originalFetch = window.fetch;

window.fetch = async (input, init) => {
  const token = getToken();

  const modifiedInit = {
    ...init,
    headers: {
      ...(init?.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    credentials: "include"
  };

  return originalFetch(input, modifiedInit);
};