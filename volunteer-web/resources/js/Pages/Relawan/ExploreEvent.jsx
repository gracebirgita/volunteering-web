import { Head, Link } from '@inertiajs/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function ExploreEvent({ events, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    
    return (
        <>
        <h1>EVENT EXPLORE</h1>

            <Head title="Explore Events" />

            <div className="flex gap-6">
                {/* LEFT - EVENT LIST */}
                <div className="w-3/4">
                    <h1 className="text-2xl font-bold mb-4">Explore Events</h1>

                    {/* SEARCH */}
                    <input
                        type="text"
                        placeholder="Cari event..."
                        value={search}
                        onChange={(e)=>{
                            setSearch(e.target.value);

                            router.get(
                                '/events',
                                { search: e.target.value},
                                {
                                    preserveState:true,
                                    replace:true,
                                }
                            );
                        }}
                        // defaultValue={filters.search}
                        className="w-full mb-6 p-2 border rounded"
                    />

                    {/* EVENT CARDS */}
                    <div className="grid grid-cols-3 gap-6">
                        {events.map(event => (
                            <div key={event.event_id} className="card p-4 border rounded">
                            
                            {/* statusnya : active/finished */}
                            <h3 className="font-['inter']-3 text-lg">
                                ({event.event_status})
                            </h3>

                            {/* nama event & description */}
                            <h3 className="font-bold text-lg">
                                {event.event_name}
                            </h3>

                            <p className="text-sm mt-2">
                                {event.event_description.slice(0, 100)}...
                            </p>


                            <div className="mt-3 flex flex-wrap gap-2 text-xs">
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

                            <button className="mt-4 px-3 py-1 bg-blue-600 text-white rounded">
                                Lihat Detail
                            </button>

                        </div>
                        ))}
                    </div>

                </div>

                {/*  FILTER BY : kategori INSTITUTE, organisasi/institute, lokasi event, tanggal event */}
                {/* <div className="w-1/4 border rounded p-4">
                    <h3 className="font-semibold mb-2">Filter</h3>

                    <div className="mb-4">
                        <p className="text-sm font-medium">Kategori</p>
                        {categories.map(cat => (
                            <div key={cat.id} className="text-sm">
                                {cat.name}
                            </div>
                        ))}
                    </div>

                    <div>
                        <p className="text-sm font-medium">Organisasi</p>
                        {institutes.map(inst => (
                            <div key={inst.id} className="text-sm">
                                {inst.institute_name}
                            </div>
                        ))}
                    </div>
                </div> */}

            </div>
        </>
    );
}