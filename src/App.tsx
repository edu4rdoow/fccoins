import { MessageCircle, Shield, Clock, Trophy, ChevronRight, ChevronLeft, Minus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PurchaseNotification } from './components/PurchaseNotification';
import { supabase } from './lib/supabase';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [coinPrice, setCoinPrice] = useState(44.90);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [selectedCoins, setSelectedCoins] = useState(300);

  const oldPrice = 59.90;
  const minCoins = 50;
  const maxCoins = 3000;
  const step = 50;

  const quickSelectValues = [50, 100, 500, 700, 1000, 2000, 3000];

  const testimonials = [
    '/WhatsApp Image 2025-11-19 at 18.34.37.jpeg',
    '/WhatsApp Image 2025-11-19 at 18.34.37 (1).jpeg',
    '/WhatsApp Image 2025-11-19 at 18.34.38.jpeg',
    '/WhatsApp Image 2025-11-19 at 18.34.38 (1).jpeg'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchCoinPrice = async () => {
      const { data } = await supabase
        .from('fc_coins_pricing')
        .select('price')
        .eq('is_active', true)
        .maybeSingle();

      if (data) {
        setCoinPrice(data.price);
      }
    };

    fetchCoinPrice();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const calculatePrice = (coins: number) => {
    return ((coins / 100000) * coinPrice).toFixed(2);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const whatsappNumber = '5553999286468';

  const whatsappMessage = encodeURIComponent(
    `Opa cheguei pelo site, quero comprar ${(selectedCoins * 1000).toLocaleString('pt-BR')} FC Coins.`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
        <div className="mb-6 bg-gradient-to-r from-red-600 via-black to-red-600 border-2 border-red-500 rounded-xl p-4 shadow-2xl shadow-red-500/50 animate-pulse">
          <div className="text-center">
            <h2 className="text-2xl sm:text-4xl font-black text-white mb-1 tracking-wider">
              🔥 BLACK FRIDAY 🔥
            </h2>
            <div className="flex items-center justify-center gap-2">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <p className="text-base sm:text-lg font-black text-yellow-400">
                Oferta disponível por: {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        </div>

        <header className="text-center mb-8 sm:mb-12">
          <div className="mb-4">
            <img src="/logonova.png" alt="Barcellos Coins" className="h-12 sm:h-16 mx-auto" />
          </div>
          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
            Monte o <span className="font-bold">time dos seus sonhos</span> no <span className="text-brand-green font-bold">Ultimate Team</span> com <span className="font-bold">segurança</span> e <span className="font-bold">velocidade</span>
          </p>
        </header>

        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-brand-green/30 mb-8">
          <div className="aspect-video bg-black relative overflow-hidden">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://player.vimeo.com/video/1138731362?autoplay=0&muted=0&controls=1&title=0&byline=0&portrait=0&loop=1`}
              title="Vídeo de Vendas Barcellos Coins"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="p-4 border-t border-brand-green/30 bg-black/30">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-brand-green hover:bg-brand-green-light text-black px-4 py-2 rounded-lg text-sm font-bold transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Comprar Agora
            </a>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-yellow-600/30 mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-24 h-24 sm:w-32 sm:h-32 mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-amber-500 to-yellow-600 rounded-full animate-pulse shadow-2xl shadow-yellow-600/50"></div>
                <div className="absolute inset-2 bg-gradient-to-br from-yellow-700 via-amber-800 to-yellow-900 rounded-full flex items-center justify-center border-4 border-yellow-500/30">
                  <span className="text-2xl sm:text-4xl font-black text-yellow-300 drop-shadow-lg">FC</span>
                </div>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
                <span className="text-yellow-500">FC Coins</span>
              </h2>
              <p className="text-base sm:text-lg text-gray-300 text-center mb-2">
                Compre FC Coins de forma rápida e segura
              </p>
              <div className="relative bg-gradient-to-r from-red-600/30 to-red-700/30 border-2 border-red-500 rounded-lg px-4 py-3 mt-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent animate-pulse"></div>
                <p className="text-base sm:text-lg font-black text-red-400 text-center mb-1 relative z-10 animate-pulse">
                  🔥 PREÇO DE BLACK! 🔥
                </p>
                <p className="text-xs sm:text-sm text-yellow-400 text-center relative z-10">
                  <span className="font-bold">Cotação:</span> 100.000 moedas = R$ {coinPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6 mb-6 border border-gray-700">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="relative w-10 h-10">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-full flex items-center justify-center">
                    <span className="text-xs font-black text-yellow-300">FC</span>
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-black text-white">
                  {(selectedCoins * 1000).toLocaleString('pt-BR')}
                </div>
              </div>

              <div className="relative mb-4">
                <input
                  type="range"
                  min={minCoins}
                  max={maxCoins}
                  step={step}
                  value={selectedCoins}
                  onChange={(e) => setSelectedCoins(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((selectedCoins - minCoins) / (maxCoins - minCoins)) * 100}%, #374151 ${((selectedCoins - minCoins) / (maxCoins - minCoins)) * 100}%, #374151 100%)`
                  }}
                />
                <div className="flex justify-between mt-2 text-xs gap-1">
                  {quickSelectValues.map((value) => (
                    <button
                      key={value}
                      onClick={() => setSelectedCoins(value)}
                      className={`px-2 py-1 rounded transition-all ${
                        selectedCoins === value
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                    >
                      {value >= 1000 ? `${value / 1000}KK` : `${value}K`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900/80 rounded-xl p-4 mb-4 border border-gray-700">
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={() => setSelectedCoins(Math.max(minCoins, selectedCoins - step))}
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                  <div className="text-center">
                    <div className="text-4xl sm:text-5xl font-black text-white mb-1">
                      {(selectedCoins * 1000).toLocaleString('pt-BR')}
                    </div>
                    <div className="text-gray-400 text-xs">coins</div>
                  </div>
                  <button
                    onClick={() => setSelectedCoins(Math.min(maxCoins, selectedCoins + step))}
                    className="bg-gray-700 hover:bg-gray-600 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-900/80 rounded-xl p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="relative w-10 h-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full"></div>
                      <div className="absolute inset-1 bg-gradient-to-br from-yellow-700 to-yellow-900 rounded-full flex items-center justify-center">
                        <span className="text-xs font-black text-yellow-300">FC</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm sm:text-base">COINS A RECEBER</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-black text-yellow-500">
                      {(selectedCoins * 1000).toLocaleString('pt-BR')}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-600 to-amber-600 rounded-xl p-4 sm:p-5 text-center shadow-lg shadow-yellow-600/50 hover:shadow-xl hover:shadow-yellow-600/60 transition-all duration-300 hover:scale-[1.02]">
              <div className="mb-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-gray-900 line-through text-lg font-bold">R$ {((selectedCoins / 100) * oldPrice).toFixed(2)}</span>
                  <span className="bg-red-600 text-white px-2 py-1 rounded-full text-xs font-bold hover:scale-110 transition-transform duration-200 cursor-default">-{Math.round(((oldPrice - coinPrice) / oldPrice) * 100)}%</span>
                </div>
                <div className="text-4xl sm:text-5xl font-black text-black mb-1">
                  R$ {((selectedCoins / 100) * coinPrice).toFixed(2)}
                </div>
                <p className="text-gray-900 text-xs">Preço promocional de Black Friday</p>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black text-yellow-500 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-900 transition-all hover:scale-105 shadow-xl border border-yellow-500/50 hover:border-yellow-500"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                Quero essa quantia
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
              <div className="mt-3 flex items-center justify-center gap-1">
                <span className="text-green-500 text-xs animate-pulse">*</span>
                <p className="text-xs font-semibold text-green-500 animate-pulse">
                  Promoção válida somente hoje
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-teal-700 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-400/50 mb-8">
          <div className="p-6 sm:p-8">
            <div className="flex flex-col items-center mb-8">
              <img src="/logo_sbc.png" alt="DME Icon" className="w-20 h-20 sm:w-24 sm:h-24 mb-4" />
              <h2 className="text-3xl sm:text-4xl font-bold text-white text-center mb-3">
                <span className="text-cyan-300">Farmamos</span> seu DME
              </h2>
              <p className="text-base sm:text-lg text-purple-100 text-center mb-2">
                Escolha o DME desejado sem custo adicional.
              </p>
              <div className="relative bg-gradient-to-r from-red-600/30 to-red-700/30 border-2 border-red-500 rounded-lg px-4 py-3 mt-3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400/10 to-transparent animate-pulse"></div>
                <p className="text-base sm:text-lg font-black text-red-400 text-center mb-1 relative z-10 animate-pulse">
                  🔥 PREÇO DE BLACK! 🔥
                </p>
                <p className="text-xs sm:text-sm text-yellow-400 text-center relative z-10">
                  <span className="font-bold">Cotação:</span> 100.000 moedas = R$ {coinPrice.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 rounded-xl p-2 sm:p-4 border-2 border-purple-400/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-2 sm:mb-3 flex items-center justify-center border border-gray-700 group-hover:border-cyan-500/50 transition-all overflow-hidden">
                  <img
                    src="/card.png"
                    alt="Di María"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-2 sm:mb-3">
                  <h3 className="text-white font-bold text-center mb-1 sm:mb-2 text-xs sm:text-base">Di María</h3>
                  <div className="text-center mb-1 sm:mb-2">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center border-2 border-yellow-300 shadow-lg shadow-yellow-500/50">
                        <span className="text-[8px] sm:text-[10px] font-bold text-yellow-900">FC</span>
                      </div>
                      <p className="text-yellow-400 font-semibold text-xs sm:text-sm">79.000</p>
                    </div>
                    <p className="text-green-400 font-bold text-sm sm:text-lg">R$ {calculatePrice(79000)}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-400 font-bold text-[10px] sm:text-sm">19 horas</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Opa cheguei pelo site, quero farmar o DME Di María')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Escolher
                </a>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 rounded-xl p-2 sm:p-4 border-2 border-purple-400/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-2 sm:mb-3 flex items-center justify-center border border-gray-700 group-hover:border-cyan-500/50 transition-all overflow-hidden">
                  <img
                    src="/Fundo de 176 Removido.png"
                    alt="Hero - Córdoba, Hamsik ou Abedi Pelé"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-2 sm:mb-3">
                  <h3 className="text-white font-bold text-center mb-1 sm:mb-2 text-xs sm:text-base">Hero - Córdoba, Hamsik ou Abedi Pelé</h3>
                  <div className="text-center mb-1 sm:mb-2">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center border-2 border-yellow-300 shadow-lg shadow-yellow-500/50">
                        <span className="text-[8px] sm:text-[10px] font-bold text-yellow-900">FC</span>
                      </div>
                      <p className="text-yellow-400 font-semibold text-xs sm:text-sm">279.000</p>
                    </div>
                    <p className="text-green-400 font-bold text-sm sm:text-lg">R$ {calculatePrice(279000)}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-400 font-bold text-[10px] sm:text-sm">14 dias</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Opa cheguei pelo site, quero farmar o DME Hero - Córdoba, Hamsik ou Abedi Pelé')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Escolher
                </a>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 rounded-xl p-2 sm:p-4 border-2 border-purple-400/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-2 sm:mb-3 flex items-center justify-center border border-gray-700 group-hover:border-cyan-500/50 transition-all overflow-hidden">
                  <img
                    src="/mbappe.png"
                    alt="Kylian Mbappé"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-2 sm:mb-3">
                  <h3 className="text-white font-bold text-center mb-1 sm:mb-2 text-xs sm:text-base">Kylian Mbappé</h3>
                  <div className="text-center mb-1 sm:mb-2">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center border-2 border-yellow-300 shadow-lg shadow-yellow-500/50">
                        <span className="text-[8px] sm:text-[10px] font-bold text-yellow-900">FC</span>
                      </div>
                      <p className="text-yellow-400 font-semibold text-xs sm:text-sm">3.700.000</p>
                    </div>
                    <p className="text-green-400 font-bold text-sm sm:text-lg">R$ {calculatePrice(3700000)}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-400 font-bold text-[10px] sm:text-sm">8 dias</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Opa cheguei pelo site, quero farmar o DME Kylian Mbappé')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Escolher
                </a>
              </div>

              <div className="bg-gradient-to-br from-gray-900/80 to-black/90 rounded-xl p-2 sm:p-4 border-2 border-purple-400/30 hover:border-cyan-400/60 transition-all hover:shadow-lg hover:shadow-cyan-500/20 group">
                <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg mb-2 sm:mb-3 flex items-center justify-center border border-gray-700 group-hover:border-cyan-500/50 transition-all overflow-hidden">
                  <img
                    src="/Fundo de 163 Removido.png"
                    alt="Melhoria Ídolo Max.89"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="mb-2 sm:mb-3">
                  <h3 className="text-white font-bold text-center mb-1 sm:mb-2 text-xs sm:text-base">Melhoria Ídolo Max.89</h3>
                  <div className="text-center mb-1 sm:mb-2">
                    <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                      <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center border-2 border-yellow-300 shadow-lg shadow-yellow-500/50">
                        <span className="text-[8px] sm:text-[10px] font-bold text-yellow-900">FC</span>
                      </div>
                      <p className="text-yellow-400 font-semibold text-xs sm:text-sm">214.000</p>
                    </div>
                    <p className="text-green-400 font-bold text-sm sm:text-lg">R$ {calculatePrice(214000)}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1 sm:gap-2 mb-4">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-red-500 animate-pulse"></div>
                    <span className="text-red-400 font-bold text-[10px] sm:text-sm">7 dias</span>
                  </div>
                </div>

                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Opa cheguei pelo site, quero farmar o DME Melhoria Ídolo Max.89')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-400 hover:to-teal-400 text-white px-2 py-1.5 sm:px-4 sm:py-2.5 rounded-lg font-bold text-xs sm:text-sm transition-all hover:scale-105 shadow-lg"
                >
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Escolher
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl p-4 sm:p-6 text-center shadow-lg shadow-purple-500/50">
              <p className="text-sm sm:text-base text-white font-semibold">
                💡 Clique em "Escolher" no DME desejado para falar diretamente no WhatsApp!
              </p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-6 sm:mb-8">
            <span className="text-brand-green">Clientes Milionários</span> Satisfeitos
          </h2>
          <div className="relative max-w-xl mx-auto px-4 sm:px-0">
            <div className="overflow-hidden rounded-lg">
              <div className="relative group">
                <img
                  src={testimonials[currentSlide]}
                  alt="Depoimento de cliente satisfeito"
                  className="w-full h-auto object-cover rounded-lg border border-brand-green/30 shadow-2xl shadow-brand-green/30 transition-all duration-300 group-hover:border-brand-green/60 group-hover:shadow-brand-green/50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none"></div>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-brand-green/90 text-white hover:text-black p-1.5 sm:p-2 rounded-full transition-all shadow-lg border border-brand-green/30 hover:border-brand-green hover:scale-110"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-black/70 hover:bg-brand-green/90 text-white hover:text-black p-1.5 sm:p-2 rounded-full transition-all shadow-lg border border-brand-green/30 hover:border-brand-green hover:scale-110"
              aria-label="Próximo"
            >
              <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            <div className="flex justify-center gap-2 mt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-1 rounded-full transition-all ${
                    index === currentSlide
                      ? 'bg-brand-green w-8'
                      : 'bg-gray-600 hover:bg-gray-500 w-6'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-brand-green/30 mb-8">
          <div className="p-6 sm:p-8">
            <div className="grid sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
              <div className="bg-gradient-to-br from-brand-green/10 to-brand-green-dark/5 rounded-xl p-4 sm:p-6 border border-brand-green/30 hover:border-brand-green/60 transition-colors">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-brand-green mb-3" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">100% Seguro</h3>
                <p className="text-sm text-gray-400">
                  A Inteligência Artificial da EA não detecta o nosso método de transferir moedas. Por isso, chance de ban praticamente nula.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-green/10 to-brand-green-dark/5 rounded-xl p-4 sm:p-6 border border-brand-green/30 hover:border-brand-green/60 transition-colors">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-brand-green mb-3" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">A Entrega Mais Rápida do Brasil</h3>
                <p className="text-sm text-gray-400">
                  Os clientes recebem os pedidos com a maior prioridade e em minutos, pois não trabalhamos com modo lance.
                </p>
              </div>

              <div className="bg-gradient-to-br from-brand-green/10 to-brand-green-dark/5 rounded-xl p-4 sm:p-6 border border-brand-green/30 hover:border-brand-green/60 transition-colors">
                <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-brand-green mb-3" />
                <h3 className="text-base sm:text-lg font-semibold text-white mb-2">Pare de Depender de Recompensas</h3>
                <p className="text-sm text-gray-400">
                  A Weekend League e o Rivals não vão fazer você ter um time bom, só irá ficar se estressando e ficando decepcionado.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-brand-green-dark to-brand-green rounded-xl p-6 sm:p-8 text-center mb-6 shadow-lg shadow-brand-green/50">
              <h2 className="text-2xl sm:text-3xl font-bold text-black mb-3">
                Pronto para Turbinar seu Time?
              </h2>
              <p className="text-base sm:text-lg text-black mb-6">
                Fale comigo agora no WhatsApp e garanta seus FC Coins com atendimento personalizado
              </p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-black text-brand-green px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-900 transition-all hover:scale-105 shadow-xl border border-brand-green/50 hover:border-brand-green"
              >
                <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
                Comprar Agora no WhatsApp
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </a>
            </div>

            <div className="text-center text-gray-400 text-xs sm:text-sm">
              <p className="mb-2">✓ Atendimento imediato via WhatsApp</p>
              <p>✓ Suporte completo do pedido até a entrega</p>
            </div>
          </div>
        </div>

        <footer className="text-center text-gray-500 text-xs sm:text-sm">
          <p>© 2025 Barcellos Coins - Todos os direitos reservados</p>
          <p className="mt-2">Este site não é afiliado à EA Sports ou FIFA</p>
        </footer>
      </div>

      <PurchaseNotification />
    </div>
  );
}

export default App;
