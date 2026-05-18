import React, { useState, useEffect } from 'react';
import { userAPI } from '../services/api';
import EntrepreneurCard from '../components/EntrepreneurCard';
import { Search, Filter } from 'lucide-react';

export default function Entrepreneurs() {
  const [entrepreneurs, setEntrepreneurs] = useState([]);
  const [filteredEntrepreneurs, setFilteredEntrepreneurs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchEntrepreneurs();
  }, []);

  useEffect(() => {
    filterEntrepreneurs();
  }, [searchTerm, selectedCategory, entrepreneurs]);

  const fetchEntrepreneurs = async () => {
    try {
      const response = await userAPI.getEntrepreneurs();
      setEntrepreneurs(response.data);
    } catch (error) {
      console.error('Error fetching entrepreneurs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterEntrepreneurs = () => {
    let filtered = entrepreneurs;

    if (selectedCategory) {
      filtered = filtered.filter(
        (e) => e.entrepreneurProfile?.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (e) =>
          e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          e.entrepreneurProfile?.businessName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEntrepreneurs(filtered);
  };

  const categories = ['cobbler', 'potter', 'tailor', 'artisan', 'vendor'];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Find Entrepreneurs</h1>

        {/* Search and Filter */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <div className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name or business..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Filter size={16} /> Filter by Category
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('')}
                  className={`px-4 py-2 rounded-full transition ${
                    selectedCategory === ''
                      ? 'bg-primary text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full transition capitalize ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Entrepreneurs Grid */}
        {loading ? (
          <div className="text-center text-gray-600 py-12">Loading...</div>
        ) : filteredEntrepreneurs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEntrepreneurs.map((entrepreneur) => (
              <EntrepreneurCard
                key={entrepreneur._id}
                entrepreneur={entrepreneur}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">
              No entrepreneurs found matching your filters.
            </p>
          </div>
        )}

        <div className="mt-8 text-center text-gray-600">
          Showing {filteredEntrepreneurs.length} of {entrepreneurs.length} entrepreneurs
        </div>
      </div>
    </div>
  );
}
