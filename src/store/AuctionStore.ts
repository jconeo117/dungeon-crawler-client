import { create } from 'zustand';
import type { AuctionDTO, BidDTO } from '../types/api'

// Helper para añadir tiempo a la fecha actual
const addMinutes = (date: Date, minutes: number) => {
  const newDate = new Date(date);
  newDate.setMinutes(date.getMinutes() + minutes);
  return newDate;
};

// --- DATOS MOCKEADOS ---
// Diseñados para ser fácilmente reemplazados por una llamada a la API
const mockAuctions: AuctionDTO[] = [
  {
    id: 'auc1',
    itemId: '1',
    itemName: 'Espada de Hierro Épica',
    sellerCharacterName: 'Gorok',
    sellerCharacterId: '1',
    startingPrice: 100,
    buyoutPrice: 500,
    currentPrice: 150,
    endTime: addMinutes(new Date(), 5).toString(), // Termina en 5 minutos
    status: 'Active',
    bids: [{ bidderCharacterName: 'Elara', amount: 150, bidTime: new Date().toDateString() }, { bidderCharacterName: 'Roric', amount: 125, bidTime: new Date().toString() }],
  },
  {
    id: 'auc2',
    itemId: '2',
    itemName: 'Pechera de Mithril',
    sellerCharacterName: 'Ironhand',
    sellerCharacterId: '2',
    startingPrice: 300,
    buyoutPrice: 1200,
    currentPrice: 300,
    endTime: addMinutes(new Date(), 60).toString(), // Termina en 1 hora
    status: 'Active',
    bids: [],
  },
  {
    id: 'auc3',
    itemId: '6',
    itemName: 'Anillo de Agilidad Legendario',
    sellerCharacterName: 'Shadow',
    sellerCharacterId: '3',
    startingPrice: 1000,
    currentPrice: 1500,
    endTime: addMinutes(new Date(), 120).toString(), // Termina en 2 horas
    status: 'Active',
    bids: [{ bidderCharacterName: 'Nightblade', amount: 1500, bidTime: new Date().toString() }],
  },
];

interface AuctionState {
  auctions: AuctionDTO[];
  selectedAuction: AuctionDTO | null;
  playerGold: number;
  
  // Acciones
  setAuctions: (auctions: AuctionDTO[]) => void;
  selectAuction: (auctionId: string) => void;
  updateAuction: (updatedAuction: AuctionDTO) => void;
  placeBid: (auctionId: string, amount: number) => void; // Simulación
}

export const useAuctionStore = create<AuctionState>((set, get) => ({
  auctions: [],
  selectedAuction: null,
  playerGold: 7500,

  setAuctions: (auctions) => {
    set({ 
      auctions,
      // Seleccionar la primera subasta por defecto si no hay ninguna seleccionada
      selectedAuction: get().selectedAuction ?? (auctions.length > 0 ? auctions[0] : null)
    });
  },

  selectAuction: (auctionId) => {
    const auction = get().auctions.find(a => a.id === auctionId);
    if (auction) {
      set({ selectedAuction: auction });
    }
  },

  updateAuction: (updatedAuction) => {
    set(state => {
        const newAuctions = state.auctions.map(a => a.id === updatedAuction.id ? updatedAuction : a);
        return {
            auctions: newAuctions,
            // Si la subasta actualizada es la que estaba seleccionada, actualizamos también la vista detallada
            selectedAuction: state.selectedAuction?.id === updatedAuction.id ? updatedAuction : state.selectedAuction
        };
    });
  },

  // Función de simulación para pujar
  placeBid: (auctionId, amount) => {
    const auction = get().auctions.find(a => a.id === auctionId);
    if (auction && amount > auction.currentPrice) {
      const newBid: BidDTO = {
        bidderCharacterName: 'You', // Simula que el jugador actual puja
        amount,
        bidTime: new Date().toString(),
      };
      
      const updatedAuction: AuctionDTO = {
        ...auction,
        currentPrice: amount,
        bids: [newBid, ...auction.bids],
      };

      get().updateAuction(updatedAuction);
    }
  },
}));

// Función para inicializar los datos (reemplazar con API call)
export const fetchInitialAuctions = () => {
  useAuctionStore.getState().setAuctions(mockAuctions);
};
