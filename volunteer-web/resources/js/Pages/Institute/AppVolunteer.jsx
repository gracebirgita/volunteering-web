// import React, { useState, useMemo } from "react";
// import MyNavbar from "@/Components/Navbar";
// import { Head } from "@inertiajs/react";
// import {
//     Menu,
//     Search,
//     ChevronDown,
//     ArrowLeft,
//     Clock,
//     Sprout,
//     GraduationCap,
//     UserRound,
//     Hospital,
//     MapPin,
//     ChevronLeft,
//     ChevronRight,
//     ArrowUpDown,
//     ArrowUp,
//     ArrowDown,
// } from "lucide-react";

// export default function AppVolunteer({ auth }) {
//     const [sidebarOpen, setSidebarOpen] = useState(false);

//     const [selectedEvent, setSelectedEvent] = useState(null);

//     // state filtering
//     const [searchQuery, setSearchQuery] = useState("");
//     const [filterStatus, setFilterStatus] = useState("");
//     const [filterCategory, setFilterCategory] = useState("");

//     // Data sementara (mockup)
//     const events = [
//         {
//             id: 1,
//             title: "Aksi Bersih Pantai Balekambang",
//             desc: "Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem pantai tetap lestari.",
//             date: "28-12-2025",
//             location: "Posko Komunitas RW 03",
//             category: "Lingkungan",
//             org: "WHO Group",
//             status: "Active",
//             image: "/assets/landing-page/event3.png",
//         },
//         {
//             id: 2,
//             title: "Kelas Ceria Membaca dan ...",
//             desc: "Mengajar anak-anak membaca sambil bermain untuk meningkatkan minat literasi sejak dini.",
//             date: "28-12-2025",
//             location: "Posko Komunitas RW 03",
//             category: "Pendidikan",
//             org: "WHO Group",
//             status: "Closed",
//             image: "/assets/landing-page/event2.png",
//         },
//         {
//             id: 3,
//             title: "Dapur Umum untuk Warga ...",
//             desc: "Masak dan membagikan makanan hangat untuk keluarga yang membutuhkan di area pemukiman.",
//             date: "28-12-2025",
//             location: "Posko Komunitas RW 03",
//             category: "Social",
//             org: "WHO Group",
//             status: "Closed",
//             image: "/assets/landing-page/event1.png",
//         },
//         {
//             id: 4,
//             title: "Aksi Bersih Pantai Balekambang",
//             desc: "Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem pantai tetap lestari.",
//             date: "28-01-2025",
//             location: "Posko Komunitas RW 03",
//             category: "Lingkungan",
//             org: "WHO Group",
//             status: "Active",
//             image: "/assets/landing-page/event3.png",
//         },
//         {
//             id: 5,
//             title: "Kelas Ceria Membaca dan ...",
//             desc: "Mengajar anak-anak membaca sambil bermain untuk meningkatkan minat literasi sejak dini.",
//             date: "28-01-2025",
//             location: "Posko Komunitas RW 03",
//             category: "Pendidikan",
//             org: "WHO Group",
//             status: "Closed",
//             image: "/assets/landing-page/event2.png",
//         },
//         {
//             id: 6,
//             title: "Dapur Umum untuk Warga ...",
//             desc: "Masak dan membagikan makanan hangat untuk keluarga yang membutuhkan di area pemukiman.",
//             date: "28-11-2025",
//             location: "Posko Komunitas RW 03",
//             category: "Social",
//             org: "WHO Group",
//             status: "Closed",
//             image: "/assets/landing-page/event1.png",
//         },
//     ];

//     // Filter Logic untuk Event List
//     const filteredEvents = events.filter((event) => {
//         const matchSearch = event.title
//             .toLowerCase()
//             .includes(searchQuery.toLowerCase());
//         const matchStatus = filterStatus ? event.status === filterStatus : true;
//         const matchCategory = filterCategory
//             ? event.category === filterCategory
//             : true;
//         return matchSearch && matchStatus && matchCategory;
//     });

