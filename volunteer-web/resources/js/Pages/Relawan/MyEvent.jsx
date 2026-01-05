import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import MyNavbar from "@/Components/Navbar";
import EventCard from '@/Components/EventCard';
import HeroBanner from '@/Components/HeroBanner';
import React, { useState } from 'react';
import { Search, Filter, Calendar } from 'lucide-react';


export const mockEvents = [
    {
      id: 1,
      title: "Aksi Bersih Pantai",
      category: "Lingkungan",
      location: "Pantai Talise",
      date: "12 Okt 2025",
      image: "https://placehold.co/600x400", // Replace with real asset
      status: "accepted", // status options: accepted, pending, rejected
      organizer: "Green Earth"
    },
    {
      id: 2,
      title: "Kelas Daur Ulang Sampah",
      category: "Workshop",
      location: "Aula Kota",
      date: "15 Okt 2025",
      image: "https://placehold.co/600x400",
      status: "pending",
      organizer: "Recycle Now"
    },
    {
      id: 3,
      title: "Penanaman Bakau",
      category: "Lingkungan",
      location: "Pesisir Donggala",
      date: "20 Okt 2025",
      image: "https://placehold.co/600x400",
      status: "rejected",
    },
    {
      id: 4,
      title: "Aksi Bersih Pantai",
      category: "Lingkungan",
      location: "Pantai Talise",
      date: "12 Okt 2025",
      image: "https://placehold.co/600x400", // Replace with real asset
      status: "accepted", 
      organizer: "Green Earth"
    },
    {
      id: 5,
      title: "Kelas Daur Ulang Sampah",
      category: "Workshop",
      location: "Aula Kota",
      date: "15 Okt 2025",
      image: "https://placehold.co/600x400",
      status: "pending",
      organizer: "Recycle Now"
    },
    {
      id: 6,
      title: "Penanaman Bakau",
      category: "Lingkungan",
      location: "Pesisir Donggala",
      date: "20 Okt 2025",
      image: "https://placehold.co/600x400",
      status: "rejected",
    },
]   

export default function MyEvent({ auth }) {
    const user = auth.user;
    const [activeTab, setActiveTab] = useState('Semua');
    const [searchQuery, setSearchQuery] = useState('');
    const tabs = ['Semua', 'Diterima', 'Pending', 'Ditolak'];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const filteredEvents = mockEvents.filter(event => {
        // 1. Filter by Search
        if (!event.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;

        // 2. Filter by Tab
        if (activeTab === 'Semua') return true;
        if (activeTab === 'Diterima') return event.status === 'accepted';
        if (activeTab === 'Pending') return event.status === 'pending';
        if (activeTab === 'Ditolak') return event.status === 'rejected';
        
        return true;
      });

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Event Saya" />
                      
            {/* Navbar Section */}
            <MyNavbar
                user={user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* Mobile Header */}
            <main className="flex-1 w-full overflow-x-hidden">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold">
                            <img src="/assets/logo-color.png" alt="Logo" className="h-5 w-5 object-contain"/>
                        </div>
                        <span className="font-bold text-[#005D67]">VolunteerHub</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 focus:outline-none p-1"
                    >
                    </button>
                </div>

                <div className="p-6 md:p-8 lg:p-10 max-w-[1500px] mx-auto">
                    {/* Header Section == Hero Banner*/}
                    <HeroBanner />
                    
                    {/* Navigation Tab */}
                    <div className="border-b border-gray-400 mb-6">
                        <nav className="flex gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`pb-4 text-base font-semibold transition-colors relative ${
                                        activeTab === tab 
                                            ? 'text-teal-600 border-b-2 border-teal-600' 
                                            : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </nav>
                    </div>

                    {/* Controls (Search & Filter) */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="relative w-full md:w-96">
                            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
                            <input 
                                type="text" 
                                placeholder="Cari nama event atau nama organisasi..." 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
                            />
                        </div>
                        
                        <div className="flex gap-4 w-full md:w-auto">
                            <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 focus:outline-none bg-white shadow-sm cursor-pointer hover:bg-gray-50">
                                <option>Kategori Aktivitas</option>
                            </select>
                            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white shadow-sm hover:bg-gray-50 transition-colors">
                                <Calendar size={16} /> Tentukan Tanggal
                            </button>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    {filteredEvents.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <Search className="text-gray-300 mb-2" size={48} />
                            <p className="text-gray-500">Tidak ada event ditemukan.</p>
                        </div>
                    )}


                </div>
            </main>    
        </div>
    );
}