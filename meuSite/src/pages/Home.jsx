import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp, Clock, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Home = () => {
  const features = [
    {
      icon: Calculator,
      title: 'Avaliação Instantânea',
      description: 'Obtenha estimativas precisas de preço em segundos usando apenas o endereço do imóvel.'
    },
    {
      icon: TrendingUp,
      title: 'Análise de Mercado',
      description: 'Dados atualizados do mercado imobiliário para avaliações mais assertivas.'
    },
    {
      icon: Clock,
      title: 'Economia de Tempo',
      description: 'Reduza o tempo de avaliação de horas para segundos com nossa tecnologia.'
    },
    {
      icon: Shield,
      title: 'Dados Confiáveis',
      description: 'Informações baseadas em fontes oficiais e algoritmos avançados.'
    },
    {
      icon: Zap,
      title: 'Interface Simples',
      description: 'Design intuitivo pensado especialmente para corretores e imobiliárias.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>PrecificaImóvel Já - Avaliação Automática de Imóveis</title>
        <meta name="description" content="Plataforma inteligente para avaliação automática de imóveis residenciais. Obtenha estimativas precisas de preço usando apenas o endereço." />
      </Helmet>

      <div className="overflow-x-hidden">
        {/* Hero Section */}
        <section className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/30 rounded-full filter blur-3xl opacity-50 animate-blob"></div>
          <div className="absolute top-10 right-1/4 w-96 h-96 bg-purple-600/30 rounded-full filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          
          <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 z-10 text-center lg:text-left"
            >
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/20"
                >
                  🚀 Avaliação Inteligente de Imóveis
                </motion.div>
                
                <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tighter">
                  Precifique Imóveis em
                  <span className="block gradient-text">Segundos.</span>
                </h1>
                
                <p className="text-xl text-white/70 leading-relaxed max-w-lg mx-auto lg:mx-0">
                  A plataforma mais avançada para avaliação automática de imóveis. 
                  Digite o endereço e obtenha uma estimativa precisa instantaneamente.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/avaliar">
                  <Button size="lg" className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:opacity-90 font-semibold px-8 py-4 text-lg pulse-glow w-full sm:w-auto">
                    Avaliar Imóvel Agora
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-4 text-lg w-full sm:w-auto"
                  onClick={() => {
                    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Saiba Mais
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="floating-animation">
                <img 
                  className="w-full h-auto rounded-2xl shadow-2xl" 
                  alt="Interface moderna de avaliação de imóveis em um tablet" src="https://images.unsplash.com/photo-1640340435016-1964cf4e723b" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-4xl font-bold text-white">
              Por que escolher o PrecificaImóvel Já?
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Desenvolvido para corretoras e imobiliárias que buscam agilidade e precisão, nossa plataforma oferece as melhores ferramentas do mercado.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full hover:-translate-y-2 transition-transform duration-300 cursor-pointer">
                    <CardHeader>
                      <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
                        <Icon className="h-7 w-7 text-white" />
                      </div>
                      <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-white/70 leading-relaxed">
                        {feature.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;