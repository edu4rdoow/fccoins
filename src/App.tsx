import { MessageCircle, Shield, Clock, Trophy, ChevronRight, ChevronLeft } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PurchaseNotification } from './components/PurchaseNotification';

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const whatsappMessage = encodeURIComponent(
    `🎮 Olá! Vim através do site e quero comprar FC Coins. Pode me passar mais informações?`
  );
  const whatsappNumber = '5553999286468';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


  return (
    <div className="min-h-screen bg-black">
      <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12">
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
              src="https://www.youtube.com/embed/Rk7VBy1XcrI?autoplay=1&mute=1&modestbranding=1&rel=0&fs=0&disablekb=1&iv_load_policy=3"
              title="Vídeo de Vendas Barcellos Coins"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
