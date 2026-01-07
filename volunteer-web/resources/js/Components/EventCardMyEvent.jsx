import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export default function EventCard({ event }) {
  // Dynamic badge color based on status
  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded">Menunggu Konfirmasi</span>;
      case 'rejected': return <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">Ditolak</span>;
      default: return <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Aktivitas</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      {/* Image Section */}
      <div className="h-40 w-full bg-gray-200 relative">
        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute top-3 left-3">
            {getStatusBadge(event.status)}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-gray-500 mb-4 line-clamp-2">
           Bergabunglah bersama kami untuk membuat perubahan nyata di lingkungan sekitar...
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={14} /> {event.date}
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={14} /> {event.location}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-2">
            <button className="flex-1 bg-white border border-teal-600 text-teal-600 py-2 rounded-lg text-sm font-medium hover:bg-teal-50">
                Lihat Detail
            </button>
            {event.status === 'upcoming' && (
                <button className="flex-1 bg-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-teal-700">
                    Mulai
                </button>
            )}
        </div>
      </div>
    </div>
  );
}