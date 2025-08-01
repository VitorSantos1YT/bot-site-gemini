import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (!isAuthenticated) {
    // This toast will likely not be visible as the redirect is immediate,
    // but it's good practice for debugging or potential async checks.
    toast({
      title: "Acesso Negado",
      description: "Você precisa estar logado para acessar esta página.",
      variant: "destructive"
    });
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;