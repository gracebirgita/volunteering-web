import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import {
    SquarePlus,
    CalendarDays,
    Users,
    MapPin,
    FileCheck,
    ChevronRight,
    ChevronLeft,
    ArrowRight,
    CircleEllipsis,
    Menu,
} from "lucide-react";

const Institute = ({ auth }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Institute Dashboard" />

            <MyNavbar
                user={auth?.user}
                variant="sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full overflow-x-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold">
                            <img
                                src="/assets/logo-color.png"
                                alt="VH"
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
                                src={
                                    auth?.user?.profile_photo_url ||
                                    "/assets/Dashboard/Institute/who.png"
                                }
                                alt="Institute Logo"
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-lg font-semibold text-black">
                                {auth?.user?.name || "Institute"}
                            </span>
                        </div>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                            <div>
                                <h1 className="text-xl md:text-2xl font-bold text-gray-900">
                                    Selamat Datang Kembali,{" "}
                                    {auth?.user?.name || "Institute"}
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
                                    <SquarePlus size={16} /> <span className="hidden sm:inline">Create</span> Event
                                </Link>

                                <Link
                                    href={route("institute.organize")}
                                    className="flex-1 md:flex-none justify-center flex items-center gap-2 bg-[#C2F0E9] text-[#005D67] px-4 py-2 rounded-lg text-sm font-medium hover:bg-teal-100 transition border border-teal-200"
                                >
                                    <CalendarDays size={16} /> <span className="hidden sm:inline">Lihat</span> Event
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-10">
                        <StatCard
                            title="Lihat Semua Event"
                            value="38"
                            sub="Jumlah Event Yang Dibuat Organisasi Anda"
                        />
                        <StatCard
                            title="Lihat Event Aktif"
                            value="2"
                            sub="Event Aktif yang Anda pernah buat"
                        />
                        <StatCard
                            title="Atur Relawan"
                            value="612"
                            sub="Jumlah Relawan Terlibat dengan Organisasi Anda"
                        />
                        <StatCard
                            title="Atur Relawan"
                            value="23"
                            sub="Pendaftar Menunggu Persetujuan"
                        />
                    </div>

                    {/* Lower Section Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Active Events */}
                        <div className="col-span-1 lg:col-span-8">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-base md:text-lg font-bold text-gray-800">
                                    Pantau Event Aktif Anda
                                </h2>
                                <div className="flex gap-2">
                                    <button className="p-1 rounded-full bg-white border border-gray-200 hover:bg-gray-50">
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button className="p-1 rounded-full bg-[#33CCB5] text-white border border-[#33CCB5] hover:bg-teal-400">
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Responsive Event Cards Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <EventCard
                                    title="Aksi Bersih Pantai Balekambang"
                                    desc="Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem."
                                    date="15 Desember 2025"
                                    location="Pantai Balekambang Dusun Sumber..."
                                    slot="100 Slot"
                                    stats={{
                                        registered: 128,
                                        accepted: 80,
                                        pending: 48,
                                    }}
                                />
                                <EventCard
                                    title="Aksi Amal Panti Werdha"
                                    desc="Bergabung untuk membantu yang membutuhkan."
                                    date="12 Januari 2026"
                                    location="Panti Asuhan Werdha, Jl.Sudirman..."
                                    slot="50 Slot"
                                    stats={{
                                        registered: 70,
                                        accepted: 40,
                                        pending: 30,
                                    }}
                                />
                            </div>
                        </div>

                        {/* Applicants */}
                        <div className="col-span-1 lg:col-span-4 bg-white p-6 rounded-xl border border-gray-100 shadow-sm h-fit">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                                Applicants Today
                            </h3>
                            <p className="text-sm text-gray-400 mb-6">
                                5 pendaftar hari ini
                            </p>

                            <div className="space-y-6">
                                <ApplicantItem
                                    name="Adi Nugroho"
                                    event="Aksi Bersih Pantai Balekambang"
                                    imgUrl="/assets/Dashboard/Institute/applicant.png"
                                />
                                <ApplicantItem
                                    name="Fala Sogeng"
                                    event="Aksi Amal Panti Werdha"
                                    imgUrl="/assets/Dashboard/Institute/applicant.png"
                                />
                                <ApplicantItem
                                    name="Wedok Yuno"
                                    event="Aksi Bersih Pantai Balekambang"
                                    imgUrl="/assets/Dashboard/Institute/applicant.png"
                                />
                                <ApplicantItem
                                    name="Lala Susanto"
                                    event="Aksi Amal Panti Werdha"
                                    imgUrl="/assets/Dashboard/Institute/applicant.png"
                                />
                                <ApplicantItem
                                    name="Adi Nugroho"
                                    event="Aksi Bersih Pantai Balekambang"
                                    imgUrl="/assets/Dashboard/Institute/applicant.png"
                                />
                            </div>

                            <Link
                                href={route("institute.appvol")}
                                className="block w-full text-center mt-6 bg-[#005D67] text-white py-2 rounded-lg text-sm font-semibold hover:bg-teal-700 transition"
                            >
                                Atur Volunteer
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Reusable Components
const StatCard = ({ title, value, sub }) => (
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

const EventCard = ({ title, desc, date, location, slot, stats }) => (
    <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col h-full">
        <div className="flex gap-2 mb-3">
            <span className="bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded">
                Lingkungan
            </span>
            <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded">
                Active
            </span>
        </div>
        <h3 className="font-bold text-gray-900 mb-2 text-sm md:text-base">{title}</h3>
        <p className="text-xs text-black mb-4 line-clamp-2">{desc}</p>

        <div className="space-y-2 mb-4 text-black">
            <div className="flex items-center gap-2 text-xs">
                <CalendarDays size={14} className="text-[#005D67]" /> {date}
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

        <Link href={route('institute.organize')} className="mt-auto block text-center w-full bg-[#005D67] text-white py-2 rounded-lg text-xs font-bold hover:bg-teal-700 transition">
            Manage Event
        </Link>
    </div>
);

const ApplicantItem = ({ name, event, imgUrl }) => (
    <div className="flex justify-between items-center border-b border-gray-50 pb-2 last:border-0 last:pb-0">
        <div className="flex items-center gap-3">
            <img
                src={imgUrl}
                alt={name}
                className="w-8 h-8 rounded-full object-cover"
            />
            <div>
                <p className="text-xs font-bold text-black">{name}</p>
                <p className="text-[10px] text-black line-clamp-1 max-w-[120px]">
                    {event}
                </p>
            </div>
        </div>
        <span className="text-[10px] font-semibold text-black">Pending</span>
    </div>
);

export default Institute;
