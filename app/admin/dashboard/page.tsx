'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Order {
  id: string | number;
  customer_name: string; 
  address: string;
  size: string;
  price: number;
  cost: number;
  quantity: number;
  date?: string; 
  created_at?: string; 
  createdAt?: number; 
}

interface ServiceCard {
  id: string;
  range: string;
  price: string;
  description: string; 
}

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  // Order Form States
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');
  const [size, setSize] = useState('Medium');
  const [price, setPrice] = useState('');
  const [cost, setCost] = useState('');
  const [quantity, setQuantity] = useState('1');

  // Orders State
  const [orders, setOrders] = useState<Order[]>([]);

  // Client Service Cards States
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [newRange, setNewRange] = useState('');
  const [newPriceRange, setNewPriceRange] = useState('');
  const [newDescription, setNewDescription] = useState('Available');

  // 🛡️ ROUTE GUARD & DATA FETCH LOAD
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      router.push('/admin');
      return;
    }

    fetch('http://127.0.0.1:8000/api/orders', {
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) throw new Error("Unauthorized or server error");
        return res.json();
      })
      .then(data => {
        setOrders(data);
      })
      .catch(error => {
        console.error("Error fetching orders:", error);
      });

    const savedServices = localStorage.getItem('jollyannes_services');
    if (savedServices) {
      setServices(JSON.parse(savedServices));
    } else {
      const defaultServices: ServiceCard[] = [
        { id: '1', range: '10 - 15 kls', price: '₱8,000 - ₱10,000', description: 'Available' },
        { id: '2', range: '15 - 20 kls', price: '₱10,000 - 12,000', description: 'Available' },
        { id: '3', range: '20 - 25 kls', price: '₱12,000 - ₱15,000', description: 'Available' },
        { id: '4', range: '25 - 30 kls', price: '₱15,000 - ₱18,000', description: 'Available' },
        { id: '5', range: '30 - 35 kls', price: '₱18,000 - ₱20,000', description: 'Available' },
        { id: '6', range: '35 - 40 kls', price: '₱20,000 - ₱22,000', description: 'Available' },
      ];
      setServices(defaultServices);
      localStorage.setItem('jollyannes_services', JSON.stringify(defaultServices));
    }

    setLoading(false);
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    router.push('/admin');
  };

  const handleAddOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName || !address || !price || !cost) {
      alert('Please fill out all required fields.');
      return;
    }

    const cleanCustomerName = customerName
      .trim()
      .toLowerCase()
      .split(/\s+/)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    const newOrderPayload = {
      customer_name: cleanCustomerName, 
      address,
      size,
      price: parseFloat(price),
      cost: parseFloat(cost),
      quantity: parseInt(quantity, 10)
    };

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newOrderPayload),
      });

      if (!response.ok) throw new Error('Database refused the order.');

      const savedOrder = await response.json();
      setOrders([savedOrder, ...orders]);
      
      setCustomerName('');
      setAddress('');
      setSize('Medium');
      setPrice('');
      setCost('');
      setQuantity('1');
    } catch (error) {
      console.error(error);
      alert('Failed to save to database.');
    }
  };

  const handleDeleteOrder = async (id: string | number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this order entry?');
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://127.0.0.1:8000/api/orders/${id}`, {
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Could not delete the record.');
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error(error);
      alert('Failed to delete transaction.');
    }
  };

  const handleAddServiceCard = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newRange || !newPriceRange) {
      alert('Please fill out both weight range and price fields.');
      return;
    }

    const newCard: ServiceCard = {
      id: Date.now().toString(),
      range: newRange,
      price: newPriceRange.startsWith('₱') ? newPriceRange : `₱${newPriceRange}`,
      description: newDescription || 'Available', 
    };

    const updatedServices = [...services, newCard];
    setServices(updatedServices);
    localStorage.setItem('jollyannes_services', JSON.stringify(updatedServices));

    setNewRange('');
    setNewPriceRange('');
    setNewDescription('Available');
  };

  const handleDeleteServiceCard = (id: string) => {
    const confirmDelete = window.confirm('Remove this service card package?');
    if (confirmDelete) {
      const updatedServices = services.filter(item => item.id !== id);
      setServices(updatedServices);
      localStorage.setItem('jollyannes_services', JSON.stringify(updatedServices));
    }
  };

  const now = Date.now();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  
  const activeOrders = orders.filter(order => {
    const orderTime = order.created_at ? Date.parse(order.created_at) : (order.createdAt || now);
    return now - orderTime < oneDayInMs;
  });

  const totalSales = activeOrders.reduce((acc, order) => acc + (order.price * order.quantity), 0);
  const totalCost = activeOrders.reduce((acc, order) => acc + (order.cost * order.quantity), 0);
  const totalProfit = totalSales - totalCost;
  const totalActiveOrders = activeOrders.reduce((acc, order) => acc + order.quantity, 0);

  const historyGrouped = orders.reduce((acc, order) => {
    const groupDate = order.date || (order.created_at ? order.created_at.split('T')[0] : new Date().toISOString().split('T')[0]);
    if (!acc[groupDate]) {
      acc[groupDate] = { sales: 0, profit: 0, items: 0 };
    }
    acc[groupDate].sales += order.price * order.quantity;
    acc[groupDate].profit += (order.price - order.cost) * order.quantity;
    acc[groupDate].items += order.quantity;
    return acc;
  }, {} as Record<string, { sales: number; profit: number; items: number }>);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf6f6]">
        <div className="text-center">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#5c1d1d] border-t-transparent mx-auto"></div>
          <p className="text-xs text-gray-500 mt-4 font-medium">Verifying credentials...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf6f6] flex">
      <aside className="group w-20 hover:w-64 bg-[#280c0c] flex flex-col justify-between hidden md:flex shadow-xl transition-all duration-300 ease-in-out overflow-hidden select-none">
        <div className="p-5">
          <div className="mb-8 border-b border-white/5 pb-5 whitespace-nowrap min-h-[65px]">
            <div className="flex items-center gap-4">
              <span className="text-2xl min-w-[28px] text-center filter drop-shadow">🐷</span>
              <h2 className="text-lg font-black text-white tracking-tight opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                Jollyanne's Lechon
              </h2>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-amber-500 font-bold mt-1 pl-[44px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Admin Control Panel
            </p>
          </div>
          <nav className="space-y-1.5">
            <a href="#" className="flex items-center gap-4 px-3 py-3 rounded-xl bg-amber-500 text-[#280c0c] font-bold text-sm shadow-md transition hover:bg-amber-400 whitespace-nowrap">
              <span className="text-lg min-w-[28px] text-center">📊</span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">Dashboard</span>
            </a>
          </nav>
        </div>
        <div className="p-4 border-t border-white/5 whitespace-nowrap">
          <button onClick={handleLogout} className="flex w-full items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-3 text-sm font-medium text-stone-300 transition hover:bg-red-600 hover:text-white">
            <span className="text-lg min-w-[24px] text-center">🚪</span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 p-6 md:p-10 overflow-y-auto space-y-10">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome, Administrator</h1>
            <p className="text-xs text-gray-400 mt-1">Manage physical counter transactions and log customer bookings below.</p>
          </div>
        </header>

        {/* Analytics Display Metrics */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">{totalActiveOrders}</div>
            <div className="text-xs font-medium text-gray-400 mt-1">Active Units (Last 24 Hours)</div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-gray-900">₱{totalSales.toLocaleString()}</div>
            <div className="text-xs font-medium text-green-600 mt-1">Rolling Sales (Last 24 Hours)</div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-[#5c1d1d]">₱{totalProfit.toLocaleString()}</div>
            <div className="text-xs font-medium text-[#5c1d1d] mt-1">Rolling Profits (Last 24 Hours)</div>
          </div>
        </section>

        {/* Landing Page Cards Manager */}
        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="mb-6">
            <h3 className="text-base font-bold text-gray-900">Client Landing Page Cards Manager</h3>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <form onSubmit={handleAddServiceCard} className="space-y-4 border-b lg:border-b-0 lg:border-r border-gray-100 pb-6 lg:pb-0 lg:pr-8">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide">Create New Card Package</h4>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Weight Range</label>
                <input type="text" value={newRange} onChange={(e) => setNewRange(e.target.value)} placeholder="e.g., 40 - 45 kls" className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Price Matrix Label</label>
                <input type="text" value={newPriceRange} onChange={(e) => setNewPriceRange(e.target.value)} placeholder="e.g., 22,000 - 25,000" className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Status Text (e.g., Available)</label>
                <input type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
              </div>
              <button type="submit" className="w-full bg-[#5c1d1d] text-white font-medium py-2.5 rounded-xl text-sm transition hover:bg-[#471616]">➕ Publish Menu Card</button>
            </form>

            <div className="lg:col-span-2">
              <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-3">Live Client Cards ({services.length})</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-h-[300px] overflow-y-auto pr-2">
                {services.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-[#faf6f6] border border-gray-100 rounded-xl">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-bold text-gray-800">{item.range}</p>
                        <span className="px-2 py-0.5 text-[9px] font-bold bg-green-100 text-green-700 rounded-md uppercase tracking-wide">{item.description}</span>
                      </div>
                      <p className="text-xs font-medium text-gray-500">{item.price}</p>
                    </div>
                    <button type="button" onClick={() => handleDeleteServiceCard(item.id)} className="text-xs bg-red-50 text-red-600 hover:bg-red-100 font-semibold p-2 rounded-lg">🗑️</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Input Form */}
          <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h3 className="text-base font-bold text-gray-900 mb-4">Input Customer Order</h3>
            <form onSubmit={handleAddOrder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Customer Name</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Juan Dela Cruz" className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Client Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, Barangay, City" className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Lechon Size</label>
                <select value={size} onChange={(e) => setSize(e.target.value)} className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 bg-white outline-none focus:border-[#5c1d1d]">
                  <option value="Small">Small Lechon</option>
                  <option value="Medium">Medium Lechon</option>
                  <option value="Large">Large Lechon</option>
                  <option value="Extra Large">Extra Large Lechon</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Price (₱)</label>
                  <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">Cost (₱)</label>
                  <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Quantity</label>
                <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full text-sm px-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#5c1d1d]" />
              </div>
              <button type="submit" className="w-full bg-[#5c1d1d] text-white font-medium py-2.5 rounded-xl text-sm transition hover:bg-[#471616]">💾 Commit Order</button>
            </form>
          </section>

          {/* Active Transactions Log */}
          <section className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-50">
              <h3 className="text-base font-bold text-gray-900">Active Transactions Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-500">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3">Customer</th>
                    {/* ✨ NEW: Address Column */}
                    <th className="px-6 py-3">Client Address</th>
                    <th className="px-6 py-3 text-center">Qty</th>
                    <th className="px-6 py-3">Total Sales</th>
                    <th className="px-6 py-3">Net Profit</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {activeOrders.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-gray-400 text-xs">No active transactions today.</td></tr>
                  ) : (
                    activeOrders.map((order) => (
                      <tr key={order.id}>
                        <td className="px-6 py-4 font-bold text-gray-900">{order.customer_name}</td>
                        {/* ✨ NEW: Rendered Address */}
                        <td className="px-6 py-4 text-xs italic text-gray-500 truncate max-w-[150px]">{order.address}</td>
                        <td className="px-6 py-4 text-center font-medium">{order.quantity}</td>
                        <td className="px-6 py-4">₱{(order.price * order.quantity).toLocaleString()}</td>
                        <td className="px-6 py-4 font-bold text-green-600">₱{((order.price - order.cost) * order.quantity).toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => handleDeleteOrder(order.id)} className="text-red-600 opacity-60 hover:opacity-100">🗑️</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Business Performance History */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-50">
            <h3 className="text-base font-bold text-gray-900">Everyday Business Performance History</h3>
            <p className="text-xs text-gray-400">Permanent matrix of daily gross sales value and net profits achieved.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-400 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3">Calendar Date</th>
                  <th className="px-6 py-3 text-center">Total Volume (Units)</th>
                  <th className="px-6 py-3">Total Sales Summary</th>
                  <th className="px-6 py-3 text-right">Total Realized Profit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {Object.keys(historyGrouped).length === 0 ? (
                  <tr><td colSpan={4} className="px-6 py-10 text-center text-gray-400 text-xs">No logs saved yet.</td></tr>
                ) : (
                  Object.keys(historyGrouped).sort((a, b) => b.localeCompare(a)).map((dateKey) => {
                    const group = historyGrouped[dateKey];
                    return (
                      <tr key={dateKey}>
                        <td className="px-6 py-4 font-bold text-gray-900">{dateKey}</td>
                        <td className="px-6 py-4 text-center font-medium text-gray-600">{group.items} Items</td>
                        <td className="px-6 py-4 font-semibold text-gray-700">₱{group.sales.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right font-black text-[#5c1d1d]">₱{group.profit.toLocaleString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}