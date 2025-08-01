import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Mail, Shield, Calendar, Key, LogOut, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  const userData = {
    name: user?.name || 'Usuário',
    email: user?.email || 'email@desconhecido.com',
    plan: {
      name: 'Básico',
      status: 'active',
      activationDate: '2025-07-01',
      expiryDate: '2025-07-31',
      daysRemaining: 2,
    },
  };

  const handleAction = (message) => {
    toast({
      title: "🚧 Funcionalidade em desenvolvimento",
      description: message,
    });
  };

  return (
    <>
      <Helmet>
        <title>Painel do Usuário - PrecificaImóvel Já</title>
        <meta name="description" content="Gerencie sua conta, plano e configurações." />
      </Helmet>

      <div className="min-h-screen pt-20 pb-10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-white">Painel do Usuário</h1>
              <p className="text-xl text-white/70">Bem-vindo, {userData.name}!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <Shield className="mr-3 h-6 w-6 text-blue-400" />
                      <span>Meu Plano</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Plano Atual</p>
                      <p className="text-lg font-semibold text-white">{userData.plan.name}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Status</p>
                      <div className={`flex items-center text-lg font-semibold ${userData.plan.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                        {userData.plan.status === 'active' ? <CheckCircle className="mr-2 h-5 w-5" /> : <XCircle className="mr-2 h-5 w-5" />}
                        {userData.plan.status === 'active' ? 'Ativo' : 'Inativo'}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Data de Ativação</p>
                      <p className="text-lg font-semibold text-white flex items-center"><Calendar className="mr-2 h-4 w-4 text-white/70" /> {new Date(userData.plan.activationDate).toLocaleDateString('pt-BR')}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm text-white/70">Dias Restantes</p>
                      <p className="text-lg font-semibold text-white">{userData.plan.daysRemaining} dias</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-white text-2xl flex items-center">
                      <User className="mr-3 h-6 w-6 text-purple-400" />
                      <span>Minha Conta</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center">
                      <User className="mr-3 h-5 w-5 text-white/70" />
                      <span className="text-white">{userData.name}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="mr-3 h-5 w-5 text-white/70" />
                      <span className="text-white">{userData.email}</span>
                    </div>
                    <div className="pt-4 flex space-x-4">
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10" onClick={() => handleAction('A alteração de senha será implementada em breve.')}>
                        <Key className="mr-2 h-4 w-4" />
                        Alterar Senha
                      </Button>
                      <Button variant="destructive" onClick={handleLogout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Sair
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-white text-xl">Ativar ou Renovar Plano</CardTitle>
                    <CardDescription className="text-white/70">Insira um novo código para ativar ou estender seu plano.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleAction('A ativação de planos será implementada em breve.'); }}>
                      <div className="space-y-2">
                        <Label htmlFor="activation-code" className="text-white">Código de Ativação</Label>
                        <Input id="activation-code" placeholder="XXXX-XXXX-XXXX-XXXX" className="text-white" />
                      </div>
                      <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold">
                        Ativar Código
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;