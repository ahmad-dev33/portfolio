import React, { createContext, useState, useEffect, useContext } from 'react';
import api, { setLocalAccessToken } from '../api';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // فحص الجلسة تلقائياً عند تحميل التطبيق لأول مرة
        const checkAuth = async () => {
            try {
                const res = await api.post('token/refresh/');
                setLocalAccessToken(res.data.access);
                setUser({ loggedIn: true }); 
            } catch {
                setUser(null);
            } finally {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // 💡 تعديل دالة الـ login لتصبح آمنة وترجع النتيجة للمكونات
    const login = async (username, password) => {
        try {
            // ملاحظة: مسار الـ token/ هو المسار الافتراضي لـ SimpleJWT لتسجيل الدخول
            const res = await api.post('token/', { username, password });
            setLocalAccessToken(res.data.access);
            setUser({ loggedIn: true });
            return { success: true };
        } catch (error) {
            // إرجاع رسالة الخطأ القادمة من Django أو رسالة افتراضية
            return { 
                success: false, 
                message: error.response?.data?.detail || "اسم المستخدم أو كلمة المرور غير صحيحة" 
            };
        }
    };

    // دالة تسجيل الخروج
    const logout = async () => {
        try {
            // نرسل طلب للخروج لكي يقوم الباكيند بمسح الـ Refresh Token Cookie
            await api.post('token/logout/');
        } catch (error) {
            console.error("خطأ أثناء تسجيل الخروج من السيرفر", error);
        } finally {
            // نمسح البيانات من الواجهة في كل الأحوال للأمان
            setLocalAccessToken(null);
            setUser(null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {/* لمنع وميض الشاشة أو التنقل العشوائي أثناء فحص التوكن ننتظر انتهاء الـ loading */}
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);