import { useState, useMemo } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { 
  Search, 
  Filter, 
  SortAsc,
  Package,
  Sword,
  Shield,
  Sparkles,
  Trash2,
  Info,
  X,
  TrendingUp,
  Coins
} from 'lucide-react';

interface InventoryItem {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  type: 'weapon' | 'armor' | 'consumable' | 'material';
  level?: number;
  quantity: number;
  value: number;
  stats?: {
    [key: string]: number;
  };
  slot: number;
}

const ItemTypes = {
  INVENTORY_ITEM: 'inventoryItem',
};

const rarityConfig = {
  common: {
    color: 'border-gray-500',
    bg: 'bg-gray-500/10',
    text: 'text-gray-300',
    glow: 'shadow-gray-500/20',
  },
  uncommon: {
    color: 'border-green-500',
    bg: 'bg-green-500/10',
    text: 'text-green-300',
    glow: 'shadow-green-500/20',
  },
  rare: {
    color: 'border-blue-500',
    bg: 'bg-blue-500/10',
    text: 'text-blue-300',
    glow: 'shadow-blue-500/20',
  },
  epic: {
    color: 'border-purple-500',
    bg: 'bg-purple-500/10',
    text: 'text-purple-300',
    glow: 'shadow-purple-500/20',
  },
  legendary: {
    color: 'border-gold-500',
    bg: 'bg-gold-500/10',
    text: 'text-gold-400',
    glow: 'shadow-gold-500/20',
  },
  mythic: {
    color: 'border-red-500',
    bg: 'bg-red-500/10',
    text: 'text-red-300',
    glow: 'shadow-red-500/20',
  },
};

const typeIcons = {
  weapon: Sword,
  armor: Shield,
  consumable: Sparkles,
  material: Package,
};

