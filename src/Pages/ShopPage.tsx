import React, { useEffect } from 'react';
import { Coins } from 'lucide-react';
import { useShopStore } from '../store/ShopStore';
import ItemCard from '../Components/Shop/ItemCard';
import ItemDetail from '../Components/Shop/ItemDetail';
import ShopFilter from '../Components/Shop/ShopFilter';

const ShopPage = () => {
    const {
        filteredItems,
        selectedItem,
        selectItem,
        fetchItems,
        playerGold
    } = useShopStore();

    useEffect(() => {
        // Al montar el componente, cargamos los items
        fetchItems();
    }, [fetchItems]);

    return (
        <div
            className="min-h-screen bg-dark-900 text-white pt-28 p-4 md:p-8"
            style={{
                backgroundImage: `radial-gradient(circle at top right, rgba(14, 165, 233, 0.1), transparent 40%),
                            radial-gradient(circle at bottom left, rgba(180, 83, 9, 0.1), transparent 50%)`
            }}
        >
            <div className="container mx-auto relative">
                <header className="text-center mb-8 pt-24 max-lg:pt-12">
                    <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white text-shadow">
                        Mercado del Herrero
                    </h1>
                    <p className="text-gray-400 mt-2">Equípate para la batalla que te espera.</p>
                </header>

                <div className="absolute top-36 right-0 bg-dark-900/80 p-3 rounded-lg flex items-center space-x-3 border border-dark-700">
                    <Coins className="h-8 w-8 text-gold-400" />
                    <span className="text-2xl font-bold text-white">{playerGold.toLocaleString()}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2">
                        <ShopFilter />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto pr-2 place-content-start">
                            {filteredItems.map(item => (
                                <ItemCard
                                    key={item.id}
                                    item={item}
                                    onSelect={selectItem}
                                    isSelected={selectedItem?.id === item.id}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1 h-[75vh]">
                        <ItemDetail />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShopPage;

