import { useState, useEffect } from 'react';
import { supabase, FCCoinsPricing } from '../lib/supabase';
import { Edit, Save, X } from 'lucide-react';

export function AdminPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [pricing, setPricing] = useState<FCCoinsPricing | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editPrice, setEditPrice] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchPricing();
  }, []);

  const fetchPricing = async () => {
    const { data } = await supabase
      .from('fc_coins_pricing')
      .select('*')
      .eq('is_active', true)
      .maybeSingle();

    if (data) {
      setPricing(data);
      setEditAmount((data.amount / 1000).toString());
      setEditPrice(data.price.toString());
    }
  };

  const handleSave = async () => {
    if (!pricing) return;

    setIsSaving(true);
    const newAmount = parseInt(editAmount) * 1000;
    const newPrice = parseFloat(editPrice);

    const { error } = await supabase
      .from('fc_coins_pricing')
      .update({
        amount: newAmount,
        price: newPrice,
        updated_at: new Date().toISOString(),
      })
      .eq('id', pricing.id);

    if (!error) {
      await fetchPricing();
      setIsEditing(false);
    }

    setIsSaving(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-all"
      >
        Admin
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-gray-900 border border-emerald-500/30 rounded-xl p-4 shadow-2xl w-80 z-50">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold">Painel Admin</h3>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {pricing && (
        <div className="space-y-4">
          {!isEditing ? (
            <div className="bg-black/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm mb-2">Cotação Atual:</p>
              <p className="text-white text-lg font-bold">
                {pricing.amount / 1000}k coins = R$ {pricing.price.toFixed(2)}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 w-full bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Editar Preço
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <label className="text-gray-400 text-sm mb-1 block">
                  Quantidade (em K)
                </label>
                <input
                  type="number"
                  value={editAmount}
                  onChange={(e) => setEditAmount(e.target.value)}
                  className="w-full bg-black/50 border border-emerald-500/30 rounded-lg px-3 py-2 text-white"
                  placeholder="100"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm mb-1 block">
                  Preço (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={editPrice}
                  onChange={(e) => setEditPrice(e.target.value)}
                  className="w-full bg-black/50 border border-emerald-500/30 rounded-lg px-3 py-2 text-white"
                  placeholder="39.90"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Salvando...' : 'Salvar'}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditAmount((pricing.amount / 1000).toString());
                    setEditPrice(pricing.price.toString());
                  }}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
