import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://travent-admin-server.vercel.app/api",
});

// Add a request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh the access token
        const refreshToken = localStorage.getItem("refreshToken");
        const { data } = await axios.post(
          "https://travent-admin-server.vercel.app/api/auth/refresh-token",
          { refreshToken }
        );

        const newAccessToken = data.accessToken;

        // Store the new access token
        localStorage.setItem("accessToken", newAccessToken);

        // Retry the original request with the new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Handle refresh token failure (e.g., redirect to login)
        console.error("Refresh token failed", refreshError);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redirect to login
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
