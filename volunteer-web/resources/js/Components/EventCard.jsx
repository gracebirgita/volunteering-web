import { MapPin, CalendarDays } from "lucide-react";
import { Link } from '@inertiajs/react';
import AddOns from "@/Components/AddOns";



export default function EventCard({ event }) {
    const {
        event_id,
        event_name,
        event_start,
        event_description,
        event_location,
        registered,
    } = event;

    return (
        <div className=" relative bg-white rounded-xl overflow-hidden shadow-sm flex flex-col ">

           {/* Status Event , jika tidak registered */}
            {!registered && (
                <div className="absolute top-3 right-3 z-20">
                    <AddOns status={event.event_status} />
                    <AddOns status={event.category} />
                </div>
            )}

          
            {/* Thumbnail */}
            <div className="relative h-40">
                <img
                    src={event.image_url}
                    alt={event.event_name}
                    className="h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

                {registered && (
                    <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full z-15">
                        Terdaftar
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                
                <div className="flex flex-row gap-5 mb-3">
                    <AddOns category={event.category}/>
                    <AddOns organizer={event.event_organizer} />
                </div>

                <h3 className="font-inter font-semibold text-gray-800 line-clamp-1 mb-1 pl-2">
                    {event_name}
                </h3>


                <p className="text-sm text-gray-600 line-clamp-3 pl-2">
                    {event_description}
                </p>

                
                <div className="flex flex-row items-center mt-2 gap-3 text-sm text-gray-500 pl-2">
                    <div className="flex items-center gap-2">
                        <CalendarDays size={16} />
                        <span className="line-clamp-1">
                            {new Date(event_start).toLocaleDateString("id-ID", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span className="line-clamp-1">
                            {event_location}
                        </span>
                    </div>
                </div>
                

                <div className="mt-auto pt-4">
                    <Link
                        href={route('events.show', event_id)}
                        className="block"
                    >
                        <button
                            className={`w-full text-sm font-semibold py-2 rounded-lg transition
                                ${
                                    registered
                                        ? "bg-gray-200 text-gray-500 hover:bg-[#2fb8a4]"
                                        : "bg-[#33CCB5] text-black hover:bg-[#2fb8a4]"
                                }
                            `}
                        >
                            {registered ? "Sudah Terdaftar" : "Lihat Detail"}
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
