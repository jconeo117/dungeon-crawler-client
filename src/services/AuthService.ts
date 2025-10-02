import axios from "axios";

const ApiClient = axios.create({
    baseURL: "localhost:",
    headers:{"Content-Type":"aplication/json"},
})

export const authService = {
  login: async (email:string, password:string) => {
    try {
      const response = await ApiClient.post('/Auth/Login', { email, password });
      return response.data;
    } catch (error:any) {
      // Manejo de errores (puedes expandir esto para mostrar notificaciones)
      console.error('Login failed:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },

  register: async (username:string, email:string, password:string, confirmPassword:string) => {
    try {
      const response = await ApiClient.post('/Auth/Register', { 
        userName: username, 
        email, 
        password, 
        confirmPassword 
      });
      return response.data;
    } catch (error:any) {
      console.error('Registration failed:', error.response?.data || error.message);
      throw error.response?.data || error;
    }
  },
};