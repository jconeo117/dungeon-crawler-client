import { useState, useMemo } from 'react';
import { 
  Search, 
  ShoppingCart,
  Coins,
  TrendingUp,
  Sparkles,
  Sword,
  Shield,
  Package,
  Filter,
  X,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Store,
  Tag,
  Flame
} from 'lucide-react';

interface ShopItem {
  id: string;
  name: string;
  description: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  type: 'weapon' | 'armor' | 'consumable' | 'material';
  price: number;
  stock: number;
  level?: number;
  discount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  stats?: {
    [key: string]: number;
  };
}

interface CartItem extends ShopItem {
  quantity: number;
}

const rarityConfig = {
  common: { color: 'border-gray-500', bg: 'bg-gray-500/10', text: 'text-gray-300' },
  uncommon: { color: 'border-green-500', bg: 'bg-green-500/10', text: 'text-green-300' },
  rare: { color: 'border-blue-500', bg: 'bg-blue-500/10', text: 'text-blue-300' },
  epic: { color: 'border-purple-500', bg: 'bg-purple-500/10', text: 'text-purple-300' },
  legendary: { color: 'border-gold-500', bg: 'bg-gold-500/10', text: 'text-gold-300' },
  mythic: { color: 'border-red-500', bg: 'bg-red-500/10', text: 'text-red-300' },
};

const typeIcons = {
  weapon: Sword,
  armor: Shield,
  consumable: Sparkles,
  material: Package,
};

