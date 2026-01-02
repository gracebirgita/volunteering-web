import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import {
    Menu,
    Search,
    MapPin,
    Calendar,
    Clock,
    LayoutTemplate,
    Sprout,
    UserRound,
    GraduationCap,
    Hospital,
    X,
} from "lucide-react";

export default function MyEvent({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // state category
    const [selectedCategory, setSelectedCategory] = useState(null);

    // state tanggal
    const [selectedDate, setSelectedDate] = useState("");

    // Data sementara (mockup)
    const events = [
        {
            id: 1,
            title: "Aksi Bersih Pantai Balekambang",
            desc: "Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem pantai tetap lestari.",
            date: "28-12-2025",
            location: "Posko Komunitas RW 03",
            category: "Lingkungan",
            org: "WHO Group",
            status: "Active",
            image: "/assets/landing-page/event3.png",
        },
        {
            id: 2,
            title: "Kelas Ceria Membaca dan ...",
            desc: "Mengajar anak-anak membaca sambil bermain untuk meningkatkan minat literasi sejak dini.",
            date: "28-12-2025",
            location: "Posko Komunitas RW 03",
            category: "Pendidikan",
            org: "WHO Group",
            status: "Closed",
            image: "/assets/landing-page/event2.png",
        },
        {
            id: 3,
            title: "Dapur Umum untuk Warga ...",
            desc: "Masak dan membagikan makanan hangat untuk keluarga yang membutuhkan di area pemukiman.",
            date: "28-12-2025",
            location: "Posko Komunitas RW 03",
            category: "Social",
            org: "WHO Group",
            status: "Closed",
            image: "/assets/landing-page/event1.png",
        },
        {
            id: 4,
            title: "Aksi Bersih Pantai Balekambang",
            desc: "Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem pantai tetap lestari.",
            date: "28-01-2025",
            location: "Posko Komunitas RW 03",
            category: "Lingkungan",
            org: "WHO Group",
            status: "Active",
            image: "/assets/landing-page/event3.png",
        },
        {
            id: 5,
            title: "Kelas Ceria Membaca dan ...",
            desc: "Mengajar anak-anak membaca sambil bermain untuk meningkatkan minat literasi sejak dini.",
            date: "28-01-2025",
            location: "Posko Komunitas RW 03",
            category: "Pendidikan",
            org: "WHO Group",
            status: "Closed",
            image: "/assets/landing-page/event2.png",
        },
        {
            id: 6,
            title: "Dapur Umum untuk Warga ...",
            desc: "Masak dan membagikan makanan hangat untuk keluarga yang membutuhkan di area pemukiman.",
            date: "28-11-2025",
            location: "Posko Komunitas RW 03",
            category: "Social",
            org: "WHO Group",
            status: "Closed",
            image: "/assets/landing-page/event1.png",
        },
    ];

    // filtering
    const filteredEvents = events.filter((event) => {
        // Filter Search
        const matchSearch = event.title
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        // Filter Kategori
        const matchCategory = selectedCategory
            ? event.category === selectedCategory
            : true;

        // Filter Tanggal
        let matchDate = true;
        if (selectedDate) {
            // ganti format
            const [day, month, year] = event.date.split("-");
            const formattedEventDate = `${year}-${month}-${day}`;

            matchDate = formattedEventDate === selectedDate;
        }

        return matchSearch && matchCategory && matchDate;
    });

    const getCategoryStyle = (cat) => {
        switch (cat) {
            case "Lingkungan":
                return "bg-[#E7F8F1] text-[#00772A]";
            case "Social":
                return "bg-[#FEEDE5] text-[#FF7A00]";
            case "Pendidikan":
                return "bg-[#E7F0FF] text-[#07ACE6]";
            case "Kesehatan":
                return "bg-[#E9FBFF] text-[#33CCB5]";
            default:
                return "bg-gray-100 text-gray-600";
        }
    };

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case "Lingkungan":
                return <Sprout size={14} />;
            case "Social":
                return <UserRound size={14} />;
            case "Pendidikan":
                return <GraduationCap size={14} />;
            case "Kesehatan":
                return <Hospital size={14} />;
            default:
                return <Sprout size={14} />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
            <Head title="Atur Event - Institute" />

            <MyNavbar
                user={auth?.user}
                variant="sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className="flex-1 w-full overflow-x-hidden">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#005D67]">
                            VolunteerHub
                        </span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="p-4 pt-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                        <div className="relative w-full md:max-w-xl">
                            <input
                                type="text"
                                placeholder="Cari Event Anda"
                                className="w-full pl-10 pr-4 py-3 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#005D67] text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />
                        </div>

                        <div className="hidden md:flex justify-end items-center gap-4 mb-6">
                            <img
                                src={
                                    auth?.user?.profile_photo_url ||
                                    "/assets/Dashboard/Institute/who.png"
                                }
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-lg font-semibold text-black">
                                WHO Group
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-3">
                            {/* kalau filter gaada */}
                            {filteredEvents.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                                    <p className="mb-2">
                                        Tidak ada event ditemukan.
                                    </p>
                                    <button
                                        // Reset filter
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setSearchQuery("");
                                            setSelectedDate("");
                                        }}
                                        className="text-[#005D67] font-bold text-sm hover:underline"
                                    >
                                        Reset Filter
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredEvents.map((event) => (
                                        <div
                                            key={event.id}
                                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition"
                                        >
                                            <div className="h-40 bg-gray-200 relative">
                                                <img
                                                    src={event.image}
                                                    alt={event.title}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span
                                                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                        event.status ===
                                                        "Active"
                                                            ? "bg-green-700 text-white"
                                                            : "bg-red-500 text-white"
                                                    }`}
                                                >
                                                    {event.status}
                                                </span>
                                            </div>

                                            <div className="p-4 flex flex-col flex-1">
                                                <div className="flex gap-2 mb-3">
                                                    <span
                                                        className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${getCategoryStyle(
                                                            event.category
                                                        )}`}
                                                    >
                                                        {getCategoryIcon(
                                                            event.category
                                                        )}{" "}
                                                        {event.category}
                                                    </span>
                                                    <span className="px-2 py-1 rounded-full bg-[#005D67] text-white text-[10px] font-bold">
                                                        {event.org}
                                                    </span>
                                                </div>

                                                <h3 className="font-bold text-black text-sm mb-2 line-clamp-1">
                                                    {event.title}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                                                    {event.desc}
                                                </p>

                                                <div className="mt-auto space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Clock size={14} />{" "}
                                                        {event.date}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <MapPin size={14} />{" "}
                                                        {event.location.substring(
                                                            0,
                                                            20
                                                        )}
                                                        ...
                                                    </div>
                                                </div>

                                                <div className="grid gap-2">
                                                    <button className="bg-[#33CCB5] hover:bg-teal-400 text-black py-2 rounded-lg text-xs font-bold transition">
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* RIGHT */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Kategori Filter */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-black flex items-center gap-2">
                                        <LayoutTemplate size={16} /> Kategori
                                    </h3>
                                    {/* Reset kategori */}
                                    {selectedCategory && (
                                        <button
                                            onClick={() =>
                                                setSelectedCategory(null)
                                            }
                                            className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
                                        >
                                            <X size={12} className="mr-1" />{" "}
                                            Reset
                                        </button>
                                    )}
                                </div>

                                <div className="space-y-3">
                                    {[
                                        "Lingkungan",
                                        "Social",
                                        "Pendidikan",
                                        "Kesehatan",
                                    ].map((cat, idx) => {
                                        const isSelected =
                                            selectedCategory === cat;
                                        return (
                                            <button
                                                key={idx}
                                                onClick={() =>
                                                    setSelectedCategory(
                                                        isSelected ? null : cat
                                                    )
                                                }
                                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-xs font-bold transition border-2 
                                                    ${
                                                        isSelected
                                                            ? `border-[#005D67] opacity-100 ${getCategoryStyle(
                                                                  cat
                                                              )}`
                                                            : `border-transparent hover:opacity-80 ${getCategoryStyle(
                                                                  cat
                                                              )}`
                                                    }`}
                                            >
                                                {getCategoryIcon(cat)} {cat}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Lokasi */}
                            <div>
                                <h3 className="font-bold text-black mb-4 flex items-center gap-2">
                                    <MapPin size={16} /> Lokasi Event
                                </h3>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Ketik Lokasi"
                                        className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
                                    />
                                </div>
                            </div>

                            {/* Tanggal */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-black flex items-center gap-2">
                                        <Calendar size={16} /> Tanggal Event
                                    </h3>
                                    {/* Reset tanggal */}
                                    {selectedDate && (
                                        <button
                                            onClick={() => setSelectedDate("")}
                                            className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
                                        >
                                            <X size={12} className="mr-1" />{" "}
                                            Reset
                                        </button>
                                    )}
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tentukan Tanggal"
                                        onFocus={(e) =>
                                            (e.target.type = "date")
                                        }
                                        onBlur={(e) => (e.target.type = "text")}
                                        className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400 [&::-webkit-calendar-picker-indicator]:opacity-0"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                        }
                                    />
                                    <Calendar
                                        className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                                        size={16}
                                    />
                                </div>
                            </div>

                            <div className="w-full flex justify-center pt-10">
                                <img
                                    src="/assets/Dashboard/Institute/image1.png"
                                    alt="image"
                                    className="w-48 object-contain"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
