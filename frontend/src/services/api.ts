import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  timeout: 12000,
  headers: { "Content-Type": "application/json" },
});

// Inject stored JWT
api.interceptors.request.use((cfg) => {
  try {
    const s = localStorage.getItem("ko-auth");
    if (s) {
      const t = JSON.parse(s)?.state?.token;
      if (t) cfg.headers.Authorization = `Bearer ${t}`;
    }
  } catch (_) {}
  return cfg;
});

// Auto refresh token on 401
api.interceptors.response.use(
  (response) => response,
  async (err) => {
    if (err.response?.status === 401) {
      try {
        const s = localStorage.getItem("ko-auth");

        if (!s) return Promise.reject(err);

        const parsed = JSON.parse(s);
        const rt = parsed?.state?.refreshToken;

        if (rt) {
          const { data } = await api.post("/auth/refresh", {
            refreshToken: rt,
          });

          const newToken = data.data.token;

          parsed.state.token = newToken;
          localStorage.setItem("ko-auth", JSON.stringify(parsed));

          err.config.headers.Authorization = `Bearer ${newToken}`;

          return api(err.config);
        }
      } catch (_) {}
    }

    return Promise.reject(err);
  }
);

export default api;