const ShopItemCard: React.FC<{
  item: ShopItem;
  onAddToCart: (item: ShopItem) => void;
  inCart: boolean;
}> = ({ item, onAddToCart, inCart }) => {
  const rarity = rarityConfig[item.rarity];
  const TypeIcon = typeIcons[item.type];
  const finalPrice = item.discount 
    ? Math.floor(item.price * (1 - item.discount / 100))
    : item.price;

  return (
    <div className={`
      gaming-card bg-dark-800/50 backdrop-blur-sm rounded-xl overflow-hidden
      border-2 ${rarity.color} hover:scale-[1.02] transition-all duration-300
      ${item.isFeatured ? 'ring-2 ring-gold-500/50' : ''}
    `}>
      {/* Badges */}
      <div className="absolute top-2 left-2 flex flex-col gap-2 z-10">
        {item.isNew && (
          <span className="bg-primary-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Sparkles className="h-3 w-3" />
            NEW
          </span>
        )}
        {item.discount && (
          <span className="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Tag className="h-3 w-3" />
            -{item.discount}%
          </span>
        )}
        {item.isFeatured && (
          <span className="bg-gold-500 text-dark-900 px-2 py-1 rounded-md text-xs font-bold flex items-center gap-1">
            <Flame className="h-3 w-3" />
            HOT
          </span>
        )}
      </div>

      {/* Item Image/Icon */}
      <div className={`relative h-48 flex items-center justify-center ${rarity.bg} p-8`}>
        <TypeIcon className={`h-24 w-24 ${rarity.text}`} />
        {item.level && (
          <div className="absolute top-2 right-2 bg-dark-900/90 px-2 py-1 rounded-md">
            <span className="text-xs font-bold text-gold-400">Lv.{item.level}</span>
          </div>
        )}
      </div>

      {/* Item Info */}
      <div className="p-4 space-y-3">
        {/* Title & Rarity */}
        <div>
          <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">{item.name}</h3>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold border ${rarity.color} ${rarity.bg} ${rarity.text}`}>
            <Sparkles className="h-3 w-3" />
            {item.rarity.toUpperCase()}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>

        {/* Stats Preview */}
        {item.stats && Object.keys(item.stats).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {Object.entries(item.stats).slice(0, 3).map(([stat, value]) => (
              <span 
                key={stat}
                className="text-xs px-2 py-1 bg-dark-700/50 rounded-md text-success-400 font-semibold"
              >
                +{value} {stat}
              </span>
            ))}
            {Object.keys(item.stats).length > 3 && (
              <span className="text-xs px-2 py-1 bg-dark-700/50 rounded-md text-gray-400">
                +{Object.keys(item.stats).length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-dark-700">
          <div>
            <div className="flex items-center gap-2">
              <Coins className="h-4 w-4 text-gold-400" />
              <span className="text-xl font-bold text-gold-400">{finalPrice.toLocaleString()}</span>
            </div>
            {item.discount && (
              <span className="text-xs text-gray-500 line-through">{item.price.toLocaleString()}</span>
            )}
          </div>
          
          <button
            onClick={() => onAddToCart(item)}
            disabled={item.stock === 0 || inCart}
            className={`
              px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
              ${inCart 
                ? 'bg-success-900/20 text-success-300 border border-success-800/50 cursor-not-allowed'
                : item.stock === 0
                ? 'bg-dark-700 text-gray-500 cursor-not-allowed'
                : 'bg-primary-900/30 hover:bg-primary-900/50 text-primary-300 border border-primary-800/50'
              }
            `}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4" />
                In Cart
              </>
            ) : item.stock === 0 ? (
              'Sold Out'
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Add
              </>
            )}
          </button>
        </div>

        {/* Stock indicator */}
        {item.stock > 0 && item.stock <= 5 && (
          <div className="flex items-center gap-2 text-xs text-orange-400">
            <AlertCircle className="h-3 w-3" />
            Only {item.stock} left!
          </div>
        )}
      </div>
    </div>
  );
};

const ShoppingCartSidebar: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (itemId: string, delta: number) => void;
  onRemove: (itemId: string) => void;
  onCheckout: () => void;
  playerGold: number;
}> = ({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout, playerGold }) => {
  const total = cart.reduce((sum, item) => {
    const price = item.discount 
      ? Math.floor(item.price * (1 - item.discount / 100))
      : item.price;
    return sum + (price * item.quantity);
  }, 0);

  const canAfford = total <= playerGold;

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full sm:w-96 bg-dark-900 border-l-2 border-primary-800/50 shadow-2xl z-50 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-white font-gaming flex items-center gap-2">
              <ShoppingCart className="h-6 w-6 text-primary-400" />
              Cart
            </h2>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
          <p className="text-sm text-gray-400">{cart.length} items</p>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-8">
              <ShoppingCart className="h-16 w-16 text-gray-600 mb-4" />
              <p className="text-gray-400 mb-2">Your cart is empty</p>
              <p className="text-sm text-gray-500">Add items from the shop to get started</p>
            </div>
          ) : (
            cart.map((item) => {
              const rarity = rarityConfig[item.rarity];
              const TypeIcon = typeIcons[item.type];
              const price = item.discount 
                ? Math.floor(item.price * (1 - item.discount / 100))
                : item.price;

              return (
                <div 
                  key={item.id}
                  className={`gaming-card bg-dark-800/50 backdrop-blur-sm p-3 rounded-lg border ${rarity.color}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${rarity.bg}`}>
                      <TypeIcon className={`h-6 w-6 ${rarity.text}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-white mb-1 truncate">{item.name}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                        <Coins className="h-3 w-3 text-gold-400" />
                        <span className="text-gold-400 font-semibold">{price.toLocaleString()}</span>
                        {item.discount && (
                          <span className="line-through text-gray-600">{item.price.toLocaleString()}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 bg-dark-700 hover:bg-dark-600 rounded transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-semibold text-white min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="p-1 bg-dark-700 hover:bg-dark-600 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemove(item.id)}
                      className="p-1 hover:bg-red-900/20 rounded transition-colors"
                    >
                      <X className="h-4 w-4 text-red-400" />
                    </button>
                  </div>

                  <div className="mt-2 pt-2 border-t border-dark-700 flex justify-between text-xs">
                    <span className="text-gray-400">Subtotal:</span>
                    <span className="text-gold-400 font-semibold">{(price * item.quantity).toLocaleString()}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer/Checkout */}
        {cart.length > 0 && (
          <div className="p-6 border-t-2 border-dark-700 space-y-4">
            {/* Gold Balance */}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Your Gold:</span>
              <span className="text-white font-semibold flex items-center gap-1">
                <Coins className="h-4 w-4 text-gold-400" />
                {playerGold.toLocaleString()}
              </span>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-lg border-t border-dark-700 pt-4">
              <span className="text-white font-bold">Total:</span>
              <span className={`font-bold flex items-center gap-1 ${canAfford ? 'text-gold-400' : 'text-red-400'}`}>
                <Coins className="h-5 w-5" />
                {total.toLocaleString()}
              </span>
            </div>

            {/* Warning if can't afford */}
            {!canAfford && (
              <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800/50 rounded-lg text-red-300 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                <span>Insufficient gold! Need {(total - playerGold).toLocaleString()} more.</span>
              </div>
            )}

            {/* Checkout Button */}
            <button
              onClick={onCheckout}
              disabled={!canAfford}
              className={`
                w-full py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2
                ${canAfford
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-dark-900 shadow-gold'
                  : 'bg-dark-700 text-gray-500 cursor-not-allowed'
                }
              `}
            >
              <ShoppingCart className="h-5 w-5" />
              {canAfford ? 'Complete Purchase' : 'Insufficient Gold'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const ShopPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedRarity, setSelectedRarity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'level'>('name');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Mock player gold
  const playerGold = 12450;

  // Mock shop items
  const shopItems: ShopItem[] = [
    {
      id: '1',
      name: 'Excalibur',
      description: 'A legendary sword once wielded by the greatest kings. Unmatched in power and prestige.',
      rarity: 'legendary',
      type: 'weapon',
      price: 8000,
      stock: 1,
      level: 50,
      discount: 15,
      isFeatured: true,
      stats: { strength: 50, criticalChance: 25, attack: 300 },
    },
    {
      id: '2',
      name: 'Health Potion (Large)',
      description: 'Restores 1000 HP instantly. Perfect for tough battles.',
      rarity: 'uncommon',
      type: 'consumable',
      price: 150,
      stock: 50,
      isNew: true,
      stats: { health: 1000 },
    },
    {
      id: '3',
      name: 'Dragon Scale Armor',
      description: 'Forged from dragon scales, this armor provides exceptional protection.',
      rarity: 'epic',
      type: 'armor',
      price: 5000,
      stock: 3,
      level: 45,
      discount: 20,
      stats: { defense: 60, vitality: 30, fireResist: 40 },
    },
    {
      id: '4',
      name: 'Mana Potion',
      description: 'Restores 500 mana. Essential for spellcasters.',
      rarity: 'common',
      type: 'consumable',
      price: 80,
      stock: 100,
      stats: { mana: 500 },
    },
    {
      id: '5',
      name: 'Mythril Ingot',
      description: 'Rare crafting material used in legendary equipment.',
      rarity: 'rare',
      type: 'material',
      price: 600,
      stock: 15,
      isNew: true,
    },
    {
      id: '6',
      name: 'Phoenix Blade',
      description: 'A mystical blade that burns with eternal flames.',
      rarity: 'mythic',
      type: 'weapon',
      price: 15000,
      stock: 1,
      level: 55,
      isFeatured: true,
      stats: { strength: 60, intelligence: 40, criticalChance: 30, fireAttack: 50 },
    },
    {
      id: '7',
      name: 'Adamantium Shield',
      description: 'An indestructible shield made from the hardest metal.',
      rarity: 'legendary',
      type: 'armor',
      price: 7000,
      stock: 2,
      level: 48,
      discount: 10,
      stats: { defense: 80, blockChance: 35 },
    },
    {
      id: '8',
      name: 'Elixir of Power',
      description: 'Temporarily increases all stats by 20% for 10 minutes.',
      rarity: 'epic',
      type: 'consumable',
      price: 500,
      stock: 10,
      stats: { allStats: 20 },
    },
  ];

  // Filter and sort
  const filteredItems = useMemo(() => {
    let filtered = shopItems.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType === 'all' || item.type === selectedType;
      const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
      
      return matchesSearch && matchesType && matchesRarity;
    });

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.discount ? a.price * (1 - a.discount / 100) : a.price;
          const priceB = b.discount ? b.price * (1 - b.discount / 100) : b.price;
          return priceB - priceA;
        });
        break;
      case 'level':
        filtered.sort((a, b) => (b.level || 0) - (a.level || 0));
        break;
      default:
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    return filtered;
  }, [shopItems, searchQuery, selectedType, selectedRarity, sortBy]);

  const handleAddToCart = (item: ShopItem) => {
    setCart((prev) => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev;
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCart((prev) => {
      return prev.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + delta;
          if (newQuantity <= 0) {
            return null;
          }
          if (newQuantity > item.stock) {
            return item;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prev) => prev.filter(item => item.id !== itemId));
  };

  const handleCheckout = () => {
    // Implement checkout logic here
    alert('Purchase successful! (This would connect to your backend)');
    setCart([]);
    setIsCartOpen(false);
  };

  const cartItemIds = cart.map(item => item.id);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white font-gaming mb-2 flex items-center gap-3">
            <Store className="h-8 w-8 text-primary-400" />
            Merchant Shop
          </h1>
          <p className="text-gray-400">Buy powerful items to aid your journey</p>
        </div>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative px-6 py-3 bg-primary-900/30 hover:bg-primary-900/50 border border-primary-800/50 rounded-lg text-primary-300 font-semibold transition-all flex items-center gap-2"
        >
          <ShoppingCart className="h-5 w-5" />
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
              {cartItemCount}
            </span>
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

          {/* Sort */}
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full pl-10 pr-4 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500 transition-colors appearance-none cursor-pointer"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="level">Level</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems.map((item) => (
          <ShopItemCard
            key={item.id}
            item={item}
            onAddToCart={handleAddToCart}
            inCart={cartItemIds.includes(item.id)}
          />
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-12 rounded-xl text-center">
          <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No items found</h3>
          <p className="text-gray-400">Try adjusting your filters or search query</p>
        </div>
      )}

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
        playerGold={playerGold}
      />
    </div>
  );
};

export default ShopPage;