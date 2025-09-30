import { 
  Sword, 
  Shield, 
  Heart, 
  Zap, 
  TrendingUp, 
  Trophy,
  Target,
  Flame,
  Crown,
  Coins,
  Package,
  Map
} from 'lucide-react';

interface StatCardProps {
  icon: React.ComponentType<any>;
  label: string;
  value: number | string;
  maxValue?: number;
  color: string;
  trend?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, label, value, maxValue, color, trend }) => {
  const percentage = maxValue ? (Number(value) / maxValue) * 100 : 0;
  
  return (
    <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
        {trend && (
          <span className="text-success-400 text-sm font-semibold flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            {trend}
          </span>
        )}
      </div>
      
      <h3 className="text-gray-400 text-sm font-medium mb-1">{label}</h3>
      <div className="flex items-baseline gap-2">
        <p className="text-3xl font-bold text-white">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        {maxValue && (
          <span className="text-gray-500 text-lg">/ {maxValue.toLocaleString()}</span>
        )}
      </div>
      
      {maxValue && (
        <div className="mt-3">
          <div className="w-full bg-dark-700 rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500 stat-bar`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

interface EquipmentSlot {
  name: string;
  item?: {
    name: string;
    rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
    power: number;
  };
  icon: React.ComponentType<any>;
}

const EquipmentSlotCard: React.FC<{ slot: EquipmentSlot }> = ({ slot }) => {
  const rarityColors = {
    common: 'border-gray-500',
    uncommon: 'border-green-500',
    rare: 'border-blue-500',
    epic: 'border-purple-500',
    legendary: 'border-gold-500',
  };

  const Icon = slot.icon;

  return (
    <div className={`
      gaming-card bg-dark-800/50 backdrop-blur-sm p-4 rounded-xl 
      ${slot.item ? `border-2 ${rarityColors[slot.item.rarity]}` : 'border border-dark-700'}
      hover:scale-105 transition-all duration-300
    `}>
      <div className="flex items-center gap-3">
        <div className={`
          p-2 rounded-lg 
          ${slot.item ? 'bg-primary-900/30' : 'bg-dark-700'}
        `}>
          <Icon className={`h-5 w-5 ${slot.item ? 'text-primary-400' : 'text-gray-500'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-400 mb-1">{slot.name}</p>
          {slot.item ? (
            <>
              <p className="text-sm font-semibold text-white truncate">{slot.item.name}</p>
              <p className="text-xs text-gray-500">+{slot.item.power} Power</p>
            </>
          ) : (
            <p className="text-sm text-gray-600">Empty</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface ActivityItem {
  type: 'dungeon' | 'level' | 'item' | 'achievement';
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<any>;
}

const ActivityFeed: React.FC<{ activities: ActivityItem[] }> = ({ activities }) => {
  const getIconColor = (type: string) => {
    switch (type) {
      case 'dungeon': return 'text-red-400';
      case 'level': return 'text-gold-400';
      case 'item': return 'text-purple-400';
      case 'achievement': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => {
        const Icon = activity.icon;
        return (
          <div 
            key={index}
            className="flex items-start gap-3 p-3 rounded-lg bg-dark-800/30 hover:bg-dark-800/50 transition-all duration-200"
          >
            <div className={`p-2 rounded-lg bg-dark-700 ${getIconColor(activity.type)}`}>
              <Icon className="h-4 w-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white">{activity.title}</p>
              <p className="text-xs text-gray-400 mt-1">{activity.description}</p>
            </div>
            <span className="text-xs text-gray-500 whitespace-nowrap">{activity.time}</span>
          </div>
        );
      })}
    </div>
  );
};

const Dashboard = () => {
  // Mock data - replace with real data from API
  const characterStats = {
    health: 1247,
    maxHealth: 1500,
    mana: 892,
    maxMana: 1000,
    attack: 456,
    defense: 342,
    level: 42,
    experience: 85420,
    nextLevelExp: 100000,
    gold: 12450,
  };

  const equipment: EquipmentSlot[] = [
    { 
      name: 'Weapon', 
      icon: Sword,
      item: { name: 'Dragon Slayer', rarity: 'legendary', power: 250 }
    },
    { 
      name: 'Shield', 
      icon: Shield,
      item: { name: 'Guardian Wall', rarity: 'epic', power: 180 }
    },
    { 
      name: 'Helmet', 
      icon: Crown,
      item: { name: 'Crown of Wisdom', rarity: 'rare', power: 120 }
    },
    { name: 'Chest', icon: Shield },
    { name: 'Legs', icon: Shield },
    { name: 'Boots', icon: Shield },
  ];

  const recentActivities: ActivityItem[] = [
    {
      type: 'dungeon',
      title: 'Completed Shadow Realm',
      description: 'Defeated the final boss in 12:34',
      time: '2h ago',
      icon: Map
    },
    {
      type: 'level',
      title: 'Level Up!',
      description: 'Reached level 42',
      time: '3h ago',
      icon: TrendingUp
    },
    {
      type: 'item',
      title: 'Legendary Drop',
      description: 'Obtained Dragon Slayer',
      time: '5h ago',
      icon: Package
    },
    {
      type: 'achievement',
      title: 'Achievement Unlocked',
      description: 'Defeated 100 bosses',
      time: '1d ago',
      icon: Trophy
    },
  ];

  const achievements = [
    { name: 'Boss Slayer', progress: 87, total: 100, icon: Trophy },
    { name: 'Dungeon Master', progress: 45, total: 50, icon: Map },
    { name: 'Collector', progress: 234, total: 500, icon: Package },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary-900/30 via-purple-900/20 to-gold-900/20 border border-primary-800/30 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2 font-gaming">
              Welcome back, <span className="text-gold-400">DragonSlayer</span>!
            </h2>
            <p className="text-gray-400">Ready for your next adventure?</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-gold-400">{characterStats.level}</p>
              <p className="text-xs text-gray-400">Level</p>
            </div>
            <div className="h-12 w-px bg-gray-700"></div>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-400">
                {Math.floor((characterStats.experience / characterStats.nextLevelExp) * 100)}%
              </p>
              <p className="text-xs text-gray-400">Next Level</p>
            </div>
          </div>
        </div>
        
        {/* XP Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Experience</span>
            <span>{characterStats.experience.toLocaleString()} / {characterStats.nextLevelExp.toLocaleString()}</span>
          </div>
          <div className="w-full bg-dark-700 rounded-full h-3 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 transition-all duration-500 stat-bar"
              style={{ width: `${(characterStats.experience / characterStats.nextLevelExp) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Heart}
          label="Health"
          value={characterStats.health}
          maxValue={characterStats.maxHealth}
          color="from-red-500 to-red-600"
        />
        <StatCard
          icon={Zap}
          label="Mana"
          value={characterStats.mana}
          maxValue={characterStats.maxMana}
          color="from-blue-500 to-blue-600"
        />
        <StatCard
          icon={Sword}
          label="Attack"
          value={characterStats.attack}
          color="from-orange-500 to-red-500"
          trend="+12%"
        />
        <StatCard
          icon={Shield}
          label="Defense"
          value={characterStats.defense}
          color="from-purple-500 to-purple-600"
          trend="+8%"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Equipment Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Equipment */}
          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-gaming">Equipment</h3>
              <button className="text-primary-400 text-sm hover:text-primary-300 transition-colors">
                View All →
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {equipment.map((slot, index) => (
                <EquipmentSlotCard key={index} slot={slot} />
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white font-gaming">Achievements</h3>
              <Trophy className="h-5 w-5 text-gold-400" />
            </div>
            <div className="space-y-4">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                const percentage = (achievement.progress / achievement.total) * 100;
                
                return (
                  <div key={index} className="p-4 rounded-lg bg-dark-700/50">
                    <div className="flex items-center gap-3 mb-3">
                      <Icon className="h-5 w-5 text-gold-400" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white">{achievement.name}</p>
                        <p className="text-xs text-gray-400">
                          {achievement.progress} / {achievement.total}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-gold-400">{Math.floor(percentage)}%</span>
                    </div>
                    <div className="w-full bg-dark-600 rounded-full h-2 overflow-hidden">
                      <div 
                        className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-400 transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4 font-gaming">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-700/50">
                <div className="flex items-center gap-2">
                  <Coins className="h-4 w-4 text-gold-400" />
                  <span className="text-sm text-gray-400">Gold</span>
                </div>
                <span className="text-sm font-bold text-gold-400">
                  {characterStats.gold.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-700/50">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-red-400" />
                  <span className="text-sm text-gray-400">Bosses Defeated</span>
                </div>
                <span className="text-sm font-bold text-white">87</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-dark-700/50">
                <div className="flex items-center gap-2">
                  <Flame className="h-4 w-4 text-orange-400" />
                  <span className="text-sm text-gray-400">Win Streak</span>
                </div>
                <span className="text-sm font-bold text-white">12</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="gaming-card bg-dark-800/50 backdrop-blur-sm p-6 rounded-xl">
            <h3 className="text-lg font-bold text-white mb-4 font-gaming">Recent Activity</h3>
            <ActivityFeed activities={recentActivities} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;