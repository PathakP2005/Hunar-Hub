import React from 'react';
import { Star, MapPin, Heart, Share2, Award } from 'lucide-react';

export default function EntrepreneurCard({ entrepreneur, onClick }) {
  const [liked, setLiked] = React.useState(false);
  
  const gradients = [
    'from-indigo-500 to-purple-600',
    'from-pink-500 to-red-600',
    'from-yellow-500 to-orange-600',
    'from-green-500 to-emerald-600',
    'from-blue-500 to-cyan-600'
  ];
  
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  const rating = entrepreneur.entrepreneurProfile?.averageRating?.toFixed(1) || '4.8';
  const reviews = entrepreneur.entrepreneurProfile?.totalReviews || 0;
  const isTopseller = reviews > 10;

  return (
    <div
      onClick={onClick}
      className="group cursor-pointer h-full"
    >
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 backdrop-blur-sm border border-white/20 h-full flex flex-col"
      >
        {/* Header with gradient and badges */}
        <div className={`relative h-40 bg-gradient-to-br ${randomGradient} overflow-hidden`}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent"></div>
          
          {/* Top badges */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            {isTopseller && (
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm">
                <Award size={14} />
                Top Seller
              </div>
            )}
          </div>

          {/* Animated background shapes */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-white/10 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500"></div>
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
            {entrepreneur.entrepreneurProfile?.businessName || entrepreneur.name}
          </h3>
          
          {/* Category badge */}
          <div className="mb-3">
            <span className="inline-block bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold border border-indigo-200">
              {entrepreneur.entrepreneurProfile?.category || 'Artisan'}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center text-gray-600 text-sm mb-3 group-hover:text-gray-800 transition-colors">
            <MapPin size={16} className="mr-2 text-indigo-600 flex-shrink-0" />
            <span className="line-clamp-1">{entrepreneur.location || 'Location not specified'}</span>
          </div>

          {/* Bio */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1 group-hover:text-gray-700 transition-colors leading-relaxed">
            {entrepreneur.entrepreneurProfile?.bio || 'Dedicated to creating exceptional handmade crafts'}
          </p>

          {/* Stats - Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-4"></div>

          {/* Rating and actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-3 py-1.5 rounded-full border border-yellow-200">
                <Star className="text-yellow-500 fill-yellow-500 mr-1" size={16} />
                <span className="font-bold text-gray-900">{rating}</span>
                <span className="text-xs text-gray-600 ml-1">({reviews})</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setLiked(!liked);
                }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  liked
                    ? 'bg-red-100 text-red-600 shadow-lg shadow-red-200'
                    : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
                }`}
              >
                <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
              >
                <Share2 size={16} />
              </button>
            </div>
          </div>

          {/* View profile button */}
          <button className="mt-4 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-2.5 rounded-lg hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}