//     // mockup volunteer tiap event
//     const initialVolunteers = [
//         {
//             id: 1,
//             eventId: 1,
//             name: "Nisha Kumari",
//             div: "Divisi Logistik",
//             status: "Diterima",
//             avatar: "https://i.pravatar.cc/150?u=1",
//         },
//         {
//             id: 2,
//             eventId: 1,
//             name: "Sophia",
//             div: "Divisi Publikasi",
//             status: "Ditolak",
//             avatar: "https://i.pravatar.cc/150?u=2",
//         },
//         {
//             id: 3,
//             eventId: 1,
//             name: "Rudra Pratap",
//             div: "Divisi Lapangan",
//             status: "Pending",
//             avatar: "https://i.pravatar.cc/150?u=3",
//         },
//         {
//             id: 4,
//             eventId: 1,
//             name: "Trisha Norton",
//             div: "Divisi Edukasi",
//             status: "Pending",
//             avatar: "https://i.pravatar.cc/150?u=4",
//         },

//         {
//             id: 5,
//             eventId: 2,
//             name: "Jolene Orr",
//             div: "Divisi Edukasi",
//             status: "Ditolak",
//             avatar: "https://i.pravatar.cc/150?u=5",
//         },
//         {
//             id: 6,
//             eventId: 2,
//             name: "Aryan Roy",
//             div: "Divisi Lapangan",
//             status: "Diterima",
//             avatar: "https://i.pravatar.cc/150?u=6",
//         },
//         {
//             id: 7,
//             eventId: 2,
//             name: "Elvin Bond",
//             div: "Divisi Publikasi",
//             status: "Diterima",
//             avatar: "https://i.pravatar.cc/150?u=7",
//         },

//         {
//             id: 8,
//             eventId: 3,
//             name: "Huzaifa Anas",
//             div: "Divisi Logistik",
//             status: "Diterima",
//             avatar: "https://i.pravatar.cc/150?u=8",
//         },
//         {
//             id: 9,
//             eventId: 3,
//             name: "Budi Santoso",
//             div: "Divisi Lapangan",
//             status: "Pending",
//             avatar: "https://i.pravatar.cc/150?u=9",
//         },
//     ];

//     const [volunteers, setVolunteers] = useState(initialVolunteers);

//     // Update status
//     const updateStatus = (id, newStatus) => {
//         setVolunteers(
//             volunteers.map((vol) =>
//                 vol.id === id ? { ...vol, status: newStatus } : vol
//             )
//         );
//     };

//     const currentEventVolunteers = selectedEvent
//         ? volunteers.filter((vol) => vol.eventId === selectedEvent.id)
//         : [];

//     return (
//         <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
//             <Head title="Aplikasi Volunteer" />

//             <MyNavbar
//                 user={auth?.user}
//                 variant="sidebar"
//                 isOpen={sidebarOpen}
//                 setIsOpen={setSidebarOpen}
//             />

//             <main className="flex-1 w-full overflow-x-hidden">
//                 <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
//                     <span className="font-bold text-[#005D67]">
//                         VolunteerHub
//                     </span>
//                     <button
//                         onClick={() => setSidebarOpen(true)}
//                         className="text-gray-600"
//                     >
//                         <Menu size={24} />
//                     </button>
//                 </div>

//                 <div className="p-4 pt-6 md:p-8">
//                     {selectedEvent ? (
//                         <VolunteerDetailView
//                             event={selectedEvent}
//                             volunteers={currentEventVolunteers}
//                             onBack={() => setSelectedEvent(null)}
//                             onUpdateStatus={updateStatus}
//                         />
//                     ) : (
//                         <EventListView
//                             events={filteredEvents}
//                             onSelectEvent={setSelectedEvent}
//                             searchQuery={searchQuery}
//                             setSearchQuery={setSearchQuery}
//                             filterStatus={filterStatus}
//                             setFilterStatus={setFilterStatus}
//                             filterCategory={filterCategory}
//                             setFilterCategory={setFilterCategory}
//                         />
//                     )}
//                 </div>
//             </main>
//         </div>
//     );
// }

