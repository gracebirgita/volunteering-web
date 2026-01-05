import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, useForm } from "@inertiajs/react";
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
    Plus,
    Minus,
    Image as ImageIcon,
    Utensils,
    Award,
    Check,
} from "lucide-react";

export default function MyEvent({ auth, events = [] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // state edit
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [activeTab, setActiveTab] = useState("Informasi");

    // state popup
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // state filtering
    const [searchQuery, setSearchQuery] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    const institute = auth?.user?.institute || {};
    const instituteName =
        institute.institute_name || auth?.user?.name || "Institute";
    const institutePhoto = institute.institute_logo
        ? `/storage/${institute.institute_logo}`
        : "/assets/Dashboard/Institute/who.png";

    const tabs = ["Informasi", "Logistik", "Relawan", "Kontak & Status"];

    const categoryList = [
        {
            name: "Lingkungan",
            icon: Sprout,
            style: "bg-[#E7F8F1] text-[#00772A]",
        },
        {
            name: "Sosial",
            icon: UserRound,
            style: "bg-[#FEEDE5] text-[#FF7A00]",
        },
        {
            name: "Pendidikan",
            icon: GraduationCap,
            style: "bg-[#E7F0FF] text-[#07ACE6]",
        },
        {
            name: "Kesehatan",
            icon: Hospital,
            style: "bg-[#E9FBFF] text-[#33CCB5]",
        },
    ];

    const { data, setData, post, processing, reset, errors } = useForm({
        _method: "PUT",
        event_name: "",
        event_description: "",
        category: "",
        event_start: "",
        event_finish: "",
        event_start_time: "",
        event_end_time: "",
        event_location: "",
        address: "",
        event_quota: 0,
        registration_deadline: "",
        benefit_consumption: false,
        benefit_certificate: false,
        benefit_jam_volunt: false,
        other_benefit: "",
        contact_person: "",
        group_link: "",
        event_status: "active",
        thumbnail: null,
    });

    const handleEditClick = (event) => {
        setSelectedEventId(event.event_id);
        setActiveTab("Informasi");

        setData({
            _method: "PUT",
            event_name: event.event_name || "",
            event_description: event.event_description || "",
            category: event.category || "Lingkungan",
            event_start: event.event_start || "",
            event_finish: event.event_finish || "",
            event_start_time: event.event_start_time || "",
            event_end_time: event.event_end_time || "",
            event_location: event.event_location || "",
            address: event.address || "",
            event_quota: event.event_quota || 0,
            registration_deadline: event.registration_deadline || "",
            benefit_consumption: !!event.benefit_consumption,
            benefit_certificate: !!event.benefit_certificate,
            benefit_jam_volunt: !!event.benefit_jam_volunt,
            other_benefit: event.other_benefit || "",
            contact_person: event.contact_person || "",
            group_link: event.group_link || "",
            event_status: event.event_status || "active",
            thumbnail: null,
        });
        setIsEditModalOpen(true);
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        post(route("institute.events.update", selectedEventId), {
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                setShowSuccessModal(true);
                reset();
            },
        });
    };

    const handleNext = (e) => {
        e.preventDefault();
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
        }
    };

    const handleFileChange = (e) => {
        setData("thumbnail", e.target.files[0]);
    };

    // Filtering
    const filteredEvents = events.filter((event) => {
        const matchSearch = (event.event_name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory
            ? event.category === selectedCategory
            : true;

        let matchDate = true;
        if (selectedDate) {
            matchDate = event.event_start === selectedDate;
        }

        const matchLocation = (event.event_location || "")
            .toLowerCase()
            .includes(searchLocation.toLowerCase());

        return matchSearch && matchCategory && matchDate && matchLocation;
    });

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

    const getCategoryIcon = (cat) => {
        switch (cat) {
            case "Lingkungan":
                return <Sprout size={14} />;
            case "Sosial":
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

            {/* popup sukses edit */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in px-4">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center transform transition-all scale-100">
                        <div className="w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Check
                                size={40}
                                strokeWidth={4}
                                className="text-white"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            Success
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            “Event berhasil diperbarui!”
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-[#005D67] hover:bg-[#235353] text-white font-bold py-3 rounded-lg shadow-md transition-colors"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            )}

            <MyNavbar
                user={auth?.user}
                variant="sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className="flex-1 w-full overflow-x-hidden">
                {/* Mobile Header */}
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
                        {/* Search bar */}
                        <div className="relative w-full md:max-w-xl">
                            <input
                                type="text"
                                placeholder="Cari Event Anda"
                                className="w-full pl-10 pr-10 py-3 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#005D67] text-sm"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search
                                className="absolute left-3 top-3 text-gray-400"
                                size={20}
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-3 top-3 text-gray-400 hover:text-red-500 transition"
                                >
                                    <X size={18} />
                                </button>
                            )}
                        </div>

                        {/* Header */}
                        <div className="hidden md:flex justify-end items-center gap-4 mb-6">
                            <img
                                src={institutePhoto}
                                alt="Profile"
                                className="w-16 h-16 rounded-full object-cover border border-gray-200"
                            />
                            <span className="text-lg font-semibold text-black">
                                {instituteName}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Event List */}
                        <div className="lg:col-span-3">
                            {filteredEvents.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                                    <p className="mb-2">
                                        Tidak ada event ditemukan.
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSelectedCategory(null);
                                            setSearchQuery("");
                                            setSelectedDate("");
                                            setSearchLocation("");
                                        }}
                                        className="text-[#005D67] font-bold text-sm hover:underline"
                                    >
                                        Reset Semua Filter
                                    </button>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {filteredEvents.map((event, index) => (
                                        <div
                                            key={event.event_id || index}
                                            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition"
                                        >
                                            <div className="h-40 bg-gray-200 relative">
                                                <img
                                                    src={
                                                        event.thumbnail
                                                            ? `/storage/${event.thumbnail}`
                                                            : "/assets/landing-page/event1.png"
                                                    }
                                                    alt={event.event_name}
                                                    className="w-full h-full object-cover"
                                                />
                                                <span
                                                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                        event.event_status ===
                                                        "active"
                                                            ? "bg-green-700 text-white"
                                                            : "bg-red-500 text-white"
                                                    }`}
                                                >
                                                    {event.event_status}
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
                                                    <span className="px-2 py-1 rounded-full bg-[#005D67] text-white text-[10px] font-bold line-clamp-1">
                                                        {instituteName}
                                                    </span>
                                                </div>

                                                <h3 className="font-bold text-black text-sm mb-2 line-clamp-1">
                                                    {event.event_name}
                                                </h3>
                                                <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                                                    {event.event_description}
                                                </p>

                                                <div className="mt-auto space-y-2 mb-4">
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <Clock size={14} />
                                                        {new Date(
                                                            event.event_start
                                                        ).toLocaleDateString(
                                                            "id-ID",
                                                            {
                                                                day: "2-digit",
                                                                month: "2-digit",
                                                                year: "numeric",
                                                            }
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                                        <MapPin size={14} />
                                                        {event.event_location &&
                                                        event.event_location
                                                            .length > 20
                                                            ? event.event_location.substring(
                                                                  0,
                                                                  20
                                                              ) + "..."
                                                            : event.event_location}
                                                    </div>
                                                </div>

                                                <div className="grid gap-2">
                                                    <button
                                                        onClick={() =>
                                                            handleEditClick(
                                                                event
                                                            )
                                                        }
                                                        className="bg-[#33CCB5] hover:bg-teal-400 text-black py-2 rounded-lg text-xs font-bold transition text-center w-full flex items-center justify-center gap-2"
                                                    >
                                                        Edit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sidebar Filter */}
                        <div className="lg:col-span-1 space-y-8">
                            {/* Kategori */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-black flex items-center gap-2">
                                        <LayoutTemplate size={16} /> Kategori
                                    </h3>
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
                                        "Sosial",
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
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-black flex items-center gap-2">
                                        <MapPin size={16} /> Lokasi Event
                                    </h3>
                                    {searchLocation && (
                                        <button
                                            onClick={() =>
                                                setSearchLocation("")
                                            }
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
                                        placeholder="Ketik Lokasi..."
                                        className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
                                        value={searchLocation}
                                        onChange={(e) =>
                                            setSearchLocation(e.target.value)
                                        }
                                    />
                                    <Search
                                        className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                                        size={14}
                                    />
                                </div>
                            </div>

                            {/* Tanggal */}
                            <div>
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-bold text-black flex items-center gap-2">
                                        <Calendar size={16} /> Tanggal Event
                                    </h3>
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
                                        type="date"
                                        className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
                                        value={selectedDate}
                                        onChange={(e) =>
                                            setSelectedDate(e.target.value)
                                        }
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

            {/* Bagian edit */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in duration-200">
                        {/* Header edit */}
                        <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
                            <h2 className="font-bold text-lg text-[#005D67]">
                                Edit Event
                            </h2>
                            <button
                                onClick={() => setIsEditModalOpen(false)}
                                className="hover:text-red-500"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Header */}
                        <div className="bg-white border-b border-gray-200 overflow-x-auto">
                            <div className="flex min-w-max px-4">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-4 text-sm font-bold transition-colors border-b-2 ${
                                            activeTab === tab
                                                ? "border-[#005D67] text-[#005D67]"
                                                : "border-transparent text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Forms */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {/* Informasi */}
                            {activeTab === "Informasi" && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Judul Event:
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                            value={data.event_name}
                                            onChange={(e) =>
                                                setData(
                                                    "event_name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Deskripsi Singkat:
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                            value={data.event_description}
                                            onChange={(e) =>
                                                setData(
                                                    "event_description",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Kategori:
                                        </label>
                                        <div className="flex flex-wrap gap-3">
                                            {categoryList.map((cat) => (
                                                <button
                                                    type="button"
                                                    key={cat.name}
                                                    onClick={() =>
                                                        setData(
                                                            "category",
                                                            cat.name
                                                        )
                                                    }
                                                    className={`px-4 py-2 rounded-full text-xs font-bold transition border flex items-center gap-2 ${
                                                        data.category ===
                                                        cat.name
                                                            ? "ring-2 ring-offset-1 ring-[#005D67] opacity-100"
                                                            : "opacity-60 hover:opacity-100"
                                                    } ${cat.style}`}
                                                >
                                                    <cat.icon
                                                        size={16}
                                                        strokeWidth={2.5}
                                                    />{" "}
                                                    {cat.name}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Gambar Thumbnail:
                                        </label>
                                        <div className="flex items-center gap-4">
                                            <div className="w-48 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden">
                                                {data.thumbnail ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            data.thumbnail
                                                        )}
                                                        alt="New Preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="text-center p-2">
                                                        <ImageIcon
                                                            size={24}
                                                            className="mx-auto mb-1"
                                                        />
                                                        <span className="text-[10px]">
                                                            Gambar Baru
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-2">
                                                <label className="cursor-pointer px-4 py-2 bg-[#005D67] text-white text-xs font-bold rounded-lg hover:bg-teal-700 flex items-center gap-2 w-fit">
                                                    <Plus size={14} /> Ganti
                                                    Gambar
                                                    <input
                                                        type="file"
                                                        className="hidden"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        accept="image/*"
                                                    />
                                                </label>
                                                <span className="text-[10px] text-gray-500 italic">
                                                    *Biarkan kosong jika tidak
                                                    ingin mengubah gambar
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Logistik */}
                            {activeTab === "Logistik" && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Tanggal Pelaksanaan:
                                        </label>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <span className="text-xs text-gray-500 mb-1 block">
                                                    Mulai
                                                </span>
                                                <input
                                                    type="date"
                                                    className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                                    value={data.event_start}
                                                    onChange={(e) =>
                                                        setData(
                                                            "event_start",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <span className="text-xs text-gray-500 mb-1 block">
                                                    Selesai
                                                </span>
                                                <input
                                                    type="date"
                                                    className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                                    value={data.event_finish}
                                                    onChange={(e) =>
                                                        setData(
                                                            "event_finish",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Waktu:
                                        </label>
                                        <div className="flex gap-4">
                                            <div className="w-1/2">
                                                <span className="text-xs text-gray-500 mb-1 block">
                                                    Jam Mulai
                                                </span>
                                                <input
                                                    type="time"
                                                    className="w-full border-gray-300 rounded-lg text-sm"
                                                    value={
                                                        data.event_start_time
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "event_start_time",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="w-1/2">
                                                <span className="text-xs text-gray-500 mb-1 block">
                                                    Jam Selesai
                                                </span>
                                                <input
                                                    type="time"
                                                    className="w-full border-gray-300 rounded-lg text-sm"
                                                    value={data.event_end_time}
                                                    onChange={(e) =>
                                                        setData(
                                                            "event_end_time",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Lokasi:
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                            value={data.event_location}
                                            onChange={(e) =>
                                                setData(
                                                    "event_location",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Alamat Lengkap:
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Relawan */}
                            {activeTab === "Relawan" && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">
                                                Target Relawan:
                                            </label>
                                            <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "event_quota",
                                                            Math.max(
                                                                0,
                                                                parseInt(
                                                                    data.event_quota
                                                                ) - 1
                                                            )
                                                        )
                                                    }
                                                    className="px-3 py-2 hover:bg-gray-100 border-r border-gray-300 text-gray-500"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <input
                                                    type="text"
                                                    className="w-20 text-center border-none focus:ring-0 text-sm text-gray-600 placeholder:text-gray-400"
                                                    value={data.event_quota}
                                                    readOnly
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setData(
                                                            "event_quota",
                                                            parseInt(
                                                                data.event_quota
                                                            ) + 1
                                                        )
                                                    }
                                                    className="px-3 py-2 hover:bg-gray-100 border-l border-gray-300 text-gray-500"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-2">
                                                Deadline Daftar:
                                            </label>
                                            <input
                                                type="date"
                                                className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                                value={
                                                    data.registration_deadline
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "registration_deadline",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-800 mb-3">
                                            Benefit Relawan:
                                        </label>
                                        <div className="space-y-3">
                                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        data.benefit_consumption
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "benefit_consumption",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded border-gray-300 text-[#005D67] focus:ring-[#005D67]"
                                                />
                                                <span className="flex items-center gap-2 text-sm text-black">
                                                    <Utensils
                                                        size={16}
                                                        className="text-gray-500"
                                                    />{" "}
                                                    Konsumsi
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        data.benefit_certificate
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "benefit_certificate",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded border-gray-300 text-[#005D67] focus:ring-[#005D67]"
                                                />
                                                <span className="flex items-center gap-2 text-sm text-black">
                                                    <Award
                                                        size={16}
                                                        className="text-gray-500"
                                                    />{" "}
                                                    Sertifikat
                                                </span>
                                            </label>
                                            <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                                <input
                                                    type="checkbox"
                                                    checked={
                                                        data.benefit_jam_volunt
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "benefit_jam_volunt",
                                                            e.target.checked
                                                        )
                                                    }
                                                    className="rounded border-gray-300 text-[#005D67] focus:ring-[#005D67]"
                                                />
                                                <span className="flex items-center gap-2 text-sm text-black">
                                                    <Clock
                                                        size={16}
                                                        className="text-gray-500"
                                                    />{" "}
                                                    Jam Volunteer
                                                </span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="mt-6">
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Benefit Lainnya:
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                            value={data.other_benefit}
                                            onChange={(e) =>
                                                setData(
                                                    "other_benefit",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Kontak & Status */}
                            {activeTab === "Kontak & Status" && (
                                <div className="space-y-6 animate-fade-in">
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Contact Person (WA):
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-lg text-sm placeholder:text-gray-400"
                                            value={data.contact_person}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_person",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Link Group:
                                        </label>
                                        <input
                                            type="text"
                                            className="w-full border-gray-300 rounded-lg text-sm placeholder:text-gray-400"
                                            value={data.group_link}
                                            onChange={(e) =>
                                                setData(
                                                    "group_link",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-black mb-2">
                                            Status Event:
                                        </label>
                                        <div className="flex gap-3">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "event_status",
                                                        "closed"
                                                    )
                                                }
                                                className={`px-6 py-2 rounded-full text-sm font-bold border transition ${
                                                    data.event_status ===
                                                    "closed"
                                                        ? "bg-red-500 text-white border-red-500"
                                                        : "bg-white text-gray-500 border-gray-300 hover:border-red-500 hover:text-red-500"
                                                }`}
                                            >
                                                Closed
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "event_status",
                                                        "active"
                                                    )
                                                }
                                                className={`px-6 py-2 rounded-full text-sm font-bold border transition ${
                                                    data.event_status ===
                                                    "active"
                                                        ? "bg-green-700 text-white border-green-700"
                                                        : "bg-white text-gray-500 border-gray-300 hover:border-green-700 hover:text-green-700"
                                                }`}
                                            >
                                                Active
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer edit */}
                        <div className="p-6 border-t bg-gray-50 flex gap-3 rounded-b-2xl">
                            <button
                                type="button"
                                onClick={() => setIsEditModalOpen(false)}
                                className="py-3 px-6 border border-gray-300 bg-white rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-100 transition"
                            >
                                Batal
                            </button>

                            {activeTab === "Kontak & Status" ? (
                                <button
                                    onClick={handleUpdate}
                                    disabled={processing}
                                    className="flex-1 bg-[#005D67] hover:bg-teal-800 text-white py-3 rounded-lg text-sm font-bold shadow-sm transition disabled:opacity-50"
                                >
                                    {processing
                                        ? "Menyimpan..."
                                        : "Simpan Perubahan"}
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="flex-1 bg-[#005D67] hover:bg-teal-800 text-white py-3 rounded-lg text-sm font-bold shadow-sm transition"
                                >
                                    Tahap Selanjutnya
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
