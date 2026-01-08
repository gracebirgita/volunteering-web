import React from 'react';
import { Link } from '@inertiajs/react';
import { MapPin, Calendar } from 'lucide-react';
import AddOns from "@/Components/AddOns";

export default function MyEventCard({ event }) {
    /**
     * ============================================================
     * STATUS BADGE RENDERER
     * ============================================================
     */
    const renderStatusBadge = (status) => {
        const baseClass = 'text-xs px-2 py-1 rounded';

        switch (status) {
            case 'pending':
                return (
                    <span className={`${baseClass} bg-yellow-100 text-yellow-700`}>
                        Menunggu Konfirmasi
                    </span>
                );
            case 'rejected':
                return (
                    <span className={`${baseClass} bg-red-100 text-red-700`}>
                        Ditolak
                    </span>
                );
            case 'accepted':
                return (
                    <span className={`${baseClass} bg-green-100 text-green-700`}>
                        Diterima
                    </span>
                );
            default:
                return null;
        }
    };

    /**
     * ============================================================
     * RENDER
     * ============================================================
     */
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            {/* Image */}
            <div className="h-40 w-full bg-gray-200 relative">
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />
                {event.status && (
                    <div className="absolute top-3 left-3">
                        {renderStatusBadge(event.status)}
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <AddOns
                            category={event.category}
                            organizer={event.event_organizer}
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{event.location}</span>
                    </div>
                </div>


                <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">
                    {event.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    Bergabunglah bersama kami untuk membuat perubahan nyata di lingkungan sekitar...
                </p>



                {/* Actions */}
                <div className="flex gap-2 mt-2">
                    <Link
                        href={route('events.show', event.event_id)}
                        className="flex-1"
                    >
                        <button className="w-full bg-white border border-teal-600 text-teal-600 py-2 rounded-lg text-sm font-medium hover:bg-teal-50">
                            Lihat Detail
                        </button>
                    </Link>

                    {/* {event.status === 'accepted' && (
                        <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                            Mulai
                        </button>
                    )} */}

                </div>
            </div>
        </div>
    );
}
