import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, LogIn } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);

  // Efecto para mostrar el modal con una animación
  useEffect(() => {
    if (isOpen) {
      // Un pequeño retraso para permitir que el DOM se actualice antes de aplicar la clase de transición
      setTimeout(() => setShow(true), 10);
    } else {
      setShow(false);
    }
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  // Manejador para el envío del formulario
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { email, password });
    // Aquí iría la lógica para llamar al servicio de autenticación
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
    >
      {/* Fondo oscuro semitransparente */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Contenedor del Modal */}
      <div
        className={`relative w-full max-w-md m-4 bg-dark-900 border-2 border-primary-800/50 rounded-lg shadow-gaming transform transition-all duration-300 ${show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={(e) => e.stopPropagation()} // Evita que el modal se cierre al hacer clic dentro de él
      >
        {/* Botón para cerrar el modal */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <div className="text-center mb-6">
            <h2 className="font-cinzel text-3xl font-bold text-white text-gaming-glow">
              Welcome Back
            </h2>
            <p className="text-gray-400 mt-2">Enter the realm of DungeonForge.</p>
          </div>

          {/* Formulario de Login */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo de Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>

            {/* Campo de Contraseña */}
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 bg-dark-800/50 border border-dark-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
            
            {/* Opciones adicionales (Recordarme, Olvidé contraseña) */}
            <div className="flex items-center justify-between text-sm">
                <label className="flex items-center space-x-2 text-gray-400 cursor-pointer">
                    <input type="checkbox" className="form-checkbox bg-dark-700 border-dark-600 text-primary-500 focus:ring-primary-500"/>
                    <span>Remember me</span>
                </label>
                <a href="#" className="font-medium text-primary-400 hover:text-primary-300 transition-colors">Forgot password?</a>
            </div>

            {/* Botón de envío */}
            <div>
              <button
                type="submit"
                className="w-full font-fantasy font-bold bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 flex items-center justify-center space-x-2 btn-glow"
              >
                <LogIn size={20} />
                <span>Secure Login</span>
              </button>
            </div>
          </form>

          {/* Enlace para registrarse */}
          <div className="text-center mt-6">
            <p className="text-sm text-gray-400">
              Don't have an account?{' '}
              <button className="font-medium text-primary-400 hover:text-primary-300 transition-colors">
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
