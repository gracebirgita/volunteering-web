import { Head, router } from '@inertiajs/react';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { X, Search } from 'lucide-react';

import MyNavbar from '@/Components/Navbar';
import MyEventCard from '@/Components/MyEventCard';
import HeroBanner from '@/Components/HeroBanner';

export default function MyEvent({ auth, filters, events, categories, institutes }) {
    /**
     * ============================================================
     * 1. BASE DATA
     * ============================================================
     */
    const user = auth.user;
    const tabs = ['Semua', 'Diterima', 'Pending', 'Ditolak'];
    const eventList = events?.data ?? [];

    /**
     * ============================================================
     * 2. UI STATE
     * ============================================================
     */
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(filters.tab || 'Semua');
    const [searchQuery, setSearchQuery] = useState(filters.search || '');
    const [selectedDate, setSelectedDate] = useState(filters.date || '');

    // filter category, institute/organisasi
    const [selectedCategory, setSelectedCategory]=useState(filters.category || '');
    const [selectedInstitute, setSelectedInstitute] = useState(filters.institute || '');

    /**
     * ============================================================
     * 3. DATA RELOAD HELPER (SINGLE SOURCE OF TRUTH)
     * ============================================================
     */
    const reloadData = useCallback((params = {}) => {
        router.get(
            route('myevents.index'),
            {
                tab: activeTab,
                search: searchQuery,
                date: selectedDate,

                // filter category, institute
                category: selectedCategory,
                institute:selectedInstitute,
                ...params,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, [activeTab, searchQuery, selectedDate, selectedCategory, selectedInstitute]);

    /**
     * ============================================================
     * 4. SEARCH (DEBOUNCED)
     * ============================================================
     */
    const debouncedSearch = useCallback(
        debounce((value) => {
            reloadData({ search: value });
        }, 300),
        [reloadData]
    );

    useEffect(() => {
        return () => debouncedSearch.cancel();
    }, [debouncedSearch]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        debouncedSearch(value);
    };

    /**
     * ============================================================
     * 5. FILTER HANDLERS
     * ============================================================
     */
    const handleTabChange = (tab) => {
        setActiveTab(tab);
        reloadData({ tab });
    };

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        reloadData({ date });
    };

    const clearDate = () => {
        setSelectedDate('');
        reloadData({ date: '' });
    };

    // category, institute filter
    const handleCategoryChange = (e) => {
        const value = e.target.value;
        setSelectedCategory(value);
        reloadData({ category: value });
    };

    const handleInstituteChange = (e) => {
        const value = e.target.value;
        setSelectedInstitute(value);
        reloadData({ institute: value });
    };

    /**
     * ============================================================
     * 6. RENDER
     * ============================================================
     */
    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Event Saya" />

            {/* Sidebar */}
            <MyNavbar
                user={user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className="flex-1 w-full overflow-x-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#005D67] rounded-full flex items-center justify-center">
                            <img
                                src="/assets/logo-color.png"
                                alt="Logo"
                                className="h-5 w-5 object-contain"
                            />
                        </div>
                        <span className="font-bold text-[#005D67]">
                            VolunteerHub
                        </span>
                    </div>
                </div>

                <div className="p-6 md:p-8 lg:p-10 max-w-[1500px] mx-auto">
                    {/* Hero */}
                    <HeroBanner />

                    {/* Tabs */}
                    <div className="border-b border-gray-400 mb-6">
                        <nav className="flex gap-8">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => handleTabChange(tab)}
                                    className={`pb-4 text-base font-semibold transition-colors ${
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

                    {/* Search & Date Filter */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-2 mb-8">
                        <div className="relative w-full md:w-96">
                            <Search
                                className="absolute left-3 top-2.5 text-gray-400"
                                size={20}
                            />
                            <input
                                type="text"
                                placeholder="Cari nama event atau nama organisasi..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 bg-white shadow-sm"
                            />
                        </div>

                        {/* CATEGORY */}
                        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto lg:justify-end">

                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="px-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white shadow-sm focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Semua Kategori</option>
                                {categories.map((cat) => (
                                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                                ))}
                            </select>

                            {/* ORGANISASI */}
                            <select
                                value={selectedInstitute}
                                onChange={handleInstituteChange}
                                className="px-2 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white shadow-sm focus:ring-2 focus:ring-teal-500"
                            >
                                <option value="">Semua Organisasi</option>
                                {institutes.map((inst) => (
                                    <option key={inst} value={inst}>{inst}</option>
                                ))}
                            </select>


                            <div className="relative">
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                    className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white shadow-sm focus:ring-2 focus:ring-teal-500"
                                />
                                {selectedDate && (
                                    <button
                                        onClick={clearDate}
                                        className="absolute -right-3 -top-3 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                                        title="Hapus Tanggal"
                                    >
                                        <X size={12} />
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Event Grid */}
                    {eventList.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {eventList.map((event) => (
                                <MyEventCard
                                    key={event.registration_id ?? event.event_id}
                                    event={event}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                            <Search className="text-gray-300 mb-2" size={48} />
                            <p className="text-gray-500">
                                {activeTab === 'Semua'
                                    ? 'Tidak ada event yang ditemukan sesuai filter.'
                                    : `Tidak ada event dengan status "${activeTab}".`}
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
