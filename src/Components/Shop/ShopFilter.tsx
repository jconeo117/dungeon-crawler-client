import React from 'react';
import { useShopStore } from '../../store/ShopStore';

const filters = ['All', 'Weapon', 'Armor', 'Consumible'];

const ShopFilter: React.FC = () => {
    const { filter, setFilter } = useShopStore();

    return (
        <div className="mb-6 flex items-center justify-center space-x-2 p-2 bg-dark-800 rounded-lg">
            {filters.map(f => (
                <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`
                        px-4 py-2 rounded-md font-fantasy font-semibold text-sm transition-colors duration-200
                        ${filter === f ? 'bg-primary-600 text-white shadow-md' : 'text-gray-400 hover:bg-dark-700 hover:text-white'}
                    `}
                >
                    {f}
                </button>
            ))}
        </div>
    );
};

export default ShopFilter;

