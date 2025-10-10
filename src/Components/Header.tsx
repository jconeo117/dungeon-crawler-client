import React, { useState, useEffect } from 'react';
import { Swords, Menu, X, ShieldCheck, Gamepad2, Users, Store, Gavel, Home } from 'lucide-react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import { useUIStore } from '../store/UIStore'; // Ruta de importación corregida

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    
    const openLoginModal = useUIStore((state) => state.openLoginModal);
    const location = useLocation();

    // Verificamos si estamos en la sección de comunidad
    const isCommunitySection = location.pathname.startsWith('/community');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Definimos los dos conjuntos de enlaces de navegación
    const mainNavLinks = [
        { name: 'Features', href: '#features', icon: Gamepad2 },
        { name: 'News', href: '#news', icon: Gamepad2 },
        { name: 'Community', href: '/community', icon: Users },
        { name: 'Support', href: '#support', icon: Gamepad2 },
    ];

    const communityNavLinks = [
        { name: 'Home', href: '/', icon: Home },
        { name: 'Shop', href: '/community/shop', icon: Store },
        { name: 'Auction House', href: '/community/auctions', icon: Gavel },
        { name: 'Friends', href: '#', icon: Users },
        { name: 'Forum', href: '#', icon: Users },
    ];

    // Seleccionamos el conjunto de enlaces a mostrar
    const navLinks = isCommunitySection ? communityNavLinks : mainNavLinks;

    return (
        <header
            className={`
                fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out
                ${isScrolled ? 'bg-dark-950/80 backdrop-blur-lg border-b border-dark-700/50 shadow-lg' : 'bg-transparent'}
            `}
        >
            <div className="container mx-auto px-6 h-20 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 cursor-pointer group">
                    <Swords className="h-8 w-8 text-primary-400 group-hover:text-primary-300 transition-colors duration-300 transform group-hover:rotate-[-15deg]" />
                    <span className="font-cinzel text-2xl font-bold text-white text-gaming-glow group-hover:text-gray-200 transition-colors duration-300">
                        DungeonForge
                    </span>
                </Link>

                <nav className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.href}
                            className={({ isActive }) => `
                                font-fantasy font-semibold text-gray-300 hover:text-primary-300 transition-all duration-300 relative group flex items-center space-x-2
                                ${isActive ? 'text-primary-300' : ''}
                            `}
                        >
                            <link.icon className="h-4 w-4" />
                            <span>{link.name}</span>
                            <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-primary-400 group-hover:w-full transition-all duration-300"></span>
                        </NavLink>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center space-x-4">
                    <button 
                        onClick={openLoginModal}
                        className="font-fantasy font-semibold text-gray-300 hover:text-white transition-colors duration-300 flex items-center space-x-2"
                    >
                       <ShieldCheck className="h-5 w-5 text-gray-400" />
                       <span>Login</span>
                    </button>
                    <button className="font-fantasy font-bold bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 flex items-center space-x-2 btn-glow">
                        <Gamepad2 className="h-5 w-5" />
                        <span>Play Now</span>
                    </button>
                </div>

                <div className="lg:hidden">
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
                        {isMenuOpen ? <X className="h-7 w-7 text-white" /> : <Menu className="h-7 w-7 text-white" />}
                    </button>
                </div>
            </div>

            {isMenuOpen && (
                <div className="lg:hidden bg-dark-950/95 backdrop-blur-lg absolute top-20 left-0 right-0 p-6 border-t border-dark-700">
                    <nav className="flex flex-col items-center space-y-6">
                        {navLinks.map((link) => (
                            <Link key={link.name} to={link.href} className="font-fantasy text-lg font-semibold text-gray-200 hover:text-primary-300 transition-colors duration-300" onClick={() => setIsMenuOpen(false)}>
                                {link.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="mt-8 pt-6 border-t border-dark-700 flex flex-col items-center space-y-4">
                         <button 
                            onClick={() => {
                                openLoginModal();
                                setIsMenuOpen(false);
                            }}
                            className="font-fantasy w-full text-center font-semibold text-gray-300 hover:text-white transition-colors duration-300 py-3 rounded-lg hover:bg-dark-800"
                         >
                           Login
                        </button>
                        <button className="font-fantasy w-full text-center font-bold bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-500 transition-all duration-300 shadow-md hover:shadow-emerald-500/40">
                            Play Now
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

