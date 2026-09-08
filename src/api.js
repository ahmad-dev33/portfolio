import axios from 'axios';

// Production: set REACT_APP_API_URL=https://your-backend.onrender.com/api/
// Local fallback keeps current dev behaviour.
const API_BASE =
  process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api/';

const api = axios.create({
    baseURL: API_BASE,
    withCredentials: true 
});

let accessToken = null;

export const setLocalAccessToken = (token) => {
    accessToken = token;
};

// Request Interceptor: حفر التوكن في هيدر أي طلب يخرج من التطبيق
api.interceptors.request.use(
    (config) => {
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: تجديد التوكن تلقائياً عند انتهاء صلاحيته
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // 💡 التعديل الآمن: التحقق من وجود error.response أولاً لحماية التطبيق من الانهيار
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                // طلب توكن جديد باستخدام الكوكي الآمنة
                const refreshURL = `${API_BASE.replace(/\/+$/, '')}/token/refresh/`;
                const res = await axios.post(refreshURL, {}, { withCredentials: true });
                
                accessToken = res.data.access;
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                
                // إعادة تنفيذ الطلب الأصلي الذي فشل بنجاح
                return api(originalRequest);
            } catch (refreshError) {
                // إذا فشل تحديث التوكن (مثلاً انتهت صلاحية الـ Refresh token أيضاً)
                accessToken = null; // مسح التوكن من الذاكرة
                localStorage.removeItem("user"); // مسح حالة المستخدم
                window.location.href = '/login'; // توجيهه لصفحة الدخول
            }
        }
        return Promise.reject(error);
    }
);

export default api;