// const EventListView = ({
//     events,
//     onSelectEvent,
//     searchQuery,
//     setSearchQuery,
//     filterStatus,
//     setFilterStatus,
//     filterCategory,
//     setFilterCategory,
// }) => {
//     const getCategoryIcon = (cat) => {
//         switch (cat) {
//             case "Lingkungan":
//                 return <Sprout size={12} />;
//             case "Social":
//                 return <UserRound size={12} />;
//             case "Pendidikan":
//                 return <GraduationCap size={12} />;
//             case "Kesehatan":
//                 return <Hospital size={12} />;
//             default:
//                 return <Sprout size={12} />;
//         }
//     };

//     const getCategoryStyle = (cat) => {
//         switch (cat) {
//             case "Lingkungan":
//                 return "bg-[#E7F8F1] text-[#00772A]";
//             case "Social":
//                 return "bg-[#FEEDE5] text-[#FF7A00]";
//             case "Pendidikan":
//                 return "bg-[#E7F0FF] text-[#07ACE6]";
//             case "Kesehatan":
//                 return "bg-[#E9FBFF] text-[#33CCB5]";
//             default:
//                 return "bg-gray-100 text-gray-600";
//         }
//     };

//     return (
//         <div className="animate-fade-in">
//             <div className="mb-6">
//                 <h1 className="text-2xl font-bold text-black mb-1">
//                     Aplikasi Volunteer - Event List
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                     Pusat Review Aplikasi: Kelola Pendaftar dan Prioritaskan
//                     Event yang Membutuhkan Keputusan Segera
//                 </p>
//             </div>

//             {/* Filter Bar */}
//             <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-8 flex flex-col md:flex-row gap-4 items-center shadow-sm">
//                 <div className="relative flex-1 w-full">
//                     <input
//                         type="text"
//                         placeholder="Cari Event"
//                         className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:ring-1 focus:ring-[#005D67] bg-white placeholder:text-gray-400"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     <Search
//                         className="absolute left-3 top-3 text-gray-400"
//                         size={20}
//                     />
//                 </div>
//                 <div className="flex gap-4 w-full md:w-auto">
//                     <div className="relative w-full md:w-40">
//                         <select
//                             className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 focus:ring-1 focus:ring-[#005D67] bg-white cursor-pointer"
//                             value={filterStatus}
//                             onChange={(e) => setFilterStatus(e.target.value)}
//                         >
//                             <option value="">Status Event</option>
//                             <option value="Active">Active</option>
//                             <option value="Closed">Closed</option>
//                         </select>
//                         <ChevronDown
//                             className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
//                             size={16}
//                         />
//                     </div>
//                     <div className="relative w-full md:w-40">
//                         <select
//                             className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 focus:ring-1 focus:ring-[#005D67] bg-white cursor-pointer"
//                             value={filterCategory}
//                             onChange={(e) => setFilterCategory(e.target.value)}
//                         >
//                             <option value="">Kategori Event</option>
//                             <option value="Lingkungan">Lingkungan</option>
//                             <option value="Pendidikan">Pendidikan</option>
//                             <option value="Social">Social</option>
//                             <option value="Kesehatan">Kesehatan</option>
//                         </select>
//                         <ChevronDown
//                             className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
//                             size={16}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Event */}
//             {events.length === 0 ? (
//                 <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
//                     Tidak ada event yang cocok dengan filter.
//                 </div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                     {events.map((event) => (
//                         <div
//                             key={event.id}
//                             className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition duration-200"
//                         >
//                             <div className="h-56 bg-gray-200 relative">
//                                 <img
//                                     src={event.image}
//                                     alt={event.title}
//                                     className="w-full h-full object-cover"
//                                 />
//                                 <span
//                                     className={`absolute top-3 right-3 text-[10px] uppercase font-bold px-3 py-1 rounded-full shadow-sm ${
//                                         event.status === "Active"
//                                             ? "bg-green-600 text-white"
//                                             : "bg-red-600 text-white"
//                                     }`}
//                                 >
//                                     {event.status}
//                                 </span>
//                             </div>

