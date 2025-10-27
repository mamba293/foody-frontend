import { useAuthStore } from "./../stores/authStore.js";

const API_URL = "http://localhost:5000/api";

export class AuthService {
    static async apiFetch(endpoint, options = {}) {
        const { accessToken, logout } = useAuthStore.getState();

        const headers = {
            "Content-Type": "application/json",
            ...options.headers,
            Authorization: accessToken ? `Bearer ${accessToken}` : undefined,
        };

        let res = await fetch(`${API_URL}${endpoint}`, {
            ...options,
            headers,
            credentials: "include",
        });

        if (res.status === 401) {
            try {
                const newToken = await AuthService.refreshAccessToken();
                const retryHeaders = { ...headers, Authorization: `Bearer ${newToken}` };

                res = await fetch(`${API_URL}${endpoint}`, {
                    ...options,
                    headers: retryHeaders,
                    credentials: "include",
                });
            } catch (err) {
                console.error("Не удалось обновить токен:", err);
                logout();
                throw err;
            }
        }

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Ошибка запроса");

        return data;
    }

    static async refreshAccessToken() {
        const res = await fetch(`${API_URL}/refresh`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) throw new Error("Не удалось обновить токен");

        const data = await res.json();
        useAuthStore.getState().setToken(data.accessToken);
        return data.accessToken;
    }

    static async register(registerUserData) {
        const data = await AuthService.apiFetch("/users/register", {
            method: "POST",
            body: JSON.stringify(registerUserData),
        });

        useAuthStore.getState().setToken(data.accessToken);
        useAuthStore.getState().setUser(data.user);

        return data;
    }

    static async login(loginUserData) {
        const data = await AuthService.apiFetch("/login", {
            method: "POST",
            body: JSON.stringify(loginUserData),
        });

        useAuthStore.getState().setToken(data.accessToken);
        useAuthStore.getState().setUser(data.user);

        return data;
    }

    static async logout() {
        try {
            await fetch(`${API_URL}/logout`, {
                method: "POST",
                credentials: "include",
            });
        } catch (err) {
            console.error("Ошибка logout:", err);
        } finally {
            useAuthStore.getState().logout();
        }
    }
}
