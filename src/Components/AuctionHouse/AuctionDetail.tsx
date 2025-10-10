import React from 'react';
import { useAuctionStore } from '../../store/AuctionStore';
import { Coins, Gavel } from 'lucide-react';
import AuctionTimer from './AuctionTimer';
import type { BidDTO } from '../../types/api';

const StatDisplay = ({ label, value }: { label: string, value: number }) => (
    <div className="flex justify-between items-center text-gray-300">
        <span className="capitalize">{label.replace(/([A-Z])/g, ' $1')}</span>
        <span className="font-semibold text-green-400">+{value}</span>
    </div>
);

const BidHistory = ({ bids }: { bids: BidDTO[] }) => (
    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
        <h4 className="font-bold text-white font-fantasy mb-2">Historial de Pujas</h4>
        {bids.length > 0 ? bids.map((bid, index) => (
            <div key={index} className={`flex justify-between p-2 rounded ${index === 0 ? 'bg-primary-900/30' : ''}`}>
                <span className={index === 0 ? 'text-primary-300 font-semibold' : 'text-gray-400'}>{bid.bidderCharacterName}</span>
                <div className="flex items-center space-x-1 text-gold-400 font-semibold">
                    <Coins className="h-4 w-4" />
                    <span>{bid.amount.toLocaleString()}</span>
                </div>
            </div>
        )) : <p className="text-gray-500 text-sm">Aún no hay pujas. ¡Sé el primero!</p>}
    </div>
);


const AuctionDetail = () => {
    const { selectedAuction, placeBid } = useAuctionStore();

    if (!selectedAuction) {
        return <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 h-full flex items-center justify-center text-gray-500">Selecciona una subasta para ver los detalles.</div>;
    }
    
    const handlePlaceBid = () => {
        // En una app real, tomarías el valor de un input
        const bidAmount = Math.floor(selectedAuction.currentPrice * 1.1);
        placeBid(selectedAuction.id, bidAmount);
    }

    return (
        <div className="bg-dark-800/50 border border-dark-700 rounded-lg p-6 h-full flex flex-col">
            <header className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-3xl font-cinzel font-bold text-primary-300">{selectedAuction.itemName}</h2>
                    <p className="text-gray-400">Vendido por: <span className="font-semibold">{selectedAuction.sellerCharacterName}</span></p>
                </div>
                <AuctionTimer endTime={selectedAuction.endTime} />
            </header>

            <div className="my-4 border-t border-dark-600"></div>

            <div className="space-y-3 mb-4">
                <h3 className="font-bold text-white font-fantasy mb-2">Estadísticas del Ítem</h3>
                {/* {selectedAuction.item && Object.entries(selectedAuction.item.stats).map(([stat, value]) => (
                    <StatDisplay key={stat} label={stat} value={value} />
                ))} */}
            </div>
            
            <div className="my-4 border-t border-dark-600"></div>

            <div className="flex-grow">
                <BidHistory bids={selectedAuction.bids} />
            </div>
            
            <div className="my-4 border-t border-dark-600"></div>

            <footer className="space-y-4">
                 {selectedAuction.buyoutPrice && (
                    <div className="flex justify-between items-center">
                        <span className="text-gray-400">Compra Inmediata</span>
                        <button className="flex items-center space-x-2 text-gold-300 bg-gold-900/50 px-3 py-2 rounded-lg hover:bg-gold-800/50 transition">
                            <Coins className="h-5 w-5" />
                            <span className="font-bold">{selectedAuction.buyoutPrice.toLocaleString()}</span>
                        </button>
                    </div>
                 )}
                 
                 <div className="flex items-center space-x-2">
                     <input type="number" defaultValue={Math.floor(selectedAuction.currentPrice * 1.1)} className="w-full bg-dark-900 border border-dark-600 rounded-lg p-3 text-white focus:ring-primary-500 focus:border-primary-500"/>
                     <button onClick={handlePlaceBid} className="bg-primary-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-primary-500 transition-all duration-200 flex items-center space-x-2">
                        <Gavel className="h-5 w-5" />
                        <span>Pujar</span>
                     </button>
                 </div>
            </footer>
        </div>
    );
};

export default AuctionDetail;

