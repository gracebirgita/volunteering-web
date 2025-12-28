import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';


export default function ExploreEvent({ events, categories, institutes, locations, status, filters:serverFilters }) {
    // const [search, setSearch] = useState(filters.search || '');
    const [filters, setFilters] = useState({
        search: serverFilters.search || '',
        institute_cat: serverFilters.institute_cat || '',
        institute: serverFilters.institute || '',
        location: serverFilters.location || '',
        status: serverFilters.status || '',
        date: serverFilters.date || '',
    });    

    // hub input -> query str 
    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        
        router.get('/events', newFilters, {
            preserveState: true,
            replace: true,
            preserveScroll: true,
        });
    };


    return (
        <>
        <AuthenticatedLayout>
            <Head title="Explore Event" />
            <h1 className='mt-20'>EXPLORE EVENT RELAWAN</h1>
            <h1>EVENT EXPLORE</h1>

            <div className="flex gap-6">
                {/* LEFT - EVENT LIST */}
                <div className="w-3/4">
                    <h1 className="text-2xl font-bold mb-4">Explore Events</h1>

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Cari event..."
                        value={filters.search}
                        onChange={(e) => {
                            const value = e.target.value
                            setFilters(prev => ({ ...prev, search: value }))
                            router.get('/events', {
                                ...filters,
                                search: value,
                            }, {
                                preserveState: true,
                                replace: true,
                            })
                        }}
                        className="w-full mb-4 p-2 border rounded"
                    />

                    {/*  FILTER BY : kategori INSTITUTE, organisasi/institute, lokasi event, tanggal event */}
                    {/* 1. category */}
                    <select
                      value={filters.institute_cat}
                      onChange={(e) =>{
                            const value = e.target.value;
                            const newFilters={...filters, institute_cat:value};
                            
                            // 1. update state UI
                            setFilters(newFilters);

                            // 2. send server filtered data
                            router.get('/events', newFilters, {
                                preserveState: true,
                                replace:true,
                            });
                        }}
                        className="p-2 border rounded"
                    >
                        <option value="">All Category</option>
                          {(categories).map((catName, i) => (
                            <option key={i} value={catName}>
                                {catName}
                                </option>
                              ))}
                    </select>

                    {/* 2. institute */}
                    <select
                      value={filters.institute}
                      onChange={(e) =>{
                            const value = e.target.value;
                            const newFilters={...filters, institute:value};
                            
                            // 1. update state UI
                            setFilters(newFilters);

                            // 2. send server filtered data
                            router.get('/events', newFilters, {
                                preserveState: true,
                                replace:true,
                            });
                        }}
                        className="p-2 border rounded"
                    >
                        <option value="">All Institute</option>
                          {(institutes).map((instName, i) => (
                            <option key={i} value={instName}>
                                {instName}
                                </option>
                              ))}
                    </select>

                    {/* 4. status filter */}
                    <select
                      value={filters.status}
                      onChange={(e) =>{
                            const value = e.target.value;
                            const newFilters={...filters, status:value};
                            
                            // 1. update state UI
                            setFilters(newFilters);

                            // 2. send server filtered data
                            router.get('/events', newFilters, {
                                preserveState: true,
                                replace:true,
                            });
                        }}
                        className="p-2 border rounded"
                    >
                        <option value="">All status</option>
                          {(status).map((stat, i) => (
                            <option key={i} value={stat}>
                                {stat}
                                </option>
                              ))}
                    </select>

                    {/* 4. location filter */}
                    <select
                      value={filters.location}
                      onChange={(e) =>{
                            const value = e.target.value;
                            const newFilters={...filters, location:value};
                            
                            // 1. update state UI
                            setFilters(newFilters);

                            // 2. send server filtered data
                            router.get('/events', newFilters, {
                                preserveState: true,
                                replace:true,
                            });
                        }}
                        className="p-2 border rounded"
                    >
                        <option value="">All Location</option>
                          {(locations).map((loc, i) => (
                            <option key={i} value={loc}>
                                {loc}
                                </option>
                              ))}
                    </select>

                    {/* 5. date event start */}
                    <label className="block mb-2 text-sm font-medium">Pilih Tanggal Mulai Event</label>
                        <input
                            type="date"
                            value={filters.date}
                            onChange={(e) => handleFilterChange('date', e.target.value)}
                            className="p-2 border rounded w-full"
                        />

                        {/* Tombol Reset Tanggal*/}
                        {filters.date && (
                            <button 
                                onClick={() => handleFilterChange('date', '')}
                                className="text-xs text-red-500 mt-1"
                            >
                                <div class="btn btn-danger">
                                    Hapus Filter Tanggal 
                                </div>
                            </button>
                        )}
                    
                    {/* LIST EVENT : showcase EVENT CARDS */}
                    <div className="grid grid-cols-3 gap-6">
                        {events.map(event => (
                            <div key={event.event_id} className="card p-4 border rounded">
                            
                            {/* statusnya : active/finished */}
                            <h3 className="font-['inter']-3 text-lg">
                                ({event.event_status})
                            </h3>

                            {/* quota relawan utk event */}
                            <h3 className="font-['inter']-3 text-sm px-2 py-1 bg-pink-100 rounded">
                                Sisa kuota relawan: ({event.quota_remaining}/{event.event_quota})
                            </h3>

                            {/* nama event & description */}
                            <h3 className="font-bold text-lg">
                                {event.event_name}
                            </h3>

                            <p className="text-sm mt-2">
                                {event.event_description.slice(0, 100)}...
                            </p>


                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
                                {/* Institute category */}
                                <span className="px-2 py-1 bg-red-100 rounded">
                                    <strong>({event.institute?.institute_category})</strong>
                                </span>

                                {/* institute name penyelenggara */}
                                <span className="px-2 py-1 bg-green-100 rounded">
                                    {event.institute?.institute_name}
                                </span>

                                {/* Lokasi & tanggal */}
                                <span className="px-2 py-1 bg-blue-100 rounded">
                                    {event.event_location}
                                </span>

                                <span className="px-2 py-1 bg-gray-100 rounded">
                                    {event.event_start} – {event.event_finish}
                                </span>

                            </div>

                            <p className={event.is_full ? "text-red-500 font-bold" : "text-gray-700"}>
                                {event.display_quota}
                            </p>

                            {/* <span v-else class="badge-green">{{ event.quota_remaining }} Slot Tersisa</span> */}

                            <br />
                            <Link
                                href={`/events/${event.event_id}`}
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                            >
                                Lihat Detail
                            </Link>

                        </div>
                        ))}
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>

        
        </>
    );
}