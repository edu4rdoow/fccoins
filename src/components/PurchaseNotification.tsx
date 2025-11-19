import { ShoppingBag, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Purchase {
  id: number;
  name: string;
  amount: string;
  timeAgo: string;
}

const maleNames = [
  'Lucas', 'Gabriel', 'Rafael', 'Felipe', 'Matheus', 'Pedro', 'João', 'Guilherme',
  'Bruno', 'Vitor', 'Diego', 'André', 'Thiago', 'Rodrigo', 'Carlos', 'Fernando',
  'Marcelo', 'Leandro', 'Daniel', 'Ricardo', 'Eduardo', 'Gustavo', 'Henrique'
];

const coinAmounts = ['100k', '200k', '300k', '500k', '1kk', '1.5kk', '2kk'];

const timeOptions = [
  'agora mesmo',
  'há 30 segundos',
  'há 1 minuto',
  'há 2 minutos',
  'há 3 minutos',
  'há 5 minutos'
];

const generatePurchase = (id: number): Purchase => {
  const randomName = maleNames[Math.floor(Math.random() * maleNames.length)];
  const randomAmount = coinAmounts[Math.floor(Math.random() * coinAmounts.length)];
  const randomTime = timeOptions[Math.floor(Math.random() * timeOptions.length)];

  return {
    id,
    name: randomName,
    amount: randomAmount,
    timeAgo: randomTime
  };
};

export function PurchaseNotification() {
  const [currentPurchase, setCurrentPurchase] = useState<Purchase | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsVisible(false);
    setIsClosed(true);
  };

  useEffect(() => {
    if (isClosed) return;

    let hideTimeout: NodeJS.Timeout;

    const showNotification = () => {
      const newPurchase = generatePurchase(Date.now());
      setCurrentPurchase(newPurchase);
      setIsVisible(true);

      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 8000);
    };

    const initialDelay = setTimeout(() => {
      showNotification();
    }, 5000);

    const interval = setInterval(() => {
      if (!isClosed) {
        showNotification();
      }
    }, 30000);

    return () => {
      clearTimeout(initialDelay);
      clearTimeout(hideTimeout);
      clearInterval(interval);
    };
  }, [isClosed]);

  if (!currentPurchase || isClosed) return null;

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 transition-all duration-500 ${
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
      }`}
    >
      <div className="bg-gradient-to-r from-gray-900 to-black border border-brand-green/40 rounded-lg shadow-2xl shadow-brand-green/20 p-4 max-w-xs relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
        <div className="flex items-start gap-3">
          <div className="bg-brand-green/20 rounded-full p-2 flex-shrink-0">
            <ShoppingBag className="w-5 h-5 text-brand-green" />
          </div>
          <div className="flex-1 min-w-0 pr-4">
            <p className="text-white font-semibold text-sm mb-1">
              {currentPurchase.name} acabou de comprar
            </p>
            <p className="text-brand-green font-bold text-base">
              {currentPurchase.amount} FC Coins
            </p>
            <p className="text-gray-400 text-xs mt-1">
              {currentPurchase.timeAgo}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
