import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calculator, TrendingUp, User, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const navItems = [
    { path: '/', icon: Home, label: 'Início' },
    { path: '/avaliar', icon: Calculator, label: 'Avaliar Imóvel' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-white">PrecificaImóvel Já</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    isActive
                      ? 'bg-white/10 text-white font-medium'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-2">
            {isAuthenticated ? (
              <Link to="/dashboard">
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 font-semibold">
                  <User className="mr-2 h-4 w-4" />
                  Painel
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-white/80 hover:bg-white/10 hover:text-white">
                    <LogIn className="mr-2 h-4 w-4" />
                    Entrar
                  </Button>
                </Link>
                <Link to="/cadastro">
                  <Button className="bg-white text-indigo-600 hover:bg-white/90 font-semibold">
                    Cadastrar
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;