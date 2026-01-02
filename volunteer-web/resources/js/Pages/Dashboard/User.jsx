import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import Topbar from "@/Components/Topbar";
import { Head } from "@inertiajs/react";
import {
    CalendarCheck,
    Clock4,
    Award,
    MoveRight,
    MoveLeft,
} from 'lucide-react';

const STAT_ICONS = {
    events: CalendarCheck,
    hours: Clock4,
    certificates: Award,
};

export default function Dashboard({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = auth.user;

    const [loading, setLoading] = useState(true);

    const EVENTS_PER_PAGE = 3;

    const dummyEvents = Array.from({ length: 8 });

    const [eventIndex, setEventIndex] = useState(0);

    const visibleEvents = dummyEvents.slice(
        eventIndex,
        eventIndex + EVENTS_PER_PAGE
    );

    const maxIndex = Math.max(
        0,
        dummyEvents.length - EVENTS_PER_PAGE
    );

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            <Head title="User Dashboard" />

            {/* SIDEBAR */}
            <MyNavbar
                user={user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* MAIN AREA */}
            <div className="flex-1 flex flex-col">
                {/* TOPBAR (desktop + mobile) */}
                <Topbar
                    user={user}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                {/* CONTENT */}
                <main className="flex-1 px-4 md:px-8 py-6 max-w-7xl mx-auto w-full">

                    {/* HERO */}
                    {loading ? (
                        <HeroSkeleton/>
                    ) : (
                        <section className="bg-[#005D67] rounded-2xl px-6 py-8 md:px-10 md:py-12 text-white flex flex-col md:flex-row items-center justify-between gap-10">
                            <div className="max-w-xl">
                                <h1 className="font-hand text-4xl md:text-5xl leading-tight">
                                    Selamat Datang
                                    <br />
                                    Kembali{" "}
                                    <span className="inline-block ml-2 font-hand font-bold text-orange-400 text-3xl">
                                        {user.name}
                                    </span>
                                </h1>

                                <p className="mt-4 text-white max-w-md text-xl font-thin">
                                    Terus berkontribusi dan memberi dampak positif bagi sekitar.
                                </p>
                            </div>

                            <img
                                src="/assets/hero.png"
                                alt=""
                                aria-hidden="true"
                                className="hidden md:block h-32 lg:h-48 select-none"
                            />
                        </section>  
                    )}

                   {/* STATS */}
                   {loading ? (
                        <StatsHeaderSkeleton/>
                   ) : (
                        <div className="flex-1 flex justify-between mt-8 items-center">
                            <h2 className="text-lg font-bold">Data Anda Tahun Ini</h2>
                            <button className="text-sm text-[#000000] font-bold bg-[#33CCB5] py-2 px-5 rounded-md">Lihat Statistik Anda </button>
                        </div>
                   )}
                   <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                        {loading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <StatCardSkeleton key={i} />
                            ))
                        ) : (
                            <>
                                <StatCard label="Event Diikuti" value="12" type="events" />
                                <StatCard label="Total Jam" value="54" type="hours" />
                                <StatCard label="Sertifikat" value="8" type="certificates" />
                            </>
                        )}
                    </section>

                    {/* EVENTS */}
                    <section className="mt-10">

                        {loading ? <SectionHeaderSkeleton /> : (
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold">
                                    Kegiatan yang bisa anda ikuti
                                </h2>
                                <ControlEvent
                                    index={eventIndex}
                                    maxIndex={maxIndex}
                                    onPrev={() => setEventIndex((i) => Math.max(0, i - EVENTS_PER_PAGE))}
                                    onNext={() => setEventIndex((i) => Math.min(maxIndex, i + EVENTS_PER_PAGE))}
                                />
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {loading ? (
                                Array.from({ length: EVENTS_PER_PAGE }).map((_, i) => (
                                    <EventPlaceholder key={i} />
                                ))
                            ) : (
                                visibleEvents.map((_, i) => (
                                    <EventPlaceholder key={eventIndex + i} />
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


{/* Skeleton */}

function HeroSkeleton() {
    return (
        <section className="bg-[#005D67] rounded-2xl px-6 py-8 md:px-10 md:py-12 text-white">
            <div className="max-w-xl space-y-3">
                <div className="h-8 w-64 bg-white/30 rounded" />
                <div className="h-8 w-40 bg-white/30 rounded" />
                <div className="h-4 w-72 bg-white/20 rounded mt-4" />
            </div>
        </section>
    );
}

function StatCardSkeleton() {
    return (
        <div className="bg-white rounded-xl p-5 shadow-sm flex gap-5 items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
            <div className="space-y-2">
                <div className="h-6 w-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-20 bg-gray-100 rounded animate-pulse" />
            </div>
        </div>
    );
}

function EventPlaceholder() {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-40 bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-100 rounded w-full" />
            </div>
        </div>
    );
}

function SectionHeaderSkeleton() {
    return (
        <div className="flex items-center justify-between mb-4">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />

            <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
                <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
            </div>
        </div>
    );
}

function StatsHeaderSkeleton() {
    return (
        <div className="flex items-center justify-between mt-8">
            <div className="h-5 w-48 bg-gray-200 rounded animate-pulse" />
            <div className="h-9 w-40 bg-gray-200 rounded animate-pulse" />
        </div>
    );
}
