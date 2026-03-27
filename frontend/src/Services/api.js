const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

const getToken = () => localStorage.getItem("token");

const request = async (path, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data.message ||
      (Array.isArray(data.errors) ? data.errors.join(", ") : null) ||
      "Something went wrong";
    throw new Error(message);
  }

  return data;
};

export const signupUser = (payload) =>
  request("/auth/signup", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const loginUser = (payload) =>
  request("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const createPaste = (payload) =>
  request("/api/create_paste", {
    method: "POST",
    body: JSON.stringify(payload),
  });

export const deletePaste = (id) =>
  request(`/api/delete_paste/${id}`, {
    method: "DELETE",
  });

export const getMyPastes = () => request("/api/my_pastes", { method: "GET" });

export const auth = {
  saveToken: (token) => localStorage.setItem("token", token),
  clearToken: () => localStorage.removeItem("token"),
  isAuthenticated: () => Boolean(getToken()),
};
