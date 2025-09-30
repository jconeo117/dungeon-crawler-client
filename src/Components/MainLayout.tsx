import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Castle, 
  User, 
  Package, 
  Store, 
  Swords, 
  Settings,
  LogOut,
  Bell,
  Menu,
  X,
  Coins,
  Shield,
  Zap
} from 'lucide-react';

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

const navigation: NavigationItem[] = [
  { 
    name: 'Dashboard', 
    href: '/dashboard', 
    icon: Castle, 
    color: 'text-primary-400',
    description: 'Character Overview'
  },
  { 
    name: 'Character', 
    href: '/character', 
    icon: User, 
    color: 'text-blue-400',
    description: 'Stats & Equipment'
  },
  { 
    name: 'Inventory', 
    href: '/inventory', 
    icon: Package, 
    color: 'text-green-400',
    description: 'Manage Items'
  },
  { 
    name: 'Shop', 
    href: '/shop', 
    icon: Store, 
    color: 'text-purple-400',
    description: 'Buy & Sell'
  },
  { 
    name: 'Auctions', 
    href: '/auctions', 
    icon: Coins, 
    color: 'text-gold-400',
    description: 'Live Bidding'
  },
  { 
    name: 'Dungeons', 
    href: '/dungeons', 
    icon: Swords, 
    color: 'text-red-400',
    description: 'Adventure Awaits'
  },
];

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const location = useLocation();
  const navigate = useNavigate();

  // Mock user data - replace with real data from context/store
  const user = {
    name: "DragonSlayer",
    level: 42,
    gold: 12450,
    avatar: "/api/placeholder/40/40"
  };

  const currentPage = navigation.find(item => item.href === location.pathname);

  const handleLogout = () => {
    // Implement logout logic
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-dark-800 bg-gaming-grid">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-dark-900/95 backdrop-blur-xl border-r border-dark-700
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo/Brand */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-dark-700">
          <div className="flex items-center space-x-2">
            <Castle className="h-8 w-8 text-primary-400 animate-pulse" />
            <span className="font-gaming font-bold text-xl text-gaming-glow">
              DUNGEON
            </span>
          </div>
          <button
            className="lg:hidden p-1 rounded-lg hover:bg-dark-800 transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-dark-700">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <img 
                src={user.avatar} 
                alt="Avatar" 
                className="h-12 w-12 rounded-full border-2 border-primary-400"
              />
              <div className="absolute -bottom-1 -right-1 bg-success-500 rounded-full h-4 w-4 border-2 border-dark-900" />
            </div>
            <div>
              <p className="font-semibold text-white">{user.name}</p>
              <p className="text-sm text-gray-400">Level {user.level}</p>
            </div>
          </div>
          
          {/* Quick stats */}
          <div className="mt-3 flex items-center justify-between text-sm">
            <div className="flex items-center space-x-1 text-gold-400">
              <Coins className="h-4 w-4" />
              <span className="font-semibold">{user.gold.toLocaleString()}</span>
            </div>
            <div className="flex items-center space-x-1 text-blue-400">
              <Shield className="h-4 w-4" />
              <span>892</span>
            </div>
            <div className="flex items-center space-x-1 text-red-400">
              <Zap className="h-4 w-4" />
              <span>1247</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  flex items-center px-3 py-3 rounded-lg text-sm font-medium transition-all duration-200
                  hover:bg-dark-800 hover:transform hover:scale-105 group relative overflow-hidden
                  ${isActive 
                    ? 'bg-primary-900/50 text-primary-300 shadow-gaming border border-primary-800/50' 
                    : 'text-gray-300 hover:text-white'
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className={`h-5 w-5 mr-3 transition-colors ${isActive ? 'text-primary-400' : item.color}`} />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-xs opacity-75">{item.description}</div>
                </div>
                
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute right-0 top-0 bottom-0 w-1 bg-primary-400 rounded-l-full" />
                )}
                
                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
              </Link>
            );
          })}
        </nav>

        {/* Bottom actions */}
        <div className="p-4 border-t border-dark-700 space-y-2">
          <button className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-dark-800 transition-all">
            <Settings className="h-5 w-5 mr-3 text-gray-400" />
            Settings
          </button>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-900/20 transition-all"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between h-16 px-4 bg-dark-900/95 backdrop-blur-xl border-b border-dark-700">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2 rounded-lg hover:bg-dark-800 transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page title */}
          <div className="flex items-center space-x-3">
            {currentPage && (
              <>
                <currentPage.icon className={`h-6 w-6 ${currentPage.color}`} />
                <div>
                  <h1 className="text-xl font-bold text-white font-gaming">
                    {currentPage.name}
                  </h1>
                  <p className="text-sm text-gray-400">{currentPage.description}</p>
                </div>
              </>
            )}
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-dark-800 transition-colors">
              <Bell className="h-5 w-5 text-gray-400" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {notifications}
                </span>
              )}
            </button>

            {/* User avatar */}
            <div className="relative">
              <img 
                src={user.avatar} 
                alt="Profile" 
                className="h-8 w-8 rounded-full border-2 border-primary-400 cursor-pointer hover:border-primary-300 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-6">
          {children || <Outlet />}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;