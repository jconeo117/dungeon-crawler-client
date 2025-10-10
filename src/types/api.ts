/**
 * Interfaces para la comunicación con la API de Dungeon Crawler.
 * Estos tipos definen la estructura de los datos que se envían y reciben
 * entre el cliente (frontend) y el servidor (backend).
 */

// ========== ACCOUNT DTOs ==========
// Relacionados con la autenticación y gestión de cuentas de usuario.

export interface RegisterDTO {
  email: string;
  password?: string; // Es buena práctica no manejar passwords en el estado del cliente si es posible.
  confirmPassword?: string;
  userName: string;
  displayName?: string; // Propiedad opcional por si se añade en el futuro.
}

export interface LoginDTO {
  email: string;
  password?: string;
  rememberMe: boolean;
}

export interface ChangePasswordDTO {
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

// ========== USER DTOs ==========
// Información del perfil del usuario.

export interface UserDTO {
  id: string;
  username: string;
  displayName: string;
  email: string;
  createdAt: string; // Las fechas se manejan como string en JSON.
}

// ========== AUTH RESPONSE DTOs ==========
// Respuesta del servidor tras un login o registro exitoso.

export interface AuthResponseDTO {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  userProfile: UserDTO;
}

// ========== CHARACTER DTOs ==========
// Relacionados con los personajes del juego.

export interface CreateCharacterDTO {
  name: string;
}

export interface CharacterDTO {
  id: string;
  name: string;
  level: number;
  experience: number;
  gold: number;
}

export interface CharacterProfileDTO {
  id: string;
  name: string;
  level: number;
  experience: number;
  gold: number;
  characterStats: CharacterStatsDTO;
  equipmentSlots: EquipmentSlotDTO[];
}

export interface CharacterStatsDTO {
  health: number;
  mana: number;
  strength: number;
  dexterity: number;
  intelligence: number;
  vitality: number;
  armor: number;
  magicResist: number;
  criticalChance: number;
  attackSpeed?: number; // Puede ser opcional dependiendo de la lógica del juego
}

// ========== ITEM & INVENTORY DTOs ==========
// Relacionados con los objetos y el inventario de los personajes.

/**
 * Enumeración para los tipos de slot de equipamiento.
 * Debe coincidir con el enum `EquipmentSlotType` del backend.
 */
export const EquipmentSlotType = {
  Weapon: 0,
  Shield: 1,
  Helmet: 2,
  Chest: 3,
  Legs: 4,
  Boots: 5,
  Ring1: 6,
  Ring2: 7,
} as const;

export type EquipmentSlotType = typeof EquipmentSlotType[keyof typeof EquipmentSlotType];

export interface ItemStatsDTO {
  health?: number;
  mana?: number;
  strength?: number;
  dexterity?: number;
  intelligence?: number;
  vitality?: number;
  armor?: number;
  magicResist?: number;
  criticalChance?: number;
  attackSpeed?: number;
}

export interface ItemDTO {
  id: string;
  name: string;
  description: string;
  itemType: string; // "Weapon", "Armor", "Consumible"
  value: number;
  stats: Record<string, number>; // Un objeto para estadísticas dinámicas.
}

export interface ItemSlotDTO {
    name: string;
    itemType: string;
    stats: Record<string, number>;
}


export interface CreateItemDTO {
  name: string;
  description: string;
  itemType: string;
  value: number;
  stats: ItemStatsDTO;
}

export interface UpdateItemDTO {
  name?: string;
  description?: string;
  itemType?: string;
  value?: number;
  stats?: ItemStatsDTO;
}

export interface InventoryDTO {
  id: string;
  numSlots: number;
  items: ItemDTO[];
}

export interface EquipItemRequestDTO {
  itemId: string;
  slotType: EquipmentSlotType;
}

export interface UnequipItemRequestDTO {
  slotType: EquipmentSlotType;
}

export interface EquipmentSlotDTO {
    slotType: string; // "Weapon", "Helmet", etc.
    item: ItemSlotDTO | null;
}


// ========== DUNGEON DTOs ==========
// Relacionados con las mazmorras y las partidas.

export interface DungeonDTO {
  id: string;
  name: string;
  description: string;
  difficulty: number;
}

export interface CreateDungeonDTO {
  name: string;
  description: string;
  difficulty: number;
}

export interface UpdateDungeonDTO {
  name?: string;
  description?: string;
  difficulty?: number;
}

export interface DungeonRunDTO {
  id: string;
  dungeonName: string;
  isSuccess: boolean;
  completionTime: number;
  createdAt: string;
}

export interface CompleteDungeonRunDTO {
  isSuccess: boolean;
  completionTime: number;
}

// ========== AUCTION DTOs ==========
// Relacionados con el sistema de subastas.

export interface AuctionDTO {
  id: string;
  itemId: string;
  itemName: string;
  sellerCharacterId: string;
  sellerCharacterName: string;
  startingPrice: number;
  buyoutPrice?: number;
  currentPrice: number;
  endTime: string;
  status: string; // "Active", "Sold", "Expired"
  bids: BidDTO[];
}

export interface CreateAuctionDTO {
  itemId: string;
  startingPrice: number;
  buyoutPrice?: number;
  durationInHours: number;
}

export interface BidDTO {
  bidderCharacterName: string;
  amount: number;
  bidTime: string;
}

export interface CreateBidDTO {
  amount: number;
}
