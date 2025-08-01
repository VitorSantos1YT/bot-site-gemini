
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, TrendingDown, MapPin, Home, Calendar, Share2, Download, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const EvaluationResult = () => {
  const [evaluationData, setEvaluationData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const savedData = localStorage.getItem('lastEvaluation');
    if (savedData) {
      setEvaluationData(JSON.parse(savedData));
    }
  }, []);

  const handleShare = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const handleDownload = () => {
    toast({
      title: "🚧 Esta funcionalidade ainda não foi implementada—mas não se preocupe! Você pode solicitá-la no seu próximo prompt! 🚀"
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!evaluationData) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Card className="p-8 text-center">
          <CardContent>
            <h2 className="text-2xl font-bold text-white mb-4">Nenhuma avaliação encontrada</h2>
            <p className="text-white/70 mb-6">Faça uma nova avaliação para ver os resultados aqui.</p>
            <Link to="/avaliar">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Nova Avaliação
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const priceRange = {
    min: Math.floor(evaluationData.estimatedPrice * 0.9),
    max: Math.floor(evaluationData.estimatedPrice * 1.1)
  };

  return (
    <>
      <Helmet>
        <title>Resultado da Avaliação - PrecificaImóvel Já</title>
        <meta name="description" content="Veja o resultado da avaliação do seu imóvel com estimativa de preço, análise de mercado e nível de confiança." />
      </Helmet>

      <div className="min-h-screen pt-20 pb-10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <Link to="/avaliar">
                  <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Nova Avaliação
                  </Button>
                </Link>
                <div>
                  <h1 className="text-3xl font-bold text-white">Resultado da Avaliação</h1>
                  <p className="text-white/70 flex items-center space-x-2 mt-1">
                    <Calendar className="h-4 w-4" />
                    <span>Avaliado em {formatDate(evaluationData.evaluationDate)}</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleShare} className="border-white/30 text-white hover:bg-white/10">
                  <Share2 className="h-4 w-4 mr-2" />
                  Compartilhar
                </Button>
                <Button variant="outline" size="sm" onClick={handleDownload} className="border-white/30 text-white hover:bg-white/10">
                  <Download className="h-4 w-4 mr-2" />
                  Baixar PDF
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Resultado Principal */}
              <div className="lg:col-span-2 space-y-6">
                {/* Preço Estimado */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card className="p-8 text-center pulse-glow">
                    <CardContent className="space-y-4">
                      <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 rounded-full text-green-400 text-sm font-medium">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Avaliação Concluída</span>
                      </div>
                      
                      <h2 className="text-2xl font-semibold text-white mb-2">Valor Estimado</h2>
                      
                      <div className="space-y-2">
                        <div className="text-5xl font-bold text-white">
                          {formatPrice(evaluationData.estimatedPrice)}
                        </div>
                        <p className="text-white/70">
                          Faixa: {formatPrice(priceRange.min)} - {formatPrice(priceRange.max)}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-center space-x-4 pt-4">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-white/70 text-sm">Confiança: {evaluationData.confidence}%</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          {evaluationData.marketTrend === 'up' ? (
                            <TrendingUp className="h-4 w-4 text-green-400" />
                          ) : (
                            <TrendingDown className="h-4 w-4 text-red-400" />
                          )}
                          <span className="text-white/70 text-sm">
                            Mercado {evaluationData.marketTrend === 'up' ? 'em alta' : 'em baixa'}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Detalhes do Imóvel */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-white text-xl flex items-center space-x-2">
                        <Home className="h-5 w-5 text-blue-400" />
                        <span>Detalhes do Imóvel</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-white/70 text-sm">Endereço</p>
                            <p className="text-white font-medium flex items-center space-x-2">
                              <MapPin className="h-4 w-4 text-blue-400" />
                              <span>{evaluationData.address}</span>
                            </p>
                          </div>
                          <div>
                            <p className="text-white/70 text-sm">Cidade/Estado</p>
                            <p className="text-white font-medium">{evaluationData.city}, {evaluationData.state}</p>
                          </div>
                          {evaluationData.zipCode && (
                            <div>
                              <p className="text-white/70 text-sm">CEP</p>
                              <p className="text-white font-medium">{evaluationData.zipCode}</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <p className="text-white/70 text-sm">Tipo de Imóvel</p>
                            <p className="text-white font-medium capitalize">{evaluationData.propertyType}</p>
                          </div>
                          {evaluationData.bedrooms && (
                            <div>
                              <p className="text-white/70 text-sm">Quartos</p>
                              <p className="text-white font-medium">{evaluationData.bedrooms}</p>
                            </div>
                          )}
                          {evaluationData.bathrooms && (
                            <div>
                              <p className="text-white/70 text-sm">Banheiros</p>
                              <p className="text-white font-medium">{evaluationData.bathrooms}</p>
                            </div>
                          )}
                          {evaluationData.area && (
                            <div>
                              <p className="text-white/70 text-sm">Área</p>
                              <p className="text-white font-medium">{evaluationData.area} m²</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Análise de Mercado */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-white text-xl flex items-center space-x-2">
                        <TrendingUp className="h-5 w-5 text-green-400" />
                        <span>Análise de Mercado</span>
                      </CardTitle>
                      <CardDescription className="text-white/70">
                        Insights baseados em dados do mercado imobiliário local
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-blue-400">R$ 4.850</div>
                          <div className="text-white/70 text-sm">Preço médio/m²</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-green-400">+12%</div>
                          <div className="text-white/70 text-sm">Valorização 12m</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 text-center">
                          <div className="text-2xl font-bold text-purple-400">45 dias</div>
                          <div className="text-white/70 text-sm">Tempo médio venda</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Nível de Confiança */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-white text-lg">Nível de Confiança</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-white/70">Precisão da Avaliação</span>
                          <span className="text-white font-bold">{evaluationData.confidence}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-3">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${evaluationData.confidence}%` }}
                          ></div>
                        </div>
                        <p className="text-white/70 text-sm">
                          {evaluationData.confidence >= 90 ? 'Muito Alta' : 
                           evaluationData.confidence >= 80 ? 'Alta' : 
                           evaluationData.confidence >= 70 ? 'Média' : 'Baixa'} confiança na estimativa
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Próximos Passos */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <Card className="p-6">
                    <CardHeader className="px-0 pt-0">
                      <CardTitle className="text-white text-lg">Próximos Passos</CardTitle>
                    </CardHeader>
                    <CardContent className="px-0 pb-0 space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                          <p className="text-white/70 text-sm">Consulte um corretor para validação presencial</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full mt-2"></div>
                          <p className="text-white/70 text-sm">Compare com imóveis similares na região</p>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                          <p className="text-white/70 text-sm">Considere melhorias para valorização</p>
                        </div>
                      </div>
                      
                      <Link to="/avaliar" className="block">
                        <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Nova Avaliação
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Disclaimer */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                >
                  <Card className="p-6 bg-yellow-500/10 border-yellow-500/30">
                    <CardContent className="px-0 pb-0">
                      <p className="text-yellow-200 text-sm">
                        <strong>Importante:</strong> Esta é uma estimativa baseada em dados de mercado. 
                        Para uma avaliação oficial, consulte um corretor credenciado.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EvaluationResult;
