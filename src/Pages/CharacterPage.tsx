import { useState } from 'react';
import { 
  Sword, 
  Shield, 
  Heart, 
  Zap,
  Brain,
  Target,
  Activity,
  Award,
  ChevronRight,
  Info,
  TrendingUp,
  Sparkles,
  X
} from 'lucide-react';

interface Stat {
  name: string;
  base: number;
  bonus: number;
  icon: React.ComponentType<any>;
  color: string;
  description: string;
}

interface EquipmentItem {
  id: string;
  name: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic';
  type: string;
  stats: {
    [key: string]: number;
  };
  level: number;
}

interface EquipmentSlot {
  type: string;
  name: string;
  item: EquipmentItem | null;
  icon: React.ComponentType<any>;
}

const StatBar: React.FC<{ stat: Stat }> = ({ stat }) => {
  const Icon = stat.icon;
  const total = stat.base + stat.bonus;
  const percentage = Math.min((total / 200) * 100, 100); // Max 200 for visual purposes

  return (
    <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl hover:scale-[1.02] transition-all duration-300 group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-400">{stat.name}</p>
            <p className="text-xs text-gray-500 group-hover:text-gray-400 transition-colors">
              {stat.description}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">{total}</p>
          {stat.bonus > 0 && (
            <p className="text-xs text-success-400 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              +{stat.bonus}
            </p>
          )}
        </div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
          <div 
            className={`h-full rounded-full bg-gradient-to-r ${stat.color} transition-all duration-500 stat-bar`}
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Base: {stat.base}</span>
          <span>Bonus: +{stat.bonus}</span>
        </div>
      </div>
    </div>
  );
};

const RarityBadge: React.FC<{ rarity: string }> = ({ rarity }) => {
  const rarityStyles = {
    common: 'bg-gray-500/20 text-gray-300 border-gray-500',
    uncommon: 'bg-green-500/20 text-green-300 border-green-500',
    rare: 'bg-blue-500/20 text-blue-300 border-blue-500',
    epic: 'bg-purple-500/20 text-purple-300 border-purple-500',
    legendary: 'bg-gold-500/20 text-gold-300 border-gold-500',
    mythic: 'bg-red-500/20 text-red-300 border-red-500',
  };

  return (
    <span className={`
      inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold border
      ${rarityStyles[rarity as keyof typeof rarityStyles]}
    `}>
      <Sparkles className="h-3 w-3" />
      {rarity.toUpperCase()}
    </span>
  );
};

const EquipmentSlotCard: React.FC<{ 
  slot: EquipmentSlot; 
  onItemClick: (slot: EquipmentSlot) => void;
}> = ({ slot, onItemClick }) => {
  const Icon = slot.icon;
  const item = slot.item;

  const rarityColors = {
    common: 'border-gray-500 hover:border-gray-400',
    uncommon: 'border-green-500 hover:border-green-400',
    rare: 'border-blue-500 hover:border-blue-400',
    epic: 'border-purple-500 hover:border-purple-400',
    legendary: 'border-gold-500 hover:border-gold-400',
    mythic: 'border-red-500 hover:border-red-400',
  };

  return (
    <div 
      onClick={() => onItemClick(slot)}
      className={`
        gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl cursor-pointer
        transition-all duration-300 hover:scale-105
        ${item 
          ? `border-2 ${rarityColors[item.rarity]} shadow-lg` 
          : 'border border-dark-700 hover:border-dark-600'
        }
      `}
    >
      <div className="flex flex-col items-center text-center space-y-3">
        <div className={`
          relative p-4 rounded-xl w-full aspect-square flex items-center justify-center
          ${item ? 'bg-gradient-to-br from-primary-900/30 to-purple-900/20' : 'bg-dark-700/50'}
        `}>
          <Icon className={`h-8 w-8 ${item ? 'text-primary-400' : 'text-gray-600'}`} />
          {item && item.level && (
            <div className="absolute top-2 right-2 bg-dark-900/90 px-2 py-0.5 rounded-md">
              <span className="text-xs font-bold text-gold-400">Lv.{item.level}</span>
            </div>
          )}
        </div>
        
        <div className="w-full">
          <p className="text-xs text-gray-400 mb-1">{slot.name}</p>
          {item ? (
            <>
              <p className="text-sm font-bold text-white mb-2 line-clamp-1">{item.name}</p>
              <RarityBadge rarity={item.rarity} />
            </>
          ) : (
            <p className="text-sm text-gray-600 italic">Empty Slot</p>
          )}
        </div>
      </div>
    </div>
  );
};