//                             <div className="p-5 flex flex-col flex-1">
//                                 <div className="mb-3">
//                                     <span
//                                         className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getCategoryStyle(
//                                             event.category
//                                         )}`}
//                                     >
//                                         {getCategoryIcon(event.category)}{" "}
//                                         {event.category}
//                                     </span>
//                                 </div>
//                                 <h3 className="font-bold text-black text-sm mb-2 line-clamp-1">
//                                     {event.title}
//                                 </h3>
//                                 <p className="text-xs text-gray-500 line-clamp-3 mb-4 leading-relaxed">
//                                     {event.desc}
//                                 </p>

//                                 <div className="mt-auto space-y-2 mb-4 border-t border-gray-50 pt-3">
//                                     <div className="flex items-center gap-2 text-xs text-gray-600">
//                                         <Clock size={14} /> {event.date}
//                                     </div>
//                                     <div className="flex items-center gap-2 text-xs text-gray-600">
//                                         <MapPin size={14} />{" "}
//                                         {event.location.substring(0, 25)}...
//                                     </div>
//                                 </div>

//                                 <button
//                                     onClick={() => onSelectEvent(event)}
//                                     className="w-full bg-[#33CCB5] hover:bg-teal-400 text-black py-2.5 rounded-lg text-xs font-bold transition shadow-sm"
//                                 >
//                                     Atur Volunteer
//                                 </button>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}
//         </div>
//     );
// };

// // detail volunteer
// const VolunteerDetailView = ({ event, volunteers, onBack, onUpdateStatus }) => {
//     // Filter State
//     const [detailSearch, setDetailSearch] = useState("");
//     const [detailStatusFilter, setDetailStatusFilter] = useState("");
//     const [detailDivisiFilter, setDetailDivisiFilter] = useState("");

//     const [sortConfig, setSortConfig] = useState({
//         key: null,
//         direction: "ascending",
//     });

//     const [currentPage, setCurrentPage] = useState(1);
//     const itemsPerPage = 8;

//     const processedData = useMemo(() => {
//         let data = [...volunteers];

//         // filtering
//         data = data.filter((item) => {
//             const matchName = item.name
//                 .toLowerCase()
//                 .includes(detailSearch.toLowerCase());
//             const matchStatus = detailStatusFilter
//                 ? item.status === detailStatusFilter
//                 : true;
//             const matchDivisi = detailDivisiFilter
//                 ? item.div.includes(detailDivisiFilter)
//                 : true;
//             return matchName && matchStatus && matchDivisi;
//         });

//         // sorting
//         if (sortConfig.key) {
//             data.sort((a, b) => {
//                 if (a[sortConfig.key] < b[sortConfig.key]) {
//                     return sortConfig.direction === "ascending" ? -1 : 1;
//                 }
//                 if (a[sortConfig.key] > b[sortConfig.key]) {
//                     return sortConfig.direction === "ascending" ? 1 : -1;
//                 }
//                 return 0;
//             });
//         }

//         return data;
//     }, [
//         volunteers,
//         detailSearch,
//         detailStatusFilter,
//         detailDivisiFilter,
//         sortConfig,
//     ]);

//     // Pagination slicing (kalau cm 1 page jadinya panjang)
//     const indexOfLastItem = currentPage * itemsPerPage;
//     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     const currentItems = processedData.slice(indexOfFirstItem, indexOfLastItem);
//     const totalPages = Math.ceil(processedData.length / itemsPerPage);

//     // sorting
//     const requestSort = (key) => {
//         let direction = "ascending";
//         if (sortConfig.key === key && sortConfig.direction === "ascending") {
//             direction = "descending";
//         }
//         setSortConfig({ key, direction });
//     };

