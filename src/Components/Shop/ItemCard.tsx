import React from 'react';
import { Coins, Swords, Shield, Heart } from 'lucide-react';
import type { ItemDTO } from '../../types/api';

// Función para obtener el color del borde y el ícono según el tipo de ítem
const getCardStyle = (itemType: string) => {
    switch (itemType) {
        case 'Weapon':
            return {
                borderColor: 'border-red-500',
                icon: <Swords className="h-8 w-8 text-red-400" />,
                shadow: 'shadow-[0_0_15px_rgba(239,68,68,0.4)]'
            };
        case 'Armor':
            return {
                borderColor: 'border-blue-500',
                icon: <Shield className="h-8 w-8 text-blue-400" />,
                shadow: 'shadow-[0_0_15px_rgba(59,130,246,0.4)]'
            };
        case 'Consumible':
            return {
                borderColor: 'border-green-500',
                icon: <Heart className="h-8 w-8 text-green-400" />,
                shadow: 'shadow-[0_0_15px_rgba(34,197,94,0.4)]'
            };
        default:
            return {
                borderColor: 'border-gray-600',
                icon: <Swords className="h-8 w-8 text-gray-500" />,
                shadow: 'shadow-none'
            };
    }
};

interface ItemCardProps {
  item: ItemDTO;
  onSelect: (item: ItemDTO) => void;
  isSelected: boolean;
}

const ItemCard: React.FC<ItemCardProps> = ({ item, onSelect, isSelected }) => {
  const { borderColor, icon, shadow } = getCardStyle(item.itemType);

  return (
    // Agregamos un div contenedor con padding para que el borde no se corte
    <div className={`p-1 rounded-lg ${isSelected ? 'bg-gradient-to-br from-primary-400 to-gold-500' : ''}`}>
        <div
            onClick={() => onSelect(item)}
            className={`
                bg-dark-800 rounded-md p-4 h-full
                flex items-center space-x-4 
                cursor-pointer transition-all duration-200
                border-2 border-transparent hover:border-primary-500/50
                ${isSelected ? 'ring-2 ring-offset-2 ring-offset-dark-800 ring-primary-400' : 'border-dark-700'}
            `}
        >
            <div className={`
                flex-shrink-0 h-16 w-16 rounded-lg 
                flex items-center justify-center 
                bg-dark-900/50 border-2 ${borderColor} ${isSelected ? shadow : ''}
            `}>
                {icon}
            </div>

            <div className="flex-grow">
                <h3 className="font-bold font-fantasy text-lg text-white">{item.name}</h3>
                <p className="text-sm text-gray-400">{item.itemType}</p>
            </div>

            <div className="flex-shrink-0 text-right">
                <div className="flex items-center space-x-1 text-gold-400">
                    <span className="font-bold text-lg">{item.value}</span>
                    <Coins className="h-5 w-5" />
                </div>
                <p className="text-xs text-gray-500">Gold</p>
            </div>
        </div>
    </div>
  );
};

export default ItemCard;

