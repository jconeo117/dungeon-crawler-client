import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Usamos persist middleware para guardar el estado en localStorage
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      
      // Acción para guardar los datos de autenticación
      setAuth: ({ userProfile, accessToken } : any) => set({
        user: userProfile,
        token: accessToken,
        isAuthenticated: true,
      }),
      
      // Acción para limpiar los datos al cerrar sesión
      logout: () => set({
        user: null,
        token: null,
        isAuthenticated: false,
      }),
    }),
    {
      name: 'auth-storage', // nombre de la clave en localStorage
    }
  )
);