//     const getSortIcon = (columnKey) => {
//         if (sortConfig.key !== columnKey)
//             return <ArrowUpDown size={14} className="text-gray-400" />;
//         return sortConfig.direction === "ascending" ? (
//             <ArrowUp size={14} className="text-[#005D67]" />
//         ) : (
//             <ArrowDown size={14} className="text-[#005D67]" />
//         );
//     };

//     const paginate = (pageNumber) => setCurrentPage(pageNumber);
//     const nextPage = () =>
//         setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//     const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

//     return (
//         <div className="animate-fade-in">
//             {/* Header */}
//             <div className="mb-6">
//                 <button
//                     onClick={onBack}
//                     className="text-gray-400 hover:text-[#005D67] mb-2 flex items-center gap-1 text-xs font-bold"
//                 >
//                     <ArrowLeft size={14} /> Kembali ke list
//                 </button>
//                 <h1 className="text-2xl font-bold text-black mb-1">
//                     Aplikasi Volunteer - {event.title}
//                 </h1>
//                 <p className="text-sm text-gray-500">
//                     Kelola Semua Pendaftar & Alokasikan Tugas untuk Kegiatan
//                     Anda
//                 </p>
//             </div>

//             {/* Filter Bar */}
//             <div className="bg-white p-4 rounded-2xl border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center shadow-sm">
//                 <div className="relative flex-1 w-full">
//                     <input
//                         type="text"
//                         placeholder="Cari Relawan Berdasarkan Nama"
//                         className="w-full pl-10 pr-4 py-3 rounded-full border border-gray-200 text-sm focus:ring-1 focus:ring-[#005D67] bg-white placeholder:text-gray-400 shadow-sm"
//                         value={detailSearch}
//                         onChange={(e) => {
//                             setDetailSearch(e.target.value);
//                             setCurrentPage(1);
//                         }}
//                     />
//                     <Search
//                         className="absolute left-4 top-3.5 text-gray-400"
//                         size={18}
//                     />
//                 </div>
//                 <div className="flex gap-4 w-full md:w-auto">
//                     <div className="relative w-full md:w-48">
//                         <select
//                             className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 focus:ring-1 focus:ring-[#005D67] bg-white cursor-pointer"
//                             value={detailStatusFilter}
//                             onChange={(e) => {
//                                 setDetailStatusFilter(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                         >
//                             <option value="">Status Pendaftaran</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Diterima">Diterima</option>
//                             <option value="Ditolak">Ditolak</option>
//                         </select>
//                         <ChevronDown
//                             className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
//                             size={16}
//                         />
//                     </div>
//                     <div className="relative w-full md:w-48">
//                         <select
//                             className="w-full appearance-none px-4 py-3 rounded-lg border border-gray-200 text-sm text-gray-600 focus:ring-1 focus:ring-[#005D67] bg-white cursor-pointer"
//                             value={detailDivisiFilter}
//                             onChange={(e) => {
//                                 setDetailDivisiFilter(e.target.value);
//                                 setCurrentPage(1);
//                             }}
//                         >
//                             <option value="">Divisi</option>
//                             <option value="Logistik">Divisi Logistik</option>
//                             <option value="Publikasi">Divisi Publikasi</option>
//                             <option value="Lapangan">Divisi Lapangan</option>
//                             <option value="Edukasi">Divisi Edukasi</option>
//                         </select>
//                         <ChevronDown
//                             className="absolute right-3 top-3.5 text-gray-400 pointer-events-none"
//                             size={16}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* TABLE */}
//             <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//                 <div className="overflow-x-auto">
//                     <table className="w-full text-left border-collapse">
//                         <thead>
//                             <tr className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider">
//                                 <th
//                                     className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition select-none"
//                                     onClick={() => requestSort("name")}
//                                 >
//                                     <div className="flex items-center gap-2">
//                                         Client Name {getSortIcon("name")}
//                                     </div>
//                                 </th>
//                                 <th
//                                     className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition select-none"
//                                     onClick={() => requestSort("div")}
//                                 >
//                                     <div className="flex items-center gap-2">
//                                         Divisi Pilihan {getSortIcon("div")}
//                                     </div>
//                                 </th>
//                                 <th
//                                     className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition select-none"
//                                     onClick={() => requestSort("status")}
//                                 >
//                                     <div className="flex items-center gap-2">
//                                         Status {getSortIcon("status")}
//                                     </div>
//                                 </th>
//                                 <th className="px-6 py-4 text-center">
//                                     Controls
//                                 </th>
//                             </tr>
//                         </thead>
//                         <tbody className="divide-y divide-gray-100 text-sm text-black">
//                             {currentItems.length > 0 ? (
//                                 currentItems.map((vol) => (
//                                     <tr
//                                         key={vol.id}
//                                         className="hover:bg-gray-50 transition duration-150"
//                                     >
//                                         <td className="px-6 py-4">
//                                             <div className="flex items-center gap-3">
//                                                 <img
//                                                     src={vol.avatar}
//                                                     alt={vol.name}
//                                                     className="w-8 h-8 rounded-full object-cover"
//                                                 />
//                                                 <span className="font-semibold text-black">
//                                                     {vol.name}
//                                                 </span>
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4 text-gray-600 font-medium text-xs md:text-sm">
//                                             {vol.div}
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div
//                                                 className={`inline-flex items-center gap-2 px-0 py-0 text-xs font-bold
//                                                 ${
//                                                     vol.status === "Diterima"
//                                                         ? "text-green-700"
//                                                         : vol.status ===
//                                                           "Ditolak"
//                                                         ? "text-red-500"
//                                                         : "text-yellow-600"
//                                                 }`}
//                                             >
//                                                 <span
//                                                     className={`w-1.5 h-1.5 rounded-full 
//                                                     ${
//                                                         vol.status ===
//                                                         "Diterima"
//                                                             ? "bg-green-700"
//                                                             : vol.status ===
//                                                               "Ditolak"
//                                                             ? "bg-red-500"
//                                                             : "bg-yellow-500"
//                                                     }`}
//                                                 ></span>
//                                                 {vol.status}
//                                             </div>
//                                         </td>
//                                         <td className="px-6 py-4">
//                                             <div className="flex justify-center gap-2">
//                                                 {vol.status === "Pending" ? (
//                                                     <>
//                                                         <button
//                                                             onClick={() =>
//                                                                 onUpdateStatus(
//                                                                     vol.id,
//                                                                     "Diterima"
//                                                                 )
//                                                             }
//                                                             className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-[10px] md:text-xs font-bold hover:bg-white hover:border-green-500 hover:text-green-600 transition bg-white"
//                                                         >
//                                                             Accept
//                                                         </button>
//                                                         <button
//                                                             onClick={() =>
//                                                                 onUpdateStatus(
//                                                                     vol.id,
//                                                                     "Ditolak"
//                                                                 )
//                                                             }
//                                                             className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-600 text-[10px] md:text-xs font-bold hover:bg-white hover:border-red-500 hover:text-red-600 transition bg-white"
//                                                         >
//                                                             Reject
//                                                         </button>
//                                                     </>
//                                                 ) : (
//                                                     <button
//                                                         onClick={() =>
//                                                             onUpdateStatus(
//                                                                 vol.id,
//                                                                 "Pending"
//                                                             )
//                                                         }
//                                                         className="px-4 py-1.5 rounded-full border border-gray-300 text-gray-500 text-[10px] md:text-xs font-bold hover:bg-gray-100 transition bg-white w-[130px]"
//                                                     >
//                                                         Ubah Ke Pending
//                                                     </button>
//                                                 )}
//                                             </div>
//                                         </td>
//                                     </tr>
//                                 ))
//                             ) : (
//                                 <tr>
//                                     <td
//                                         colSpan="4"
//                                         className="px-6 py-10 text-center text-gray-500"
//                                     >
//                                         Tidak ada pendaftar pada event ini.
//                                     </td>
//                                 </tr>
//                             )}
//                         </tbody>
//                     </table>
//                 </div>

