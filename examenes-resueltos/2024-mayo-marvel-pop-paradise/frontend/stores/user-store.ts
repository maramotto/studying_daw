// Store global de Zustand para gestionar el usuario autenticado
// El profesor usa este patrón en ejemplo-practica3 (user-store.tsx)
// Zustand es como un servicio global de Angular pero sin inyección de dependencias

import { create } from "zustand";

// Interfaz que describe el estado del store
interface User {
    username: string;
    roles: string[];
}

interface UserStore {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

// create<UserStore> crea el store global
// (set) es la función para actualizar el estado
export const useUserStore = create<UserStore>((set) => ({
    // Estado inicial: no hay usuario logueado
    user: null,

    // Login: enviar credenciales al backend, guardar usuario en el store
    login: async (username: string, password: string) => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });
        if (!res.ok) throw new Error("Login incorrecto");
        const user = await res.json();
        // set() actualiza el estado del store y re-renderiza los componentes que lo usan
        set({ user });
    },

    // Logout: cerrar sesión en el backend y limpiar el store
    logout: async () => {
        await fetch("/api/logout", { method: "POST" });
        set({ user: null });
    },
}));
