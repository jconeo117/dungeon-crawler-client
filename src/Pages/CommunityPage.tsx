import React from 'react';
import { Store, Gavel } from 'lucide-react';
import { Link } from 'react-router-dom';

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-dark-900 text-white pt-24">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-cinzel font-bold text-white mb-4 animate-fade-in">
          Community Hub
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-12 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Interactúa, comercia y forja alianzas. Este es el corazón social de DungeonForge.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tarjeta para la Tienda */}
          <Link to="/community/shop" className="gaming-card p-8 rounded-xl bg-dark-800 hover:bg-dark-700/50 group animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Store className="h-16 w-16 mx-auto text-primary-400 group-hover:text-primary-300 transition-colors duration-300 mb-4" />
            <h2 className="text-3xl font-cinzel font-bold mb-2">Game Shop</h2>
            <p className="text-gray-400">
              Compra ítems, pociones y equipamiento esencial para tus aventuras.
            </p>
          </Link>

          {/* Tarjeta para la Casa de Subastas */}
          <Link to="/community/auctions" className="gaming-card p-8 rounded-xl bg-dark-800 hover:bg-dark-700/50 group animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Gavel className="h-16 w-16 mx-auto text-gold-400 group-hover:text-gold-300 transition-colors duration-300 mb-4" />
            <h2 className="text-3xl font-cinzel font-bold mb-2">Auction House</h2>
            <p className="text-gray-400">
              Comercia con otros jugadores. Vende tu botín o encuentra esa pieza de equipo legendaria que te falta.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;
