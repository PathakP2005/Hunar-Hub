import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productAPI, userAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import EntrepreneurCard from '../components/EntrepreneurCard';
import { ArrowRight, Sparkles, Zap, Users, Package, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

export default function Home() {
  const [products, setProducts] = useState([]);
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Scroll animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [statsRef, statsVisible] = useScrollAnimation({ threshold: 0.1 });
  const [entrepreneursRef, entrepreneursVisible] = useScrollAnimation({ threshold: 0.05 });
  const [productsRef, productsVisible] = useScrollAnimation({ threshold: 0.05 });
  const [categoriesRef, categoriesVisible] = useScrollAnimation({ threshold: 0.05 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, entrepreneursRes] = await Promise.all([
        productAPI.getAll(),
        userAPI.getEntrepreneurs()
      ]);
      setProducts(productsRes.data.slice(0, 6));
      setEntrepreneurs(entrepreneursRes.data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const categoryData = [
    { name: 'Cobbler', emoji: '👞', color: 'from-blue-400 to-blue-600' },
    { name: 'Potter', emoji: '🏺', color: 'from-amber-400 to-amber-600' },
    { name: 'Tailor', emoji: '🧵', color: 'from-pink-400 to-pink-600' },
    { name: 'Artisan', emoji: '🎨', color: 'from-purple-400 to-purple-600' },
    { name: 'Vendor', emoji: '🛍️', color: 'from-green-400 to-green-600' }
  ];

  const stats = [
    { number: '10K+', label: 'Entrepreneurs', icon: Users },
    { number: '50K+', label: 'Products', icon: Package },
    { number: '100K+', label: 'Happy Customers', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <div 
        ref={heroRef}
        className={`relative overflow-hidden py-24 px-4 transition-all duration-1000 ${heroVisible ? 'fade-in-up' : 'opacity-0'}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-orange-500 opacity-90"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-20"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className={`mb-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-full text-white border border-white/30 ${heroVisible ? 'scale-up' : 'opacity-0'}`}>
            <Sparkles size={16} />
            <span className="text-sm font-semibold">Welcome to the future of micro-entrepreneurship</span>
          </div>
          
          <h1 className={`text-6xl md:text-7xl font-bold mb-6 text-white leading-tight ${heroVisible ? 'fade-in-up stagger-1' : 'opacity-0'}`}>
            Empower Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-orange-200 animate-pulse">Craft</span>
          </h1>
          
          <p className={`text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto leading-relaxed ${heroVisible ? 'fade-in-up stagger-2' : 'opacity-0'}`}>
            Connect directly with customers who value your handmade products and specialized skills. Build your business, your way.
          </p>
          
          <div className={`flex gap-4 justify-center flex-wrap ${heroVisible ? 'fade-in-up stagger-3' : 'opacity-0'}`}>
            <Link
              to="/entrepreneurs"
              className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition transform hover:scale-105 shadow-lg flex items-center gap-2 group"
            >
              Find Entrepreneurs 
              <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
            </Link>
            <Link
              to="/login"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition transform hover:scale-105 backdrop-blur-sm flex items-center gap-2"
            >
              <Zap size={20} />
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className={`py-16 px-4 bg-gradient-to-r from-indigo-50 via-purple-50 to-orange-50 border-y border-indigo-100 transition-all duration-700 ${statsVisible ? 'opacity-100' : 'opacity-50'}`}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`text-center transition-all duration-700 ${statsVisible ? 'fade-in-up' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: statsVisible ? `${idx * 100}ms` : '0ms' }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full text-white shadow-lg">
                      <Icon size={32} />
                    </div>
                  </div>
                  <h3 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </h3>
                  <p className="text-gray-700 font-semibold">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Entrepreneurs */}
      <section 
        ref={entrepreneursRef}
        className={`py-24 px-4 bg-gradient-to-b from-blue-50 via-white to-white transition-all duration-700 relative overflow-hidden ${entrepreneursVisible ? 'opacity-100' : 'opacity-50'}`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-200 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-200 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${entrepreneursVisible ? 'fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <Sparkles size={16} />
              Featured Talents
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Entrepreneurs</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover skilled artisans and micro-entrepreneurs ready to bring your vision to life
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto rounded-full mt-6"></div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
              </div>
              <p className="text-gray-600 mt-4 font-semibold">Loading amazing entrepreneurs...</p>
            </div>
          ) : entrepreneurs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {entrepreneurs.map((entrepreneur, idx) => (
                  <div
                    key={entrepreneur._id}
                    className={`transition-all duration-700 ${entrepreneursVisible ? 'fade-in-up' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: entrepreneursVisible ? `${idx * 100}ms` : '0ms' }}
                  >
                    <EntrepreneurCard entrepreneur={entrepreneur} />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link 
                  to="/entrepreneurs" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-indigo-300 transition-all duration-300"
                >
                  Discover All Entrepreneurs
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl border-2 border-dashed border-indigo-200">
              <Users size={48} className="mx-auto text-indigo-600 opacity-50 mb-4" />
              <p className="text-gray-600 py-12 text-lg font-semibold">No entrepreneurs found yet. Be the first!</p>
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section 
        ref={productsRef}
        className={`py-24 px-4 bg-gradient-to-b from-orange-50 via-white to-white transition-all duration-700 relative overflow-hidden ${productsVisible ? 'opacity-100' : 'opacity-50'}`}
      >
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-200 opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-red-200 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${productsVisible ? 'fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              <TrendingUp size={16} />
              Trending Now
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              Handpicked <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-600">Products</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Curated selection of exceptional handmade crafts from talented artisans
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full mt-6"></div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
              </div>
              <p className="text-gray-600 mt-4 font-semibold">Curating finest products...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {products.map((product, idx) => (
                  <div
                    key={product._id}
                    className={`transition-all duration-700 ${productsVisible ? 'fade-in-up' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: productsVisible ? `${idx * 100}ms` : '0ms' }}
                  >
                    <ProductCard
                      product={product}
                      onAddToCart={() => console.log('Add to cart:', product._id)}
                    />
                  </div>
                ))}
              </div>
              <div className="text-center">
                <Link 
                  to="/products" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:shadow-lg hover:shadow-orange-300 transition-all duration-300"
                >
                  Browse All Products
                  <ArrowRight size={20} />
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border-2 border-dashed border-orange-200">
              <Package size={48} className="mx-auto text-orange-600 opacity-50 mb-4" />
              <p className="text-gray-600 py-12 text-lg font-semibold">No products available yet</p>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section 
        ref={categoriesRef}
        className={`py-24 px-4 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white transition-all duration-700 relative overflow-hidden ${categoriesVisible ? 'opacity-100' : 'opacity-50'}`}
      >
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className={`text-center mb-16 ${categoriesVisible ? 'fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
              Shop by <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">Category</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-2xl mx-auto">
              Explore diverse skills and crafts from talented artisans worldwide
            </p>
            <div className="h-1.5 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full mt-6"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoryData.map((category, idx) => (
              <div
                key={category.name}
                className={`transition-all duration-700 ${categoriesVisible ? 'scale-up' : 'opacity-0 scale-95'}`}
                style={{ transitionDelay: categoriesVisible ? `${idx * 80}ms` : '0ms' }}
              >
                <div
                  className={`bg-gradient-to-br ${category.color} p-8 rounded-2xl text-center cursor-pointer transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-2xl group relative overflow-hidden`}
                >
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 group-hover:translate-x-full transition-transform duration-700"></div>
                  
                  <div className="text-6xl mb-4 group-hover:scale-125 transition duration-300 relative z-10 block">
                    {category.emoji}
                  </div>
                  <h3 className="font-bold text-xl relative z-10">{category.name}</h3>
                  <div className="mt-3 h-1.5 w-8 bg-white/40 mx-auto group-hover:w-12 transition-all duration-300 rounded-full relative z-10"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Ready to Transform Your Craft?
          </h2>
          <p className="text-xl mb-8 text-gray-100 max-w-2xl mx-auto leading-relaxed">
            Join thousands of entrepreneurs and customers building meaningful connections through craftsmanship and skill. Start your journey today.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              to="/register"
              className="bg-white text-indigo-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition transform hover:scale-105 shadow-lg"
            >
              Sign Up Now
            </Link>
            <Link
              to="/entrepreneurs"
              className="border-2 border-white text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition transform hover:scale-105"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
