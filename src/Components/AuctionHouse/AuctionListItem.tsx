import React from 'react';
import type { AuctionDTO } from '../../types/api';
import AuctionTimer from './AuctionTimer';
import { Coins, Gavel } from 'lucide-react';

interface AuctionListItemProps {
    auction: AuctionDTO;
    isSelected: boolean;
    onSelect: (auctionId: string) => void;
}

const AuctionListItem: React.FC<AuctionListItemProps> = ({ auction, isSelected, onSelect }) => {
    return (
        <div
            onClick={() => onSelect(auction.id)}
            className={`
                p-4 rounded-lg cursor-pointer transition-all duration-200
                flex flex-col space-y-3
                ${isSelected 
                    ? 'bg-primary-900/50 border-primary-500' 
                    : 'bg-dark-800 border-dark-700 hover:bg-dark-700/80'
                }
                border
            `}
        >
            <div className="flex justify-between items-start">
                <h3 className="font-bold text-white font-fantasy text-lg">{auction.itemName}</h3>
                <AuctionTimer endTime={auction.endTime} />
            </div>

            <div className="flex justify-between items-end text-sm">
                <div>
                    <p className="text-gray-400">Vendedor</p>
                    <p className="font-semibold text-gray-200">{auction.sellerCharacterName}</p>
                </div>
                <div className="text-right">
                    <p className="text-gray-400">Puja Actual</p>
                    <div className="flex items-center space-x-1 text-gold-400">
                        <Coins className="h-4 w-4" />
                        <span className="font-bold text-lg">{auction.currentPrice.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuctionListItem;

