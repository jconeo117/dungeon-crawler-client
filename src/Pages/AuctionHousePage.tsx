import React, { useEffect } from 'react';
import { useAuctionStore, fetchInitialAuctions } from '../store/AuctionStore';
import { auctionService } from '../services/AuctionService';
import AuctionListItem from '../Components/AuctionHouse/AuctionListItem';
import AuctionDetail from '../Components/AuctionHouse/AuctionDetail';

const AuctionHousePage = () => {
    const { auctions, selectedAuction, selectAuction } = useAuctionStore();

    useEffect(() => {
        // Carga los datos iniciales
        fetchInitialAuctions();
        
        // Inicia la simulación de eventos en tiempo real
        auctionService.start();

        // Limpia el intervalo cuando el componente se desmonta
        return () => {
            auctionService.stop();
        };
    }, []);

    return (
        <div 
            className="min-h-screen bg-dark-900 text-white pt-28 p-4 md:p-8"
            style={{ backgroundImage: `radial-gradient(circle at top right, rgba(14, 165, 233, 0.1), transparent 40%)` }}
        >
            <div className="container mx-auto">
                <header className="text-center mb-8 pt-24 max-lg:pt-12">
                    <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white text-shadow">
                        Casa de Subastas
                    </h1>
                    <p className="text-gray-400 mt-2">El mercado de los aventureros más audaces.</p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    {/* Columna de la lista de subastas */}
                    <div className="lg:col-span-1 max-h-[75vh] overflow-y-auto pr-2 space-y-3">
                        {auctions.map(auction => (
                            <AuctionListItem 
                                key={auction.id}
                                auction={auction}
                                isSelected={selectedAuction?.id === auction.id}
                                onSelect={selectAuction}
                            />
                        ))}
                    </div>

                    {/* Columna de detalles */}
                    <div className="lg:col-span-2 h-[75vh]">
                        <AuctionDetail />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionHousePage;