//                 {/* Pagination */}
//                 {processedData.length > 0 && (
//                     <div className="p-4 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
//                         <div>
//                             Menampilkan {indexOfFirstItem + 1} -{" "}
//                             {Math.min(indexOfLastItem, processedData.length)}{" "}
//                             dari {processedData.length} data
//                         </div>
//                         <div className="flex items-center gap-2">
//                             <button
//                                 onClick={prevPage}
//                                 disabled={currentPage === 1}
//                                 className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
//                                     currentPage === 1
//                                         ? "border-gray-100 text-gray-300 cursor-not-allowed"
//                                         : "border-gray-200 text-gray-500 hover:bg-gray-50"
//                                 }`}
//                             >
//                                 <ChevronLeft size={16} />
//                             </button>
//                             {Array.from(
//                                 { length: totalPages },
//                                 (_, i) => i + 1
//                             ).map((number) => (
//                                 <button
//                                     key={number}
//                                     onClick={() => paginate(number)}
//                                     className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition
//                                         ${
//                                             currentPage === number
//                                                 ? "border border-[#005D67] bg-[#005D67] text-white"
//                                                 : "border border-gray-200 text-gray-500 hover:bg-gray-50"
//                                         }`}
//                                 >
//                                     {number}
//                                 </button>
//                             ))}
//                             <button
//                                 onClick={nextPage}
//                                 disabled={currentPage === totalPages}
//                                 className={`w-8 h-8 flex items-center justify-center rounded-lg border ${
//                                     currentPage === totalPages
//                                         ? "border-gray-100 text-gray-300 cursor-not-allowed"
//                                         : "border-gray-200 text-gray-500 hover:bg-gray-50"
//                                 }`}
//                             >
//                                 <ChevronRight size={16} />
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

