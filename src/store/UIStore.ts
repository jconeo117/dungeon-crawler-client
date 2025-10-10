import { create } from 'zustand';

// Definimos la 'forma' del estado y sus acciones
interface UIState {
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
}

// Creamos el store con Zustand
// Esto nos permitirá acceder y modificar el estado del modal desde cualquier componente
export const useUIStore = create<UIState>((set) => ({
  isLoginModalOpen: false,
  openLoginModal: () => set({ isLoginModalOpen: true }),
  closeLoginModal: () => set({ isLoginModalOpen: false }),
}));
