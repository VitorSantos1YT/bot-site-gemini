import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { UserPlus, User, Mail, Lock } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const { register } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!name || !email || !password) {
        toast({
            title: "Erro de Validação",
            description: "Por favor, preencha todos os campos.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    const { error } = await register(name, email, password);

    if (error) {
      toast({
        title: "Erro no Cadastro",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Redirecionando...",
      });
      navigate(from, { replace: true });
    }
    
    setIsLoading(false);
  };

  return (
    <>
      <Helmet>
        <title>Cadastro - PrecificaImóvel Já</title>
        <meta name="description" content="Crie sua conta e comece a usar nossa plataforma de avaliação de imóveis." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-md px-4"
        >
          <Card>
            <CardHeader className="text-center space-y-2">
              <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mb-4">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <CardTitle className="text-3xl font-bold text-white">Crie sua conta</CardTitle>
              <CardDescription className="text-white/70">
                É rápido e fácil. Comece agora mesmo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nome Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input id="name" type="text" placeholder="Seu nome" className="pl-10" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input id="email" type="email" placeholder="seu@email.com" className="pl-10" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Senha</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50" />
                    <Input id="password" type="password" placeholder="••••••••" className="pl-10" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                </div>
                <Button type="submit" disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 font-semibold py-3 text-base pulse-glow">
                  {isLoading ? 'Criando conta...' : 'Criar Conta'}
                </Button>
              </form>
              <div className="mt-6 text-center text-sm">
                <p className="text-white/70">
                  Já tem uma conta?{' '}
                  <Link to="/login" className="font-medium text-indigo-400 hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </>
  );
};

export default Register;