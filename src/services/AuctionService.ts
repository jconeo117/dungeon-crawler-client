import { useAuctionStore } from '../store/AuctionStore';
import type { AuctionDTO, BidDTO } from '../types/api';

let simulationInterval: number | null = null;

// Simula una nueva puja en una subasta aleatoria
const simulateNewBid = () => {
    const store = useAuctionStore.getState();
    if (store.auctions.length === 0) return;

    // Elige una subasta aleatoria
    const randomAuctionIndex = Math.floor(Math.random() * store.auctions.length);
    const auctionToUpdate = { ...store.auctions[randomAuctionIndex] };

    // Simula una puja un 10% más alta
    const newBidAmount = Math.floor(auctionToUpdate.currentPrice * 1.1);

    const newBid: BidDTO = {
        bidderCharacterName: `Player${Math.floor(Math.random() * 100)}`,
        amount: newBidAmount,
        bidTime: new Date().toString(),
    };

    const updatedAuction: AuctionDTO = {
        ...auctionToUpdate,
        currentPrice: newBidAmount,
        bids: [newBid, ...auctionToUpdate.bids],
    };

    // Actualiza el store
    store.updateAuction(updatedAuction);
    console.log(`Simulated new bid on ${updatedAuction.itemName} for ${newBidAmount}`);
};

export const auctionService = {
    start: () => {
        if (simulationInterval) return;
        console.log('Auction simulation started.');
        // Cada 10 segundos, simula una nueva puja
        simulationInterval = setInterval(simulateNewBid, 10000);
    },
    stop: () => {
        if (simulationInterval) {
            clearInterval(simulationInterval);
            simulationInterval = null;
            console.log('Auction simulation stopped.');
        }
    },
};

/*
//  --- EJEMPLO DE CÓMO SERÍA CON SIGNALR ---
import { HubConnectionBuilder } from '@microsoft/signalr';

const connection = new HubConnectionBuilder()
    .withUrl("http://localhost:5055/auctionHub") // Reemplaza con la URL de tu API
    .withAutomaticReconnect()
    .build();

export const auctionService = {
    start: async () => {
        try {
            await connection.start();
            console.log("SignalR Connected.");

            connection.on("NewBid", (updatedAuction: AuctionDTO) => {
                useAuctionStore.getState().updateAuction(updatedAuction);
            });

            connection.on("AuctionEnded", (auctionId: string, status: string) => {
                // Lógica para manejar subasta terminada
            });

        } catch (err) {
            console.error('SignalR Connection Error: ', err);
        }
    },
    stop: () => {
        connection.stop();
    },
    invoke: (methodName: string, ...args: any[]) => {
        connection.invoke(methodName, ...args).catch(err => console.error(err));
    }
}
*/
