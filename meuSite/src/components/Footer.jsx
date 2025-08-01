import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="glass-effect border-t border-white/10 mt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-white/70">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-2 rounded-lg">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-white">PrecificaImóvel Já</span>
            </div>
            <p className="text-sm">
              Avaliação inteligente de imóveis para corretoras e imobiliárias modernas.
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-white">Produto</p>
            <div className="space-y-2 text-sm">
              <p className="hover:text-white cursor-pointer transition-colors">Avaliação Automática</p>
              <p className="hover:text-white cursor-pointer transition-colors">Relatórios Detalhados</p>
              <p className="hover:text-white cursor-pointer transition-colors">API para Integração</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-white">Suporte</p>
            <div className="space-y-2 text-sm">
              <p className="hover:text-white cursor-pointer transition-colors">Central de Ajuda</p>
              <p className="hover:text-white cursor-pointer transition-colors">Documentação</p>
              <p className="hover:text-white cursor-pointer transition-colors">Contato</p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-semibold text-white">Contato</p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4" />
                <span>contato@precificaimovel.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4" />
                <span>(11) 9999-9999</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4" />
                <span>São Paulo, SP</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2025 PrecificaImóvel Já. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;