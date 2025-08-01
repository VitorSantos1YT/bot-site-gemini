
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { MapPin, Calculator, ArrowRight, Home, Bed, Bath, Square } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const PropertyEvaluation = () => {
  const [formData, setFormData] = useState({
    address: '',
    city: '',
    state: '',
    zipCode: '',
    propertyType: 'apartamento',
    bedrooms: '',
    bathrooms: '',
    area: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.address || !formData.city || !formData.state) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha pelo menos o endereço, cidade e estado.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simular processamento
    setTimeout(() => {
      const evaluationData = {
        ...formData,
        estimatedPrice: Math.floor(Math.random() * (800000 - 200000) + 200000),
        confidence: Math.floor(Math.random() * (95 - 85) + 85),
        marketTrend: Math.random() > 0.5 ? 'up' : 'down',
        evaluationDate: new Date().toISOString()
      };
      
      // Salvar no localStorage
      localStorage.setItem('lastEvaluation', JSON.stringify(evaluationData));
      
      setIsLoading(false);
      navigate('/resultado');
    }, 3000);
  };

  const propertyTypes = [
    { value: 'apartamento', label: 'Apartamento' },
    { value: 'casa', label: 'Casa' },
    { value: 'sobrado', label: 'Sobrado' },
    { value: 'cobertura', label: 'Cobertura' }
  ];

  return (
    <>
      <Helmet>
        <title>Avaliar Imóvel - PrecificaImóvel Já</title>
        <meta name="description" content="Avalie seu imóvel gratuitamente. Digite o endereço e obtenha uma estimativa de preço precisa em segundos." />
      </Helmet>

      <div className="min-h-screen pt-20 pb-10">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center space-y-4 mb-12">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/20"
              >
                <Calculator className="h-4 w-4" />
                <span>Avaliação Inteligente</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white">
                Avalie seu Imóvel
              </h1>
              
              <p className="text-xl text-white/70 max-w-2xl mx-auto">
                Preencha os dados abaixo e obtenha uma estimativa precisa do valor do seu imóvel em segundos
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Formulário */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-white text-2xl flex items-center space-x-2">
                      <MapPin className="h-6 w-6 text-blue-400" />
                      <span>Dados do Imóvel</span>
                    </CardTitle>
                    <CardDescription className="text-white/70">
                      Quanto mais informações você fornecer, mais precisa será a avaliação
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="px-0 pb-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Endereço */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2 space-y-2">
                          <Label htmlFor="address" className="text-white">Endereço *</Label>
                          <Input
                            id="address"
                            name="address"
                            placeholder="Ex: Rua das Flores, 123"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-white">Cidade *</Label>
                          <Input
                            id="city"
                            name="city"
                            placeholder="Ex: São Paulo"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="state" className="text-white">Estado *</Label>
                          <Input
                            id="state"
                            name="state"
                            placeholder="Ex: SP"
                            value={formData.state}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                            required
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="zipCode" className="text-white">CEP</Label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            placeholder="00000-000"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="propertyType" className="text-white">Tipo de Imóvel</Label>
                          <select
                            id="propertyType"
                            name="propertyType"
                            value={formData.propertyType}
                            onChange={handleInputChange}
                            className="flex h-12 w-full rounded-lg border border-input bg-white/10 backdrop-blur-sm px-4 py-3 text-sm text-white ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {propertyTypes.map(type => (
                              <option key={type.value} value={type.value} className="bg-gray-800 text-white">
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Características do Imóvel */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="bedrooms" className="text-white">Quartos</Label>
                          <Input
                            id="bedrooms"
                            name="bedrooms"
                            type="number"
                            placeholder="Ex: 3"
                            value={formData.bedrooms}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="bathrooms" className="text-white">Banheiros</Label>
                          <Input
                            id="bathrooms"
                            name="bathrooms"
                            type="number"
                            placeholder="Ex: 2"
                            value={formData.bathrooms}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="area" className="text-white">Área (m²)</Label>
                          <Input
                            id="area"
                            name="area"
                            type="number"
                            placeholder="Ex: 85"
                            value={formData.area}
                            onChange={handleInputChange}
                            className="text-white placeholder:text-white/50"
                          />
                        </div>
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-4 text-lg pulse-glow"
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            <span>Processando Avaliação...</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2">
                            <Calculator className="h-5 w-5" />
                            <span>Avaliar Imóvel</span>
                            <ArrowRight className="h-5 w-5" />
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar com informações */}
              <div className="space-y-6">
                <Card className="p-6">
                  <CardHeader className="px-0 pt-0">
                    <CardTitle className="text-white text-lg flex items-center space-x-2">
                      <Home className="h-5 w-5 text-blue-400" />
                      <span>Como Funciona</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-0 pb-0 space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                      <div>
                        <p className="text-white font-medium">Preencha os dados</p>
                        <p className="text-white/70 text-sm">Informe o endereço e características do imóvel</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                      <div>
                        <p className="text-white font-medium">Processamento IA</p>
                        <p className="text-white/70 text-sm">Nossa IA analisa dados do mercado imobiliário</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                      <div>
                        <p className="text-white font-medium">Resultado instantâneo</p>
                        <p className="text-white/70 text-sm">Receba a estimativa de preço em segundos</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="p-6">
                  <CardContent className="px-0 pb-0 space-y-4">
                    <div className="flex items-center space-x-3">
                      <Bed className="h-5 w-5 text-blue-400" />
                      <span className="text-white/70 text-sm">Informações opcionais aumentam a precisão</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Bath className="h-5 w-5 text-purple-400" />
                      <span className="text-white/70 text-sm">Avaliação baseada em dados reais do mercado</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Square className="h-5 w-5 text-green-400" />
                      <span className="text-white/70 text-sm">Resultado com nível de confiança</span>
                    </div>
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

export default PropertyEvaluation;
