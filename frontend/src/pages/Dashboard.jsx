import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userAPI, productAPI, orderAPI, serviceAPI } from '../services/api';
import { ShoppingBag, Package, TrendingUp, User } from 'lucide-react';

export default function Dashboard() {
  const navigate = useNavigate();
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
  const [userData, setUserData] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const userRes = await userAPI.getProfile();
      setUserData(userRes.data);

      if (user.role === 'entrepreneur') {
        const [analyticsRes, productsRes, servicesRes] = await Promise.all([
          orderAPI.getAnalytics(),
          productAPI.getByEntrepreneur(userRes.data._id),
          serviceAPI.getByEntrepreneur(userRes.data._id)
        ]);
        setAnalytics(analyticsRes.data);
        setProducts(productsRes.data);
        setServices(servicesRes.data);
      } else {
        const ordersRes = await orderAPI.getCustomerOrders();
        setOrders(ordersRes.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 font-semibold transition ${
              activeTab === 'overview'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Overview
          </button>
          {user.role === 'entrepreneur' && (
            <>
              <button
                onClick={() => setActiveTab('products')}
                className={`px-6 py-2 font-semibold transition ${
                  activeTab === 'products'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab('services')}
                className={`px-6 py-2 font-semibold transition ${
                  activeTab === 'services'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-600 hover:text-primary'
                }`}
              >
                Services
              </button>
            </>
          )}
          {user.role === 'user' && (
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-6 py-2 font-semibold transition ${
                activeTab === 'orders'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              My Orders
            </button>
          )}
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-6 py-2 font-semibold transition ${
              activeTab === 'profile'
                ? 'text-primary border-b-2 border-primary'
                : 'text-gray-600 hover:text-primary'
            }`}
          >
            Profile
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            {user.role === 'entrepreneur' && analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Orders</p>
                      <p className="text-3xl font-bold text-primary">{analytics.totalOrders}</p>
                    </div>
                    <ShoppingBag className="text-primary text-4xl opacity-20" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Total Revenue</p>
                      <p className="text-3xl font-bold text-primary">₹{analytics.totalRevenue}</p>
                    </div>
                    <TrendingUp className="text-primary text-4xl opacity-20" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Completed Orders</p>
                      <p className="text-3xl font-bold text-primary">{analytics.completedOrders}</p>
                    </div>
                    <Package className="text-primary text-4xl opacity-20" />
                  </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 text-sm">Pending Orders</p>
                      <p className="text-3xl font-bold text-orange-600">{analytics.pendingOrders}</p>
                    </div>
                    <ShoppingBag className="text-orange-600 text-4xl opacity-20" />
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Welcome!</h2>
              <p className="text-gray-600">
                {user.role === 'entrepreneur'
                  ? 'Manage your products, services, and orders from your dashboard.'
                  : 'Browse and purchase from local entrepreneurs. Track your orders here.'}
              </p>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && user.role === 'entrepreneur' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Products</h2>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Add Product
              </button>
            </div>
            {products.length > 0 ? (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stock</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-3 text-sm text-gray-800">{product.name}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">₹{product.price}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{product.stock}</td>
                        <td className="px-6 py-3 text-sm text-gray-800">{product.averageRating?.toFixed(1) || '0.0'}</td>
                        <td className="px-6 py-3 text-sm">
                          <button className="text-primary hover:underline">Edit</button> |{' '}
                          <button className="text-red-600 hover:underline">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow text-center text-gray-600">
                No products yet. Add your first product!
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && user.role === 'entrepreneur' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Your Services</h2>
              <button className="bg-primary text-white px-4 py-2 rounded hover:bg-orange-600 transition">
                Add Service
              </button>
            </div>
            {services.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {services.map((service) => (
                  <div key={service._id} className="bg-white p-6 rounded-lg shadow">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-primary font-semibold">₹{service.basePrice}</span>
                      <div className="space-x-2">
                        <button className="text-primary hover:underline">Edit</button>
                        <button className="text-red-600 hover:underline">Delete</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow text-center text-gray-600">
                No services yet. Add your first service!
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && user.role === 'user' && (
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-6">My Orders</h2>
            {orders.length > 0 ? (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order._id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-800">Order #{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">Status: {order.status}</p>
                        <p className="text-sm text-gray-600">Total: ₹{order.totalAmount}</p>
                      </div>
                      <button className="text-primary hover:underline">View Details</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white p-12 rounded-lg shadow text-center text-gray-600">
                No orders yet. Start shopping!
              </div>
            )}
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === 'profile' && userData && (
          <div className="bg-white p-8 rounded-lg shadow">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Profile Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <p className="text-gray-800">{userData.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <p className="text-gray-800">{userData.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <p className="text-gray-800">{userData.location || 'Not set'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <p className="text-gray-800">{userData.phone || 'Not set'}</p>
              </div>
              <button className="mt-6 bg-primary text-white px-6 py-2 rounded hover:bg-orange-600 transition">
                Edit Profile
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
