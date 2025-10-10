import React from 'react';
import type { ItemDTO } from '../../types/api'; // Corregido para importación relativa
import { Coins, PlusCircle, MinusCircle } from 'lucide-react';
import { useShopStore } from '../../store/ShopStore'; // Corregido para importación relativa

const StatDisplay: React.FC<{ label: string; value: number | undefined }> = ({ label, value }) => {
    if (value === undefined) return null;
    const isBuff = value > 0;
    
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">{label}</span>
            <div className={`flex items-center space-x-1 font-semibold ${isBuff ? 'text-green-400' : 'text-red-400'}`}>
                {isBuff ? <PlusCircle size={14} /> : <MinusCircle size={14} />}
                <span>{value}</span>
            </div>
        </div>
    );
};


const ItemDetail: React.FC = () => {
    const selectedItem = useShopStore(state => state.selectedItem);
    const buyItem = useShopStore(state => state.buyItem);

    if (!selectedItem) {
        return (
            <div className="flex items-center justify-center h-full bg-dark-900/50 rounded-xl border border-dark-700">
                <p className="text-gray-500 font-fantasy">Selecciona un ítem para ver sus detalles</p>
            </div>
        );
    }
    
    const { name, description, value, stats } = selectedItem;

    return (
        <div className="h-full flex flex-col p-6 bg-dark-900/50 rounded-xl border border-dark-700 text-white">
            <h2 className="text-3xl font-bold font-cinzel text-primary-300 mb-2">{name}</h2>
            <p className="text-gray-400 italic mb-6">"{description}"</p>
            
            <div className="space-y-3 mb-6 flex-grow">
                <h4 className="font-bold text-lg font-fantasy border-b border-dark-700 pb-2">Estadísticas</h4>
                {Object.entries(stats).map(([key, val]) => (
                    <StatDisplay key={key} label={key} value={val} />
                ))}
                {Object.keys(stats).length === 0 && <p className="text-gray-500 text-sm">Este ítem no tiene estadísticas.</p>}
            </div>

            <div className="mt-auto pt-6 border-t border-dark-700">
                <div className="flex justify-between items-center mb-4">
                    <span className="text-xl font-fantasy text-gray-300">Precio:</span>
                    <div className="flex items-center space-x-2 text-2xl font-bold text-gold-300">
                        <Coins className="h-6 w-6" />
                        <span>{value}</span>
                    </div>
                </div>
                <button 
                    onClick={() => buyItem(selectedItem.id)}
                    className="w-full font-fantasy font-bold bg-emerald-600 text-white px-6 py-3 rounded-md hover:bg-emerald-500 transition-all duration-300 shadow-lg hover:shadow-emerald-500/40 transform hover:-translate-y-0.5 btn-glow"
                >
                    Comprar Ítem
                </button>
            </div>
        </div>
    );
};

export default ItemDetail;