const ItemDetailsModal: React.FC<{
  slot: EquipmentSlot | null;
  onClose: () => void;
}> = ({ slot, onClose }) => {
  if (!slot) return null;

  const item = slot.item;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-dark-900 border-2 border-primary-800/50 rounded-xl max-w-md w-full p-6 shadow-gaming"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">
              {item ? item.name : slot.name}
            </h3>
            {item && <RarityBadge rarity={item.rarity} />}
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-dark-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        {item ? (
          <>
            {/* Item Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gold-400" />
                  <span className="text-gray-400">Level:</span>
                  <span className="text-white font-semibold">{item.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">Type:</span>
                  <span className="text-white font-semibold">{item.type}</span>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3">Item Stats:</h4>
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

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button className="flex-1 px-4 py-2 bg-red-900/20 hover:bg-red-900/30 text-red-300 rounded-lg font-medium transition-colors border border-red-800/50">
                  Unequip
                </button>
                <button className="flex-1 px-4 py-2 bg-primary-900/20 hover:bg-primary-900/30 text-primary-300 rounded-lg font-medium transition-colors border border-primary-800/50">
                  Upgrade
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <div className="inline-flex p-4 rounded-full bg-dark-800 mb-4">
              <slot.icon className="h-12 w-12 text-gray-600" />
            </div>
            <p className="text-gray-400 mb-4">No item equipped in this slot</p>
            <button className="px-6 py-2 bg-primary-900/20 hover:bg-primary-900/30 text-primary-300 rounded-lg font-medium transition-colors border border-primary-800/50">
              Browse Items
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const CharacterPage = () => {
  const [selectedSlot, setSelectedSlot] = useState<EquipmentSlot | null>(null);

  // Mock character data
  const characterInfo = {
    name: "DragonSlayer",
    level: 42,
    class: "Warrior",
    experience: 85420,
    nextLevelExp: 100000,
    avatar: "/api/placeholder/200/200"
  };

  const stats: Stat[] = [
    { 
      name: 'Health', 
      base: 1000, 
      bonus: 247, 
      icon: Heart, 
      color: 'from-red-500 to-red-600',
      description: 'Total hit points'
    },
    { 
      name: 'Mana', 
      base: 750, 
      bonus: 142, 
      icon: Zap, 
      color: 'from-blue-500 to-blue-600',
      description: 'Magic energy'
    },
    { 
      name: 'Strength', 
      base: 85, 
      bonus: 35, 
      icon: Sword, 
      color: 'from-orange-500 to-red-500',
      description: 'Physical damage'
    },
    { 
      name: 'Defense', 
      base: 72, 
      bonus: 28, 
      icon: Shield, 
      color: 'from-purple-500 to-purple-600',
      description: 'Damage reduction'
    },
    { 
      name: 'Intelligence', 
      base: 68, 
      bonus: 22, 
      icon: Brain, 
      color: 'from-cyan-500 to-blue-500',
      description: 'Magic power'
    },
    { 
      name: 'Dexterity', 
      base: 90, 
      bonus: 25, 
      icon: Target, 
      color: 'from-green-500 to-emerald-500',
      description: 'Critical chance'
    },
    { 
      name: 'Vitality', 
      base: 78, 
      bonus: 18, 
      icon: Activity, 
      color: 'from-pink-500 to-rose-500',
      description: 'Health regeneration'
    },
    { 
      name: 'Luck', 
      base: 55, 
      bonus: 12, 
      icon: Award, 
      color: 'from-gold-500 to-yellow-500',
      description: 'Rare item drops'
    },
  ];

  const equipment: EquipmentSlot[] = [
    {
      type: 'weapon',
      name: 'Weapon',
      icon: Sword,
      item: {
        id: '1',
        name: 'Dragon Slayer',
        rarity: 'legendary',
        type: 'Two-Handed Sword',
        level: 45,
        stats: { strength: 35, criticalChance: 12, attack: 250 }
      }
    },
    {
      type: 'shield',
      name: 'Off-Hand',
      icon: Shield,
      item: {
        id: '2',
        name: 'Guardian Wall',
        rarity: 'epic',
        type: 'Heavy Shield',
        level: 42,
        stats: { defense: 28, vitality: 18, blockChance: 15 }
      }
    },
    {
      type: 'helmet',
      name: 'Helmet',
      icon: Shield,
      item: {
        id: '3',
        name: 'Crown of Wisdom',
        rarity: 'rare',
        type: 'Plate Helmet',
        level: 40,
        stats: { intelligence: 22, mana: 142 }
      }
    },
    {
      type: 'chest',
      name: 'Chest Armor',
      icon: Shield,
      item: null
    },
    {
      type: 'legs',
      name: 'Leg Armor',
      icon: Shield,
      item: null
    },
    {
      type: 'boots',
      name: 'Boots',
      icon: Shield,
      item: null
    },
    {
      type: 'ring1',
      name: 'Ring 1',
      icon: Sparkles,
      item: null
    },
    {
      type: 'ring2',
      name: 'Ring 2',
      icon: Sparkles,
      item: null
    },
  ];

  const totalPower = stats.reduce((sum, stat) => sum + stat.base + stat.bonus, 0);

  return (
    <>
      <div className="space-y-6">
        {/* Character Header */}
        <div className="gaming-card bg-gradient-to-r from-dark-800/90 to-dark-900/90 backdrop-blur-sm p-6 rounded-xl border-2 border-primary-800/30">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-primary-400 p-1 bg-gradient-to-br from-primary-900 to-purple-900">
                <img 
                  src={characterInfo.avatar} 
                  alt="Character" 
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gold-500 rounded-full px-3 py-1 border-2 border-dark-900">
                <span className="text-sm font-bold text-dark-900">Lv.{characterInfo.level}</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white font-gaming">{characterInfo.name}</h1>
                <span className="px-3 py-1 bg-primary-900/30 border border-primary-800/50 rounded-lg text-primary-300 text-sm font-semibold">
                  {characterInfo.class}
                </span>
              </div>
              
              <div className="flex items-center justify-center md:justify-start gap-6 text-sm text-gray-400 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-gold-400" />
                  <span>Level {characterInfo.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span>Power: {totalPower.toLocaleString()}</span>
                </div>
              </div>

              {/* XP Bar */}
              <div>
                <div className="flex justify-between text-xs text-gray-400 mb-2">
                  <span>Experience to next level</span>
                  <span>{characterInfo.experience.toLocaleString()} / {characterInfo.nextLevelExp.toLocaleString()}</span>
                </div>
                <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 transition-all duration-500 stat-bar"
                    style={{ width: `${(characterInfo.experience / characterInfo.nextLevelExp) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Stats Section */}
          <div className="xl:col-span-2 space-y-6">
            <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white font-gaming">Character Stats</h2>
                <button className="text-primary-400 text-sm hover:text-primary-300 transition-colors flex items-center gap-1">
                  Details <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <StatBar key={index} stat={stat} />
                ))}
              </div>
            </div>
          </div>

          {/* Equipment Section */}
          <div className="space-y-6">
            <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white font-gaming">Equipment</h2>
                <button className="text-primary-400 text-sm hover:text-primary-300 transition-colors">
                  Manage
                </button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {equipment.map((slot, index) => (
                  <EquipmentSlotCard 
                    key={index} 
                    slot={slot} 
                    onItemClick={setSelectedSlot}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {selectedSlot && (
        <ItemDetailsModal 
          slot={selectedSlot} 
          onClose={() => setSelectedSlot(null)} 
        />
      )}
    </>
  );
};

export default CharacterPage;