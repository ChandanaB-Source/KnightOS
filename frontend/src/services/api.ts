import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  timeout: 12000,
  headers: { 'Content-Type': 'application/json' },
});

// Inject stored JWT
api.interceptors.request.use(cfg => {
  try {
    const s = localStorage.getItem('ko-auth');
    if (s) { const t = JSON.parse(s)?.state?.token; if (t) cfg.headers.Authorization = `Bearer ${t}`; }
  } catch(_) {}
  return cfg;
});

// Auto-refresh on 401
api.interceptors.response.use(r => r, async err => {
  if (err.response?.status === 401) {
    try {
      const s = localStorage.getItem('ko-auth');
      const rt = s ? JSON.parse(s)?.state?.refreshToken : null;
      if (rt) {
        const { data } = await axios.post('/api/auth/refresh', { refreshToken: rt });
        const nt = data.data.token;
        const p = JSON.parse(s!); p.state.token = nt;
        localStorage.setItem('ko-auth', JSON.stringify(p));
        err.config.headers.Authorization = `Bearer ${nt}`;
        return axios(err.config);
      }
    } catch(_) {}
  }
  return Promise.reject(err);
});

export default api;
