import React from 'react';
import { Star, ShoppingCart, Heart, Share2, Zap } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const [liked, setLiked] = React.useState(false);
  const rating = product.averageRating?.toFixed(1) || '4.7';
  const reviews = product.reviews?.length || 0;
  const isNew = new Date(product.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const stockLow = product.stock < 5;

  return (
    <div className="group h-full">
      <div className="bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/20 h-full flex flex-col relative">
        
        {/* Image Container */}
        <div className="relative h-56 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <>
              <img 
                src={product.images[0]} 
                alt={product.name} 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
              />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-black/40 to-transparent"></div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <Zap size={32} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">Product Image</p>
              </div>
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            {isNew && (
              <div className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                ✨ New
              </div>
            )}
            {stockLow && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                Limited Stock
              </div>
            )}
          </div>

          {/* Discount badge */}
          {product.discountPrice && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full font-bold text-sm shadow-lg">
              Save {Math.round(((product.discountPrice - product.price) / product.discountPrice) * 100)}%
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col">
          {/* Product name */}
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-red-500 group-hover:bg-clip-text transition-all duration-300">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2 mb-3 flex-1 group-hover:text-gray-700 transition-colors">
            {product.description}
          </p>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-3"></div>

          {/* Price section */}
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              ₹{product.price}
            </span>
            {product.discountPrice && (
              <span className="text-lg text-gray-400 line-through">₹{product.discountPrice}</span>
            )}
          </div>

          {/* Rating and stock */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-gradient-to-r from-yellow-50 to-orange-50 px-2.5 py-1 rounded-full border border-yellow-200">
                <Star className="text-yellow-500 fill-yellow-500 mr-0.5" size={14} />
                <span className="font-bold text-sm text-gray-900">{rating}</span>
                <span className="text-xs text-gray-600 ml-1">({reviews})</span>
              </div>
            </div>
            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
              stockLow 
                ? 'bg-red-100 text-red-700' 
                : 'bg-green-100 text-green-700'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 mb-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setLiked(!liked);
              }}
              className={`p-2 rounded-lg transition-all duration-300 flex-1 flex items-center justify-center gap-2 ${
                liked
                  ? 'bg-red-100 text-red-600 shadow-lg shadow-red-200'
                  : 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
              {liked && <span className="text-xs font-semibold hidden sm:inline">Saved</span>}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-300"
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Add to cart button */}
          <button
            onClick={onAddToCart}
            disabled={product.stock === 0}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-orange-300 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  );
}
