import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, Map, Activity, BarChart2, Info } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: Home },
    { to: '/map', label: 'Live Map', icon: Map },
    { to: '/government', label: 'Gov Portal', icon: Activity },
    { to: '/analytics', label: 'Analytics', icon: BarChart2 },
    { to: '/about', label: 'About', icon: Info },
  ];

  return (
    <nav className="glass-card sticky top-0 z-50 rounded-none border-t-0 border-x-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500">
                🌡️ THERMOSAFE
              </span>
            </NavLink>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {links.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-dark-700 text-white border-b-2 border-accent'
                        : 'text-gray-300 hover:bg-dark-600 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden glass-card absolute w-full rounded-none">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2 block px-3 py-2 rounded-md text-base font-medium ${
                    isActive ? 'bg-dark-700 text-white' : 'text-gray-300 hover:bg-dark-600'
                  }`
                }
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
