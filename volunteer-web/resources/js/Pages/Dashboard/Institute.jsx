import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import {
    SquarePlus,
    SlidersHorizontal,
    Users,
    MapPin,
    FileCheck,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    CircleEllipsis,
    Menu,
    Calendar,
} from "lucide-react";

const Institute = ({ auth, institute, stats, ongoingList, upcomingList }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    console.log(ongoingList);

    // state pagination
    const [ongoingPage, setOngoingPage] = useState(0);
    const ITEMS_PER_PAGE = 6;

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        return new Date(dateString).toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const safeStats = stats || {
        totalEvents: 0,
        ongoingEvents: 0,
        totalVolunteers: 0,
        pendingApprovals: 0,
    };

    const displayActiveCount =
        safeStats.ongoingEvents > 0
            ? safeStats.ongoingEvents
            : ongoingList && ongoingList.length > 0
            ? ongoingList.length
            : 0;

    const displayName =
        institute?.institute_name || auth?.user?.name || "Institute";
    const displayPhoto =
        auth?.user?.profile_photo_url || "/assets/Dashboard/Institute/who.png";

    // pagination logic
    const totalOngoing = ongoingList ? ongoingList.length : 0;
    const maxPage = Math.ceil(totalOngoing / ITEMS_PER_PAGE) - 1;

    const visibleOngoingList = ongoingList
        ? ongoingList.slice(
              ongoingPage * ITEMS_PER_PAGE,
              (ongoingPage + 1) * ITEMS_PER_PAGE
          )
        : [];

    const handlePrev = () => {
        if (ongoingPage > 0) {
            setOngoingPage(ongoingPage - 1);
        }
    };

    const handleNext = () => {
        if (ongoingPage < maxPage) {
            setOngoingPage(ongoingPage + 1);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Institute Dashboard" />

            <MyNavbar
                user={auth?.user}
                variant="sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className="flex-1 w-full overflow-x-hidden">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold">
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
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 focus:outline-none p-1"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="p-4 pt-24 md:p-8 md:pt-8">
                    {/* HEADER */}
                    <div className="flex flex-col mb-8">
                        <div className="hidden md:flex justify-end items-center gap-4 mb-6">
                            <img
                                src={displayPhoto}
                                alt="Institute Logo"
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-lg font-semibold text-black">
                                {displayName}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Selamat Datang Kembali, {displayName}
                                </h1>
                                <p className="text-sm md:text-base text-black mt-1">
                                    Kelola kegiatan, pantau relawan, dan perluas
                                    dampak organisasi Anda.
                                </p>
                            </div>

                            <div className="flex gap-2 md:gap-3 w-full md:w-auto">
                                <Link
                                    href={route("institute.create")}
                                    className="flex-1 md:flex-none justify-center flex items-center gap-2 bg-[#005D67] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-700 transition"
                                >
                                    <SquarePlus size={16} />{" "}
                                    <span className="hidden sm:inline">
                                        Buat
                                    </span>{" "}
                                    Event
                                </Link>

                                <Link
                                    href={route("institute.organize")}
                                    className="flex-1 md:flex-none justify-center flex items-center gap-2 bg-[#C2F0E9] text-[#005D67] px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-100 transition border border-teal-200"
                                >
                                    <SlidersHorizontal size={16} />{" "}
                                    <span className="hidden sm:inline">
                                        Lihat
                                    </span>{" "}
                                    Event
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                        <StatCard
                            title="Lihat Semua Event"
                            value={safeStats.totalEvents}
                            sub="Jumlah Event Yang Dibuat Organisasi Anda"
                            href={route("institute.organize")}
                        />
                        <StatCard
                            title="Lihat Event Aktif"
                            value={displayActiveCount}
                            sub="Event Aktif yang Anda pernah buat"
                            href="#active-events"
                        />
                        <StatCard
                            title="Atur Relawan"
                            value={safeStats.totalVolunteers}
                            sub="Jumlah Relawan Terlibat dengan Organisasi Anda"
                            href={route("institute.appvol")}
                        />
                        <StatCard
                            title="Atur Relawan"
                            value={safeStats.pendingApprovals}
                            sub="Pendaftar Menunggu Persetujuan"
                            href={route("institute.appvol")}
                        />
                    </div>

                    {/* Active events Section */}
                    <div className="w-full" id="active-events">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-base md:text-lg font-bold text-gray-800">
                                Pantau Event Aktif Anda ({totalOngoing})
                            </h2>
                            <div className="flex gap-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={ongoingPage === 0}
                                    className={`p-1 rounded-full border transition
                                        ${
                                            ongoingPage === 0
                                                ? "bg-gray-100 text-gray-300 border-gray-100 cursor-not-allowed"
                                                : "bg-white border-gray-200 hover:bg-gray-50 text-gray-600"
                                        }`}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={ongoingPage >= maxPage}
                                    className={`p-1 rounded-full border transition
                                        ${
                                            ongoingPage >= maxPage
                                                ? "bg-teal-50 text-teal-200 border-teal-50 cursor-not-allowed"
                                                : "bg-[#33CCB5] text-white border-[#33CCB5] hover:bg-teal-400"
                                        }`}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            {visibleOngoingList &&
                            visibleOngoingList.length > 0 ? (
                                visibleOngoingList.map((event) => (
                                    <EventCard
                                        key={event.event_id}
                                        title={event.event_name}
                                        desc={event.event_description}
                                        date={formatDate(event.event_start)}
                                        location={event.event_location}
                                        slot={`${event.quota} Slot`}
                                        category={event.category}
                                        stats={{
                                            // Statistik pendafar
                                            registered:
                                                (event.total_accepted || 0) +
                                                (event.total_pending || 0) +
                                                (event.total_rejected || 0),
                                            accepted: event.total_accepted || 0,
                                            pending: event.total_pending || 0,
                                        }}
                                    />
                                ))
                            ) : (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 text-gray-400 border border-dashed border-gray-200 rounded-xl">
                                    Tidak ada event aktif saat ini.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Reusable Components
const StatCard = ({ title, value, sub, href }) => {
    const cardContent = (
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col h-44 md:h-48 relative group hover:border-teal-100 transition-colors cursor-pointer">
            <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-semibold text-black line-clamp-2 leading-tight">
                    {title}
                </span>
                <div className="bg-[#C2F0E9] text-[#005D67] p-1 rounded-full group-hover:bg-teal-100 transition shrink-0 ml-2">
                    <ArrowRight size={16} />
                </div>
            </div>
            <div className="mt-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-[#005D67] mb-2">
                    {value}
                </h2>
                <p className="text-xs text-black leading-relaxed line-clamp-2 h-8 flex items-center">
                    {sub}
                </p>
            </div>
        </div>
    );

    if (href && href.startsWith("#")) {
        return (
            <a href={href} className="block">
                {cardContent}
            </a>
        );
    }

    if (href) {
        return (
            <Link href={href} className="block">
                {cardContent}
            </Link>
        );
    }

    return cardContent;
};

const EventCard = ({ title, desc, date, location, slot, stats, category }) => {
    const getCategoryStyle = (cat) => {
        switch (cat) {
            case "Lingkungan":
                return "bg-[#E7F8F1] text-[#00772A]";
            case "Sosial":
                return "bg-[#FEEDE5] text-[#FF7A00]";
            case "Pendidikan":
                return "bg-[#E7F0FF] text-[#07ACE6]";
            case "Kesehatan":
                return "bg-[#E9FBFF] text-[#33CCB5]";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full animate-fade-in">
            <div className="flex gap-2 mb-3">
                <span
                    className={`text-[10px] font-bold px-2 py-1 rounded ${getCategoryStyle(
                        category
                    )}`}
                >
                    {category || "Umum"}
                </span>
                <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">
                    Active
                </span>
            </div>
            <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                {title}
            </h3>
            <p className="text-xs text-black mb-4 line-clamp-2">{desc}</p>

            <div className="space-y-2 mb-4 text-black">
                <div className="flex items-center gap-2 text-xs">
                    <Calendar size={14} className="text-[#005D67]" /> {date}
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <MapPin size={14} className="text-[#005D67]" /> {location}
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <Users size={14} className="text-[#005D67]" /> {slot}
                </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-4">
                <p className="text-[10px] text-gray-400 font-semibold mb-2">
                    Statistik Pendaftar
                </p>

                <div className="grid grid-cols-[20px_35px_1fr] gap-y-2 items-center text-xs text-black">
                    <Users size={14} className="text-[#005D67]" />
                    <span className="font-bold">{stats.registered}</span>
                    <span>Pendaftar</span>

                    <FileCheck size={14} className="text-[#005D67]" />
                    <span className="font-bold">{stats.accepted}</span>
                    <span>Diterima</span>

                    <CircleEllipsis size={14} className="text-[#005D67]" />
                    <span className="font-bold">{stats.pending}</span>
                    <span>Menunggu Approval</span>
                </div>
            </div>

            <Link
                href={route("institute.organize")}
                className="mt-auto block text-center w-full bg-[#005D67] text-white py-2 rounded-lg text-xs font-bold hover:bg-teal-700 transition"
            >
                Manage Event
            </Link>
        </div>
    );
};

export default Institute;