const InventorySlot: React.FC<{
  item: InventoryItem | null;
  slotIndex: number;
  onDrop: (fromSlot: number, toSlot: number) => void;
  onClick: (item: InventoryItem) => void;
}> = ({ item, slotIndex, onDrop, onClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.INVENTORY_ITEM,
    item: { slotIndex },
    canDrag: !!item,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.INVENTORY_ITEM,
    drop: (draggedItem: { slotIndex: number }) => {
      if (draggedItem.slotIndex !== slotIndex) {
        onDrop(draggedItem.slotIndex, slotIndex);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  const TypeIcon = item ? typeIcons[item.type] : Package;
  const rarity = item ? rarityConfig[item.rarity] : null;

  // Combinar refs correctamente
  const dragDropRef = (node: HTMLDivElement | null) => {
    drag(node);
    drop(node);
  };

  return (
    <div
      ref={dragDropRef}
      onClick={() => item && onClick(item)}
      className={`
        relative aspect-square rounded-lg border-2 transition-all duration-200 cursor-pointer
        ${item 
          ? `${rarity?.color} ${rarity?.bg} hover:scale-105 hover:shadow-lg ${rarity?.glow}` 
          : 'border-dark-700 bg-dark-800/30 hover:border-dark-600'
        }
        ${isDragging ? 'opacity-50 scale-95' : ''}
        ${isOver ? 'ring-2 ring-primary-400 scale-105' : ''}
      `}
    >
      {item ? (
        <>
          {/* Item Icon/Image */}
          <div className="absolute inset-0 flex items-center justify-center p-3">
            <TypeIcon className={`h-10 w-10 ${rarity?.text}`} />
          </div>

          {/* Quantity Badge */}
          {item.quantity > 1 && (
            <div className="absolute bottom-1 right-1 bg-dark-900/90 px-2 py-0.5 rounded-md">
              <span className="text-xs font-bold text-white">{item.quantity}</span>
            </div>
          )}

          {/* Level Badge */}
          {item.level && (
            <div className="absolute top-1 left-1 bg-dark-900/90 px-2 py-0.5 rounded-md">
              <span className="text-xs font-bold text-gold-400">Lv.{item.level}</span>
            </div>
          )}

          {/* Rarity Indicator */}
          <div className="absolute top-1 right-1">
            <div className={`w-2 h-2 rounded-full ${rarity?.color.replace('border', 'bg')}`} />
          </div>
        </>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center">
          <Package className="h-8 w-8 text-dark-600" />
        </div>
      )}
    </div>
  );
};

const ItemDetailsModal: React.FC<{
  item: InventoryItem | null;
  onClose: () => void;
  onDelete: (itemId: string) => void;
}> = ({ item, onClose, onDelete }) => {
  if (!item) return null;

  const rarity = rarityConfig[item.rarity];
  const TypeIcon = typeIcons[item.type];

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-dark-900 border-2 ${rarity.color} rounded-xl max-w-md w-full p-6 shadow-2xl ${rarity.glow}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`p-3 rounded-xl ${rarity.bg} border ${rarity.color}`}>
              <TypeIcon className={`h-8 w-8 ${rarity.text}`} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border ${rarity.color} ${rarity.bg} ${rarity.text}`}>
                <Sparkles className="h-3 w-3" />
                {item.rarity.toUpperCase()}
              </span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {/* Description */}
        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
          {item.description}
        </p>

        {/* Item Info */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-dark-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Type</p>
            <p className="text-sm font-semibold text-white capitalize">{item.type}</p>
          </div>
          {item.level && (
            <div className="bg-dark-800/50 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Level</p>
              <p className="text-sm font-semibold text-gold-400">{item.level}</p>
            </div>
          )}
          <div className="bg-dark-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Quantity</p>
            <p className="text-sm font-semibold text-white">{item.quantity}</p>
          </div>
          <div className="bg-dark-800/50 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Value</p>
            <p className="text-sm font-semibold text-gold-400 flex items-center gap-1">
              <Coins className="h-3 w-3" />
              {item.value.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Stats */}
        {item.stats && Object.keys(item.stats).length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-400 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Item Stats
            </h4>
            <div className="space-y-2">
              {Object.entries(item.stats).map(([stat, value]) => (
                <div 
                  key={stat}
                  className="flex items-center justify-between p-2 rounded-lg bg-dark-800/50"
                >
                  <span className="text-sm text-gray-300 capitalize">{stat}</span>
                  <span className="text-sm font-bold text-success-400">+{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          {item.type === 'weapon' || item.type === 'armor' ? (
            <button className="flex-1 px-4 py-2 bg-primary-900/20 hover:bg-primary-900/30 text-primary-300 rounded-lg font-medium transition-colors border border-primary-800/50">
              Equip
            </button>
          ) : item.type === 'consumable' ? (
            <button className="flex-1 px-4 py-2 bg-green-900/20 hover:bg-green-900/30 text-green-300 rounded-lg font-medium transition-colors border border-green-800/50">
              Use
            </button>
          ) : null}
          <button 
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
            className="px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-300 rounded-lg font-medium transition-colors border border-red-800/50 flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const InventoryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'rarity' | 'level' | 'value'>('name');
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(null);
  
  // Mock inventory data
  const [inventory, setInventory] = useState<(InventoryItem | null)[]>(() => {
    const items: InventoryItem[] = [
      {
        id: '1',
        name: 'Dragon Slayer',
        description: 'A legendary sword forged from dragon scales, imbued with ancient power.',
        rarity: 'legendary',
        type: 'weapon',
        level: 45,
        quantity: 1,
        value: 5000,
        stats: { strength: 35, criticalChance: 12, attack: 250 },
        slot: 0,
      },
      {
        id: '2',
        name: 'Health Potion',
        description: 'Restores 500 HP instantly. Essential for survival.',
        rarity: 'common',
        type: 'consumable',
        quantity: 15,
        value: 50,
        stats: { health: 500 },
        slot: 1,
      },
      {
        id: '3',
        name: 'Plate of the Ancients',
        description: 'Heavy armor plate that has protected warriors for generations.',
        rarity: 'epic',
        type: 'armor',
        level: 42,
        quantity: 1,
        value: 3500,
        stats: { defense: 45, vitality: 25 },
        slot: 2,
      },
      {
        id: '4',
        name: 'Dragon Scale',
        description: 'Rare crafting material obtained from dragons.',
        rarity: 'rare',
        type: 'material',
        quantity: 8,
        value: 800,
        slot: 3,
      },
      {
        id: '5',
        name: 'Mana Crystal',
        description: 'Pure crystallized mana energy.',
        rarity: 'uncommon',
        type: 'material',
        quantity: 23,
        value: 150,
        slot: 4,
      },
      {
        id: '6',
        name: 'Ethereal Blade',
        description: 'A mystical blade that phases between dimensions.',
        rarity: 'mythic',
        type: 'weapon',
        level: 50,
        quantity: 1,
        value: 10000,
        stats: { strength: 50, intelligence: 30, criticalChance: 20 },
        slot: 5,
      },
    ];

    const slots = new Array(48).fill(null);
    items.forEach(item => {
      slots[item.slot] = item;
    });
    return slots;
  });

  const maxSlots = 48;
  const usedSlots = inventory.filter(item => item !== null).length;

  // Filter and sort logic
  const filteredItems = useMemo(() => {
    return inventory.filter((item) => {
      if (!item) return false;
      
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
      
      return matchesSearch && matchesType && matchesRarity;
    });
  }, [inventory, searchQuery, selectedType, selectedRarity]);

  const handleDrop = (fromSlot: number, toSlot: number) => {
    setInventory((prev) => {
      const newInventory = [...prev];
      [newInventory[fromSlot], newInventory[toSlot]] = [newInventory[toSlot], newInventory[fromSlot]];
      
      // Update slot numbers
      if (newInventory[fromSlot]) {
        newInventory[fromSlot] = { ...newInventory[fromSlot]!, slot: fromSlot };
      }
      if (newInventory[toSlot]) {
        newInventory[toSlot] = { ...newInventory[toSlot]!, slot: toSlot };
      }
      
      return newInventory;
    });
  };

  const handleDeleteItem = (itemId: string) => {
    setInventory((prev) => 
      prev.map(item => item?.id === itemId ? null : item)
    );
  };

  const totalValue = inventory.reduce((sum, item) => 
    sum + (item ? item.value * item.quantity : 0), 0
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="space-y-6">
        {/* Header Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary-900/30">
                <Package className="h-5 w-5 text-primary-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Inventory Space</p>
                <p className="text-lg font-bold text-white">{usedSlots} / {maxSlots}</p>
              </div>
            </div>
          </div>

          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gold-900/30">
                <Coins className="h-5 w-5 text-gold-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Value</p>
                <p className="text-lg font-bold text-gold-400">{totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-900/30">
                <Sparkles className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Unique Items</p>
                <p className="text-lg font-bold text-white">{usedSlots}</p>
              </div>
            </div>
          </div>

          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-900/30">
                <Info className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <p className="text-xs text-gray-400">Filtered</p>
                <p className="text-lg font-bold text-white">{filteredItems.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search items..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="weapon">Weapons</option>
                <option value="armor">Armor</option>
                <option value="consumable">Consumables</option>
                <option value="material">Materials</option>
              </select>
            </div>

            {/* Rarity Filter */}
            <div className="relative">
              <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select
                value={selectedRarity}
                onChange={(e) => setSelectedRarity(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Rarities</option>
                <option value="common">Common</option>
                <option value="uncommon">Uncommon</option>
                <option value="rare">Rare</option>
                <option value="epic">Epic</option>
                <option value="legendary">Legendary</option>
                <option value="mythic">Mythic</option>
              </select>
            </div>
          </div>
        </div>

        {/* Inventory Grid */}
        <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-gaming">Inventory</h2>
            <p className="text-sm text-gray-400">
              Drag items to reorganize • Click for details
            </p>
          </div>
          
          <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
            {inventory.map((item, index) => (
              <InventorySlot
                key={index}
                item={item}
                slotIndex={index}
                onDrop={handleDrop}
                onClick={setSelectedItem}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedItem && (
        <ItemDetailsModal 
          item={selectedItem} 
          onClose={() => setSelectedItem(null)}
          onDelete={handleDeleteItem}
        />
      )}
    </DndProvider>
  );
};

export default InventoryPage;