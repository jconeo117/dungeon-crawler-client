import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import LoginModal from './LoginModal';
import { useUIStore } from '../store/UIStore';


const MainLayout: React.FC = () => {
  const { isLoginModalOpen, closeLoginModal } = useUIStore();

  return (
    <div className="bg-dark-900">
      <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
      
      <Header />
      
      <main>
        <Outlet />
      </main>

    </div>
  );
};

export default MainLayout