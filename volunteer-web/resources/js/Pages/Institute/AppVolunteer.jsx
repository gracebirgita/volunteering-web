import React, { useState, useMemo } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, router } from "@inertiajs/react";
import {
    Menu,
    Search,
    ChevronDown,
    ArrowLeft,
    Clock,
    MapPin,
    ChevronLeft,
    ChevronRight,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    X,
    AlertTriangle,
    Layers,
} from "lucide-react";

export default function AppVolunteer({ auth, events = [], categories = []}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filterCategory, setFilterCategory] = useState("");

    // State popup konfirmasi
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalAction, setModalAction] = useState({
        registId: null,
        newStatus: null,
    });

    const selectedEvent = events.find((e) => e.event_id === selectedEventId);

    

    const currentEventVolunteers = useMemo(() => {
        if (!selectedEvent || !selectedEvent.registrations) return [];

        return selectedEvent.registrations.map((reg) => {
            const user = reg || {};
            const profile = reg.user_profile || {};
           
            const realName =
                profile?.user_name || user.name || `User ID: ${reg.user_id}`;

            return {
                id: reg.registration_id,
                name: realName,
                status: reg.regist_status,
                avatar:
                    profile.profile_photo_url || // di database gaada
                    user.profile_photo_url ||
                    `https://ui-avatars.com/api/?name=${realName}`,
            };
        });
    }, [selectedEvent]);

    const filteredEvents = events.filter((event) => {
        const matchSearch = (event.event_name || "")
            .toLowerCase()
            .includes(searchQuery.toLowerCase());

        const matchCategory = filterCategory
            ? event.category_id === parseInt(filterCategory)
            : true;
        return matchSearch && matchCategory;
    });

    const openStatusModal = (registId, newStatus) => {
        setModalAction({ registId, newStatus });
        setIsModalOpen(true);
    };

    // Update status
    const executeStatusUpdate = () => {
        const { registId, newStatus } = modalAction;
        if (!registId || !newStatus) return;

        router.patch(
            `/institute/applications/${registId}/status`,
            { status: newStatus },
            {
                preserveScroll: true,
                onSuccess: () => {
                    console.log("Status & Kuota diperbarui");
                    router.reload({ preserveScroll: true });
                    closeModal();
                },
                onError: (errors) => {
                    console.error(errors);
                    alert("Gagal mengubah status...");
                    closeModal();
                },
            }
        );
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setModalAction({ registId: null, newStatus: null });
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
            <Head title="Aplikasi Volunteer" />

            {/* Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in">
                    <div
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                        onClick={closeModal}
                    ></div>
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative z-10 transform transition-all scale-100">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[#E6F2F1] text-[#005D67]">
                                <AlertTriangle size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Konfirmasi Perubahan Status
                            </h3>
                            <p className="text-sm text-gray-500 mb-6">
                                Apakah Anda yakin ingin mengubah status relawan
                                ini menjadi{" "}
                                <span className="font-bold text-[#005D67]">
                                    {modalAction.newStatus === "Accepted"
                                        ? "Diterima"
                                        : modalAction.newStatus === "Rejected"
                                        ? "Ditolak"
                                        : "Pending"}
                                </span>
                                ?
                                {modalAction.newStatus === "Accepted" &&
                                    " Kuota event akan berkurang."}
                            </p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={closeModal}
                                    className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-bold hover:bg-gray-50 transition"
                                >
                                    Batal
                                </button>
                                <button
                                    onClick={executeStatusUpdate}
                                    className="flex-1 py-2.5 text-white rounded-lg font-bold transition shadow-sm bg-[#005D67] hover:bg-[#004a52]"
                                >
                                    Ya, Konfirmasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <MyNavbar
                user={auth?.user}
                variant="sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <main className="flex-1 w-full overflow-x-hidden relative z-0">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
                    <span className="font-bold text-[#005D67]">
                        VolunteerHub
                    </span>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600"
                    >
                        <Menu size={24} />
                    </button>
                </div>

                <div className="p-4 pt-6 md:p-8">
                    {selectedEvent ? (
                        <VolunteerDetailView
                            event={selectedEvent}
                            volunteers={currentEventVolunteers}
                            onBack={() => setSelectedEventId(null)}
                            onUpdateStatus={openStatusModal}
                        />
                    ) : (
                        <EventListView
                            events={filteredEvents}
                            categories = {categories}
                            onSelectEvent={(ev) =>
                                setSelectedEventId(ev.event_id)
                            }
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                            filterCategory={filterCategory}
                            setFilterCategory={setFilterCategory}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

const EventListView = ({
    events,
    categories,
    onSelectEvent,
    searchQuery,
    setSearchQuery,
    filterCategory,
    setFilterCategory,
}) => {
    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-black mb-1">
                    Aplikasi Volunteer - Event List
                </h1>
                <p className="text-sm text-gray-500">
                    Pusat Review Aplikasi: Kelola Pendaftar dan Prioritaskan
                    Event yang Membutuhkan Keputusan Segera
                </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center shadow-sm">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Cari Event"
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-[#005D67] bg-white placeholder:text-gray-400"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search
                        className="absolute left-3 top-3 text-gray-400"
                        size={20}
                    />
                </div>
                <div className="flex gap-4 w-full md:w-auto">
                    <div className="relative w-full md:w-40">
                        <select
                            className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 focus:ring-1 focus:ring-[#005D67] bg-white cursor-pointer"
                            value={filterCategory}
                            onChange={(e) => setFilterCategory(e.target.value)}
                        >
                            <option value="">Kategori Event</option>
                            {categories.map((cat) => (
                                <option key={cat.category_id} value={cat.category_id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
                            size={16}
                        />
                    </div>
                </div>
            </div>

            {events.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                    Tidak ada event yang cocok dengan filter.
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => {
                        const status =
                            event.quota > 0 ? "Active" : "Closed";

                        const categoryName = event.category?.name || "Umum";
                        const categoryColor = event.category?.color || "#6b7280"; // Default gray
                        
                        const imageSrc = event.thumbnail
                            ? `/storage/${event.thumbnail}`
                            : "/assets/landing-page/event3.png";

                        const categoryBadgeStyle = {
                            backgroundColor: `${categoryColor}1A`, // 10% Opacity
                            color: categoryColor,
                        };

                        return (
                            <div
                                key={event.event_id}
                                className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition duration-200"
                            >
                                <div className="h-56 bg-gray-200 relative">
                                    <img
                                        src={imageSrc}
                                        alt={event.event_name}
                                        className="w-full h-full object-cover"
                                    />
                                    <span
                                        className={`absolute top-3 right-3 text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm ${
                                            status === "Active"
                                                ? "bg-green-600 text-white"
                                                : "bg-red-600 text-white"
                                        }`}
                                    >
                                        {status}
                                    </span>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <div className="mb-3">
                                        <span
                                            style={categoryBadgeStyle}
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                                        >
                                            {categoryName}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-black text-sm mb-2 line-clamp-1">
                                        {event.event_name}
                                    </h3>
                                    <p className="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">
                                        {event.event_description ||
                                            "Tidak ada deskripsi"}
                                    </p>

                                    <div className="mt-auto space-y-2 mb-4 border-t border-gray-50 pt-3">
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Clock size={14} />{" "}
                                            {event.event_start}
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <MapPin size={14} />{" "}
                                            {event.event_location
                                                ? event.event_location.substring(
                                                      0,
                                                      25
                                                  ) + "..."
                                                : "-"}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => onSelectEvent(event)}
                                        className="w-full bg-[#33CCB5] hover:bg-teal-400 text-black py-2.5 rounded-lg text-xs font-bold transition shadow-sm"
                                    >
                                        Atur Volunteer
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const VolunteerDetailView = ({ event, volunteers, onBack, onUpdateStatus }) => {
    const [detailSearch, setDetailSearch] = useState("");
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const processedData = useMemo(() => {
        let data = [...volunteers];
        data = data.filter((item) => {
            return item.name.toLowerCase().includes(detailSearch.toLowerCase());
        });
        if (sortConfig.key) {
            data.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === "ascending" ? 1 : -1;
                }
                return 0;
            });
        }
        return data;
    }, [volunteers, detailSearch, sortConfig]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = processedData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(processedData.length / itemsPerPage);

    const requestSort = (key) => {
        let direction = "ascending";
        if (sortConfig.key === key && sortConfig.direction === "ascending") {
            direction = "descending";
        }
        setSortConfig({ key, direction });
    };

    const getSortIcon = (columnKey) => {
        if (sortConfig.key !== columnKey)
            return <ArrowUpDown size={14} className="text-gray-400" />;
        return sortConfig.direction === "ascending" ? (
            <ArrowUp size={14} className="text-[#005D67]" />
        ) : (
            <ArrowDown size={14} className="text-[#005D67]" />
        );
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const nextPage = () =>
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <button
                    onClick={onBack}
                    className="text-gray-400 hover:text-[#005D67] mb-2 flex items-center gap-1 text-md font-bold"
                >
                    <ArrowLeft size={18} /> Kembali ke list
                </button>
                <h1 className="text-2xl font-bold text-black mb-1">
                    Aplikasi Volunteer - {event.event_name}
                </h1>
                <p className="text-sm text-gray-500">
                    Kelola Semua Pendaftar & Alokasikan Tugas untuk Kegiatan
                    Anda
                </p>
                <p className="text-xs mt-1 text-gray-400">
                    Total Pendaftar: {volunteers.length} | Sisa Kuota:{" "}
                    <span className="font-bold text-[#005D67]">
                        {event.quota}
                    </span>
                </p>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center shadow-sm">
                <div className="relative flex-1 w-full">
                    <input
                        type="text"
                        placeholder="Cari Relawan Berdasarkan Nama"
                        className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 text-sm focus:ring-1 focus:ring-[#005D67] bg-white placeholder:text-gray-400 shadow-sm"
                        value={detailSearch}
                        onChange={(e) => {
                            setDetailSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                    <Search
                        className="absolute left-4 top-3.5 text-gray-400"
                        size={18}
                    />
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                <th
                                    className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition select-none"
                                    onClick={() => requestSort("name")}
                                >
                                    <div className="flex items-center gap-2">
                                        Nama Relawan {getSortIcon("name")}
                                    </div>
                                </th>
                                <th
                                    className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition select-none"
                                    onClick={() => requestSort("status")}
                                >
                                    <div className="flex items-center gap-2">
                                        Status {getSortIcon("status")}
                                    </div>
                                </th>
                                <th className="px-6 py-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 text-sm text-black">
                            {currentItems.length > 0 ? (
                                currentItems.map((vol) => (
                                    <tr
                                        key={vol.id}
                                        className="hover:bg-gray-50 transition duration-150"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={vol.avatar}
                                                    alt={vol.name}
                                                    className="w-8 h-8 rounded-full object-cover"
                                                />
                                                <span className="font-semibold text-black">
                                                    {vol.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div
                                                className={`inline-flex items-center gap-2 px-0 py-0 text-xs font-bold
                                                ${
                                                    vol.status === "Accepted"
                                                        ? "text-green-700"
                                                        : vol.status ===
                                                          "Rejected"
                                                        ? "text-red-500"
                                                        : "text-yellow-600"
                                                }`}
                                            >
                                                <span
                                                    className={`w-1.5 h-1.5 rounded-full 
                                                    ${
                                                        vol.status ===
                                                        "Accepted"
                                                            ? "bg-green-700"
                                                            : vol.status ===
                                                              "Rejected"
                                                            ? "bg-red-500"
                                                            : "bg-yellow-500"
                                                    }`}
                                                ></span>
                                                {vol.status === "Accepted"
                                                    ? "Diterima"
                                                    : vol.status === "Rejected"
                                                    ? "Ditolak"
                                                    : "Pending"}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-center gap-2">
                                                {vol.status === "Pending" ? (
                                                    <>
                                                        <button
                                                            disabled={
                                                                event.quota <=
                                                                0
                                                            }
                                                            onClick={() =>
                                                                onUpdateStatus(
                                                                    vol.id,
                                                                    "Accepted"
                                                                )
                                                            }
                                                            className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-[10px] md:text-xs font-bold hover:bg-white hover:border-green-500 hover:text-green-600 transition bg-white disabled:opacity-50 disabled:cursor-not-allowed"
                                                        >
                                                            Accept
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                onUpdateStatus(
                                                                    vol.id,
                                                                    "Rejected"
                                                                )
                                                            }
                                                            className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-[10px] md:text-xs font-bold hover:bg-white hover:border-red-500 hover:text-red-600 transition bg-white"
                                                        >
                                                            Reject
                                                        </button>
                                                    </>
                                                ) : (
                                                    <button
                                                        onClick={() =>
                                                            onUpdateStatus(
                                                                vol.id,
                                                                "Pending"
                                                            )
                                                        }
                                                        className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-500 text-[10px] md:text-xs font-bold hover:bg-gray-100 transition bg-white w-[130px]"
                                                    >
                                                        Ubah Ke Pending
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="3"
                                        className="px-6 py-10 text-center text-gray-500"
                                    >
                                        Tidak ada pendaftar pada event ini.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {processedData.length > 0 && (
                    <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                        <div>
                            Menampilkan {indexOfFirstItem + 1} -{" "}
                            {Math.min(indexOfLastItem, processedData.length)}{" "}
                            dari {processedData.length} data
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={prevPage}
                                disabled={currentPage === 1}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
                                    currentPage === 1
                                        ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <ChevronLeft size={16} />
                            </button>
                            {Array.from(
                                { length: totalPages },
                                (_, i) => i + 1
                            ).map((number) => (
                                <button
                                    key={number}
                                    onClick={() => paginate(number)}
                                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition
                                        ${
                                            currentPage === number
                                                ? "border border-[#005D67] bg-[#005D67] text-white"
                                                : "border border-gray-200 text-gray-500 hover:bg-gray-50"
                                        }`}
                                >
                                    {number}
                                </button>
                            ))}
                            <button
                                onClick={nextPage}
                                disabled={currentPage === totalPages}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
                                    currentPage === totalPages
                                        ? "border-gray-100 text-gray-300 cursor-not-allowed"
                                        : "border-gray-200 text-gray-500 hover:bg-gray-50"
                                }`}
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
