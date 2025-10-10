import { create } from 'zustand';
import type { ItemDTO } from '../types/api';// Datos de ejemplo hasta que conectemos la API

const mockItems: ItemDTO[] = [
  { id: '1', name: 'Espada de Hierro', description: 'Una espada básica pero fiable.', itemType: 'Weapon', value: 50, stats: { Strength: 5 } },
  { id: '2', name: 'Pechera de Cuero', description: 'Ofrece una protección modesta.', itemType: 'Armor', value: 75, stats: { Armor: 10, Vitality: 5 } },
  { id: '3', name: 'Poción de Salud Menor', description: 'Restaura 50 puntos de vida.', itemType: 'Consumible', value: 15, stats: { Health: 50 } },
  { id: '4', name: 'Arco de Cazador', description: 'Un arco ligero y rápido.', itemType: 'Weapon', value: 65, stats: { Dexterity: 7 } },
  { id: '5', name: 'Yelmo de Acero', description: 'Protección sólida para la cabeza.', itemType: 'Armor', value: 120, stats: { Armor: 15 } },
  { id: '6', name: 'Anillo de Agilidad', description: 'Aumenta la destreza del portador.', itemType: 'Armor', value: 250, stats: { Dexterity: 10 } },
];

type ShopState = {
  items: ItemDTO[];
  filteredItems: ItemDTO[];
  selectedItem: ItemDTO | null;
  filter: string;
  playerGold: number;
  fetchItems: () => void; // Simulará la llamada a la API
  setFilter: (filter: string) => void;
  selectItem: (item: ItemDTO | null) => void;
  buyItem: (itemId: string) => void; // Simulará la compra
};

export const useShopStore = create<ShopState>((set, get) => ({
  items: [],
  filteredItems: [],
  selectedItem: null,
  filter: 'All',
  playerGold: 5000,

  fetchItems: () => {
    // Aquí iría la llamada a la API. Por ahora, usamos los datos mock.
    set({ items: mockItems, filteredItems: mockItems, selectedItem: mockItems[0] || null });
  },

  setFilter: (filter: string) => {
    const { items } = get();
    const newFilteredItems = filter === 'All' 
      ? items 
      : items.filter(item => item.itemType === filter);
    set({ filter, filteredItems: newFilteredItems });
  },

  selectItem: (item: ItemDTO | null) => {
    set({ selectedItem: item });
  },

  buyItem: (itemId: string) => {
    const { items, playerGold } = get();
    const itemToBuy = items.find(item => item.id === itemId);

    if (itemToBuy && playerGold >= itemToBuy.value) {
      console.log(`Comprando ${itemToBuy.name} por ${itemToBuy.value} de oro.`);
      // Lógica de API para comprar el item aquí...
      set(state => ({
        playerGold: state.playerGold - itemToBuy.value,
        // Opcional: remover el item de la tienda si el stock es limitado
      }));
      // Aquí podrías mostrar una notificación de éxito
    } else {
      console.log('Oro insuficiente o el item no existe.');
      // Aquí podrías mostrar una notificación de error
    }
  },
}));