//fe nya jadiin cuman filter by search nama aja nanti
import React, { useState, useMemo } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, router } from "@inertiajs/react";
import { 
    Menu, Search, ArrowLeft, Clock, MapPin, 
    ChevronLeft, ChevronRight, ArrowUpDown, ArrowUp, ArrowDown 
} from "lucide-react";

export default function AppVolunteer({ auth, events = [] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    // 1. Ambil Event yang dipilih
    const selectedEvent = events.find(e => e.event_id === selectedEventId);

    // 2. Mapping Volunteer dari Database ke State Frontend
    const currentEventVolunteers = useMemo(() => {
        if (!selectedEvent || !selectedEvent.event_regists) return [];
        return selectedEvent.event_regists.map(reg => ({
            regist_id: reg.regist_id, 
            name: reg.user?.name || "Anonim",
            div: reg.division || "Umum", 
            status: reg.regist_status, 
            avatar: reg.user?.profile_photo_url || `https://ui-avatars.com/api/?name=${reg.user?.name}`,
        }));
    }, [selectedEvent]);

    // 3. Filter Event di List Utama
    const filteredEvents = events.filter((event) => {
        return (event.event_name || "").toLowerCase().includes(searchQuery.toLowerCase());
    });

    // 4. Aksi Update Status ke Backend (Memicu logika kuota di Controller)
    const handleUpdateStatus = (registId, newStatus) => {
        router.patch(`/institute/applications/${registId}/status`, {
            status: newStatus
        }, { 
            preserveScroll: true,
            onSuccess: () => console.log("Status & Kuota diperbarui")
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
            <Head title="Manajemen Volunteer" />
            <MyNavbar user={auth?.user} variant="sidebar" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

            <main className="flex-1 w-full overflow-x-hidden">
                <div className="p-4 pt-6 md:p-8">
                    {selectedEvent ? (
                        /* TAMPILAN DETAIL PENDAFTAR */
                        <VolunteerDetailView 
                            event={selectedEvent} 
                            volunteers={currentEventVolunteers} 
                            onBack={() => setSelectedEventId(null)} 
                            onUpdateStatus={handleUpdateStatus}
                        />
                    ) : (
                        /* TAMPILAN DAFTAR EVENT */
                        <EventListView 
                            events={filteredEvents} 
                            onSelectEvent={(ev) => setSelectedEventId(ev.event_id)} 
                            searchQuery={searchQuery}
                            setSearchQuery={setSearchQuery}
                        />
                    )}
                </div>
            </main>
        </div>
    );
}

const EventListView = ({ events, onSelectEvent, searchQuery, setSearchQuery }) => {
    return (
        <div className="animate-fade-in">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-black mb-1">Aplikasi Volunteer</h1>
                <p className="text-sm text-gray-500">Pilih event untuk mengelola pendaftar.</p>
            </div>

            <div className="mb-8 relative max-w-md">
                <input 
                    type="text" 
                    placeholder="Cari Event..." 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border-none shadow-sm text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event) => (
                    <div key={event.event_id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col hover:shadow-lg transition">
                        <div className="h-48 bg-gray-200 relative">
                            <img 
                                src={event.thumbnail ? `/storage/${event.thumbnail}` : "/assets/landing-page/event3.png"} 
                                className="w-full h-full object-cover" 
                                alt="" 
                            />
                            <div className="absolute top-3 right-3 bg-white/90 px-3 py-1 rounded-full text-[10px] font-bold">
                                Sisa Kuota: {event.event_quota}
                            </div>
                        </div>
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-bold text-black text-sm mb-2">{event.event_name}</h3>
                            <button 
                                onClick={() => onSelectEvent(event)} 
                                className="mt-auto w-full bg-[#33CCB5] hover:bg-teal-400 text-black py-2.5 rounded-lg text-xs font-bold transition"
                            >
                                Atur Volunteer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const VolunteerDetailView = ({ event, volunteers, onBack, onUpdateStatus }) => {
    return (
        <div className="animate-fade-in">
            <button onClick={onBack} className="text-gray-400 hover:text-[#005D67] mb-4 flex items-center gap-1 text-xs font-bold">
                <ArrowLeft size={14} /> Kembali ke daftar event
            </button>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
                <h2 className="text-xl font-bold">{event.event_name}</h2>
                <p className="text-sm text-gray-500">Total Pendaftar: {volunteers.length} | Sisa Kuota: <span className="font-bold text-[#005D67]">{event.event_quota}</span></p>
            </div>

            <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
                        <tr>
                            <th className="px-6 py-4">Nama Relawan</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4 text-center">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {volunteers.map((vol) => (
                            <tr key={vol.regist_id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 flex items-center gap-3">
                                    <img src={vol.avatar} className="w-8 h-8 rounded-full" alt="" />
                                    <span className="font-medium text-sm">{vol.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`text-xs font-bold ${vol.status === 'Accepted' ? 'text-green-600' : vol.status === 'Rejected' ? 'text-red-500' : 'text-yellow-600'}`}>
                                        {vol.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex justify-center gap-2">
                                    {vol.status === "Pending" ? (
                                        <>
                                            <button 
                                                disabled={event.event_quota <= 0}
                                                onClick={() => onUpdateStatus(vol.regist_id, 'Accepted')}
                                                className="px-3 py-1.5 bg-green-50 text-green-600 border border-green-200 rounded-lg text-xs font-bold disabled:opacity-50"
                                            >
                                                Accept
                                            </button>
                                            <button 
                                                onClick={() => onUpdateStatus(vol.regist_id, 'Rejected')}
                                                className="px-3 py-1.5 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold"
                                            >
                                                Reject
                                            </button>
                                        </>
                                    ) : (
                                        <button 
                                            onClick={() => onUpdateStatus(vol.regist_id, 'Pending')}
                                            className="px-3 py-1.5 bg-gray-50 text-gray-600 border border-gray-200 rounded-lg text-xs font-bold"
                                        >
                                            Reset ke Pending
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};