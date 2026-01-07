import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import Topbar from "@/Components/Topbar";
import EventCard from "@/Components/EventCard";
import { Head } from "@inertiajs/react";
import {
    CalendarCheck,
    Clock4,
    Award,
    MoveRight,
    MoveLeft,
} from 'lucide-react';
import Profile from "../Institute/Profile";

const STAT_ICONS = {
    events: CalendarCheck,
    hours: Clock4,
    certificates: Award,
};




export default function Dashboard({ auth, events = [], stats = null, profileUser }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const user = auth.user  

    const EVENTS_PER_PAGE = 3;
    const [eventIndex, setEventIndex] = useState(0);

    const isLoading = !stats;

    const visibleEvents = events.slice(
        eventIndex,
        eventIndex + EVENTS_PER_PAGE
    );

    const maxIndex = Math.max(0, events.length - EVENTS_PER_PAGE);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            <Head title="User Dashboard"/>

            <MyNavbar
                user={user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col">
                <Topbar user={profileUser} onMenuClick={() => setSidebarOpen(true)} />

                <main className="flex-1 px-4 md:px-8 py-6 mx-auto w-full lg:max-w-7xl lg:mx-auto">

                    {/* HERO */}
                    {isLoading ? (
                        <HeroSkeleton />
                    ) : (
                        <section className="bg-[#005D67] rounded-2xl px-6 py-8 md:px-10 md:py-12 text-white flex flex-col hp-land:flex-row md:flex-row  justify-between gap-10">
                            <div className="max-w-xl">
                                <h1 className="font-hand text-4xl md:text-6xl sm:text-2xl hp-land:text-4xl leading-tight">
                                    Selamat Datang <br/>
                                    Kembali
                                    <span className="text-orange-400 font-bold ml-3">
                                        {profileUser?.user_name?.trim()?.split(" ")?.[0] ?? "Relawan"}
                                    </span>
                                </h1>
                                <p className="mt-4 md:text-xl font-thin sm:text-xs hp-land:text-base">
                                    Terus berkontribusi dan memberi dampak positif <br></br>bagi sekitar.
                                </p>
                            </div>
                            <img
                                src="/assets/hero.png"
                                alt=""
                                className=" sm:block h-40 select-none md:self-center sm:self-end"
                            />
                        </section>
                    )}

                    {/* STATS */}
                    {isLoading ? (
                        <StatsHeaderSkeleton />
                    ) : (
                        <div className="flex justify-between mt-8 items-center">
                            <h2 className="text-lg font-bold">
                                Data Anda Tahun Ini
                            </h2>
                        </div>
                    )}

                    <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <StatCardSkeleton key={i} />
                            ))
                        ) : (
                            <>
                                <StatCard
                                    label="Event Diikuti"
                                    value={stats.total_events}
                                    type="events"
                                />
                                <StatCard
                                    label="Total Jam"
                                    value={stats.total_hours}
                                    type="hours"
                                />
                                <StatCard
                                    label="Sertifikat"
                                    value={stats.total_certificates}
                                    type="certificates"
                                />
                            </>
                        )}
                    </section>

                    {/* EVENTS */}
                    <section className="mt-10">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-bold">
                                Kegiatan yang bisa Anda ikuti
                            </h2>

                            {events.length > EVENTS_PER_PAGE && (
                                <ControlEvent
                                    index={eventIndex}
                                    maxIndex={maxIndex}
                                    onPrev={() =>
                                        setEventIndex((i) =>
                                            Math.max(0, i - EVENTS_PER_PAGE)
                                        )
                                    }
                                    onNext={() =>
                                        setEventIndex((i) =>
                                            Math.min(maxIndex, i + EVENTS_PER_PAGE)
                                        )
                                    }
                                />
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {events.length === 0 ? (
                                <div className="col-span-full text-center text-gray-500 py-10">
                                    Belum ada kegiatan yang tersedia.
                                </div>
                            ) : (
                                visibleEvents.map((event) => (
                                    <EventCard
                                        key={event.event_id}
                                        event={event}
                                    />
                                ))
                            )}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}


{/* StatCard */}

function StatCard({ label, value, type }) {
    const Icon = STAT_ICONS[type];

    return (
        <div className="bg-white rounded-xl p-5 shadow-sm flex gap-5 items-center">
            {Icon && (
                <div className="p-3 bg-[#33ccb52b] rounded-[50%] flex items-center justify-center ">
                    <Icon size={30} className="text-[#005D67]" />
                </div>
            )}

            <div className="flex flex-col">
                <p className="text-2xl font-bold">{value}</p>
                <p className="text-sm text-gray-500">{label}</p>
            </div>
        </div>
    );
}


{/* ControlEvent */}

function ControlEvent({ index, maxIndex, onPrev, onNext }) {
    return (
        <div className="flex items-center gap-4">
            <button
                onClick={onPrev}
                disabled={index === 0}
                className={`p-3 rounded-3xl transition
                    ${index === 0
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-black hover:bg-gray-50"}
                `}
            >
                <MoveLeft size={20} />
            </button>

            <button
                onClick={onNext}
                disabled={index >= maxIndex}
                className={`p-3 rounded-3xl transition
                    ${index >= maxIndex
                        ? "bg-[#33CCB5]/40 text-white cursor-not-allowed"
                        : "bg-[#33CCB5] text-white hover:bg-[#2fb8a4]"}
                `}
            >
                <MoveRight size={20} />
            </button>
        </div>
    );
}



