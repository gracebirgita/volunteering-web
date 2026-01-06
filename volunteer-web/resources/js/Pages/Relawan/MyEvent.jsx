import { Head, router } from '@inertiajs/react';
import MyNavbar from "@/Components/Navbar";
import EventCard from '@/Components/EventCard';
import HeroBanner from '@/Components/HeroBanner';
import React, { useState, useEffect, useCallback } from 'react';
import { Search, Calendar } from 'lucide-react';
import debounce from "lodash/debounce";  

export default function MyEvent({ auth, filters, events }) {
    const user = auth.user;
    const [activeTab, setActiveTab] = useState(filters.tab || 'Semua');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedDate, setSelectedDate] = useState(filters.date || ''); 
    const tabs = ['Semua', 'Diterima', 'Pending', 'Ditolak'];
    const [sidebarOpen, setSidebarOpen] = useState(false);
    
    const eventList = events?.data || [];

    // Helper to trigger the reload
    const reloadData = (newParams) => {
        router.get(route('myevents.index'), 
            // Merge current filters with new params
            { 
                tab: activeTab, 
                search: searchQuery, 
                date: selectedDate, 
                ...newParams 
            }, 
            { preserveState: true, preserveScroll: true, replace: true }
        );
    };

    // --- Server-Side Filter Logic ---
    const debouncedSearch = useCallback(
        debounce((query, tab) => {
            router.get(route('myevents.index'), { search: query, tab: tab }, {
                preserveState: true,
                preserveScroll: true,
                replace: true
            });
        }, 300), []
    );

    const handleSearchChange = (e) => {
        const val = e.target.value;
        setSearchQuery(val);
        debouncedSearch(val, activeTab);
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
        reloadData({ tab: tab }); // Use helper to keep other filters
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        reloadData({ date: date });
    };

    const clearDate = () => {
        setSelectedDate('');
        reloadData({ date: '' });
    };


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
                                    onClick={() => handleTabChange(tab)}
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
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
                            />
                        </div>
                        
                        <div className="flex gap-4 w-full md:w-auto items-center">
                            <div className="relative">
                                <input 
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white shadow-sm hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-teal-500 focus:outline-none cursor-pointer"
                                />
                                {selectedDate && (
                                    <button 
                                        onClick={clearDate}
                                        className="absolute -right-3 -top-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-all"
                                        title="Hapus Tanggal"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Grid Layout */}
                    {eventList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {eventList.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <Search className="text-gray-300 mb-2" size={48} />
                            <p className="text-gray-500">
                                {activeTab === 'Semua' 
                                    ? 'Tidak ada event yang ditemukan sesuai filter.' 
                                    : `Tidak ada event dengan status "${activeTab}" pada tanggal ini.`}
                            </p>
                            {(searchQuery || selectedDate) && (
                                <button 
                                    onClick={() => router.get(route('myevents.index'))}
                                    className="mt-4 text-teal-600 font-semibold hover:underline"
                                >
                                    Reset Semua Filter
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </main>    
        </div>
    );
}