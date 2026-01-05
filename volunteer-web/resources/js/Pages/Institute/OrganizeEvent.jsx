// import React, { useState } from "react";
// import MyNavbar from "@/Components/Navbar";
// import { Head, Link } from "@inertiajs/react";
// import {
//   Menu,
//   Search,
//   MapPin,
//   Calendar,
//   Clock,
//   LayoutTemplate,
//   Sprout,
//   UserRound,
//   GraduationCap,
//   Hospital,
//   X,
// } from "lucide-react";

// export default function MyEvent({ auth, events = [] }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // state filtering
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchLocation, setSearchLocation] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState(null);
//   const [selectedDate, setSelectedDate] = useState("");

//   // data institute
//   const institute = auth?.user?.institute || {};
//   const instituteName =
//     institute.institute_name || auth?.user?.name || "Institute";
//   const institutePhoto = institute.institute_logo
//     ? `/storage/${institute.institute_logo}`
//     : "/assets/Dashboard/Institute/who.png";

//   // filtering
//   const filteredEvents = events.filter((event) => {
//     const matchSearch = (event.event_name || "")
//       .toLowerCase()
//       .includes(searchQuery.toLowerCase());
//     const matchCategory = selectedCategory
//       ? event.category === selectedCategory
//       : true;

//     let matchDate = true;
//     if (selectedDate) {
//       matchDate = event.event_start === selectedDate;
//     }

//     const matchLocation = (event.event_location || "")
//       .toLowerCase()
//       .includes(searchLocation.toLowerCase());

//     return matchSearch && matchCategory && matchDate && matchLocation;
//   });

//   const getCategoryStyle = (cat) => {
//     switch (cat) {
//       case "Lingkungan":
//         return "bg-[#E7F8F1] text-[#00772A]";
//       case "Sosial":
//         return "bg-[#FEEDE5] text-[#FF7A00]";
//       case "Pendidikan":
//         return "bg-[#E7F0FF] text-[#07ACE6]";
//       case "Kesehatan":
//         return "bg-[#E9FBFF] text-[#33CCB5]";
//       default:
//         return "bg-gray-100 text-gray-600";
//     }
//   };

//   const getCategoryIcon = (cat) => {
//     switch (cat) {
//       case "Lingkungan":
//         return <Sprout size={14} />;
//       case "Sosial":
//         return <UserRound size={14} />;
//       case "Pendidikan":
//         return <GraduationCap size={14} />;
//       case "Kesehatan":
//         return <Hospital size={14} />;
//       default:
//         return <Sprout size={14} />;
//     }
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
//       <Head title="Atur Event - Institute" />

//       <MyNavbar
//         user={auth?.user}
//         variant="sidebar"
//         isOpen={sidebarOpen}
//         setIsOpen={setSidebarOpen}
//       />

//       <main className="flex-1 w-full overflow-x-hidden">
//         <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
//           <div className="flex items-center gap-2">
//             <span className="font-bold text-[#005D67]">VolunteerHub</span>
//           </div>
//           <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
//             <Menu size={24} />
//           </button>
//         </div>

//         <div className="p-4 pt-6 md:p-8">
//           <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
//             {/* Search bar */}
//             <div className="relative w-full md:max-w-xl">
//               <input
//                 type="text"
//                 placeholder="Cari Event Anda"
//                 className="w-full pl-10 pr-10 py-3 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#005D67] text-sm"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//               <Search
//                 className="absolute left-3 top-3 text-gray-400"
//                 size={20}
//               />
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="absolute right-3 top-3 text-gray-400 hover:text-red-500 transition"
//                 >
//                   <X size={18} />
//                 </button>
//               )}
//             </div>

//             {/* Header */}
//             <div className="hidden md:flex justify-end items-center gap-4 mb-6">
//               <img
//                 src={institutePhoto}
//                 alt="Profile"
//                 className="w-16 h-16 rounded-full object-cover border border-gray-200"
//               />
//               <span className="text-lg font-semibold text-black">
//                 {instituteName}
//               </span>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
//             <div className="lg:col-span-3">
//               {filteredEvents.length === 0 ? (
//                 <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
//                   <p className="mb-2">Tidak ada event ditemukan.</p>
//                   <button
//                     onClick={() => {
//                       setSelectedCategory(null);
//                       setSearchQuery("");
//                       setSelectedDate("");
//                       setSearchLocation("");
//                     }}
//                     className="text-[#005D67] font-bold text-sm hover:underline"
//                   >
//                     Reset Semua Filter
//                   </button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//                   {filteredEvents.map((event, index) => (
//                     <div
//                       key={event.id || index}
//                       className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition"
//                     >
//                       <div className="h-40 bg-gray-200 relative">
//                         <img
//                           src={
//                             event.thumbnail
//                               ? `/storage/${event.thumbnail}`
//                               : "/assets/landing-page/event1.png"
//                           }
//                           alt={event.event_name}
//                           className="w-full h-full object-cover"
//                         />
//                         <span
//                           className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
//                             event.event_status === "active"
//                               ? "bg-green-700 text-white"
//                               : "bg-red-500 text-white"
//                           }`}
//                         >
//                           {event.event_status}
//                         </span>
//                       </div>

//                       <div className="p-4 flex flex-col flex-1">
//                         <div className="flex gap-2 mb-3">
//                           <span
//                             className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${getCategoryStyle(
//                               event.category
//                             )}`}
//                           >
//                             {getCategoryIcon(event.category)} {event.category}
//                           </span>
//                           <span className="px-2 py-1 rounded-full bg-[#005D67] text-white text-[10px] font-bold line-clamp-1">
//                             {instituteName}
//                           </span>
//                         </div>

//                         <h3 className="font-bold text-black text-sm mb-2 line-clamp-1">
//                           {event.event_name}
//                         </h3>
//                         <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
//                           {event.event_description}
//                         </p>

//                         <div className="mt-auto space-y-2 mb-4">
//                           <div className="flex items-center gap-2 text-xs text-gray-600">
//                             <Clock size={14} />
//                             {new Date(event.event_start).toLocaleDateString(
//                               "id-ID",
//                               {
//                                 day: "2-digit",
//                                 month: "2-digit",
//                                 year: "numeric",
//                               }
//                             )}
//                           </div>
//                           <div className="flex items-center gap-2 text-xs text-gray-600">
//                             <MapPin size={14} />
//                             {event.event_location &&
//                             event.event_location.length > 20
//                               ? event.event_location.substring(0, 20) + "..."
//                               : event.event_location}
//                           </div>
//                         </div>

//                         <div className="grid gap-2">
//                           <Link
//                             href={`/institute/events/${event.id}/edit`}
//                             className="bg-[#33CCB5] hover:bg-teal-400 text-black py-2 rounded-lg text-xs font-bold transition text-center"
//                           >
//                             Edit
//                           </Link>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Sidebar Filter */}
//             <div className="lg:col-span-1 space-y-8">
//               {/* Kategori */}
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-bold text-black flex items-center gap-2">
//                     <LayoutTemplate size={16} /> Kategori
//                   </h3>
//                   {selectedCategory && (
//                     <button
//                       onClick={() => setSelectedCategory(null)}
//                       className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
//                     >
//                       <X size={12} className="mr-1" /> Reset
//                     </button>
//                   )}
//                 </div>
//                 <div className="space-y-3">
//                   {[
//                     "Lingkungan",
//                     "Sosial",
//                     "Pendidikan",
//                     "Kesehatan",
//                   ].map((cat, idx) => {
//                     const isSelected = selectedCategory === cat;
//                     return (
//                       <button
//                         key={idx}
//                         onClick={() =>
//                           setSelectedCategory(isSelected ? null : cat)
//                         }
//                         className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-xs font-bold transition border-2
//                         ${
//                           isSelected
//                             ? `border-[#005D67] opacity-100 ${getCategoryStyle(
//                                 cat
//                               )}`
//                             : `border-transparent hover:opacity-80 ${getCategoryStyle(
//                                 cat
//                               )}`
//                         }`}
//                       >
//                         {getCategoryIcon(cat)} {cat}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>

//               {/* Lokasi */}
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-bold text-black flex items-center gap-2">
//                     <MapPin size={16} /> Lokasi Event
//                   </h3>
//                   {searchLocation && (
//                     <button
//                       onClick={() => setSearchLocation("")}
//                       className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
//                     >
//                       <X size={12} className="mr-1" /> Reset
//                     </button>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <input
//                     type="text"
//                     placeholder="Ketik Lokasi..."
//                     className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
//                     value={searchLocation}
//                     onChange={(e) => setSearchLocation(e.target.value)}
//                   />
//                   <Search
//                     className="absolute right-3 top-3 text-gray-400 pointer-events-none"
//                     size={14}
//                   />
//                 </div>
//               </div>

//               {/* Tanggal */}
//               <div>
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="font-bold text-black flex items-center gap-2">
//                     <Calendar size={16} /> Tanggal Event
//                   </h3>
//                   {selectedDate && (
//                     <button
//                       onClick={() => setSelectedDate("")}
//                       className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
//                     >
//                       <X size={12} className="mr-1" /> Reset
//                     </button>
//                   )}
//                 </div>
//                 <div className="relative">
//                   <input
//                     type="date"
//                     className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                   />
//                 </div>
//               </div>

//               <div className="w-full flex justify-center pt-10">
//                 <img
//                   src="/assets/Dashboard/Institute/image1.png"
//                   alt="image"
//                   className="w-48 object-contain"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, useForm } from "@inertiajs/react";
import { 
    Menu, Search, MapPin, Calendar, Clock, LayoutTemplate, 
    Sprout, UserRound, GraduationCap, Hospital, X, Pencil, Info, Phone, Link as LinkIcon
} from "lucide-react";

export default function MyEvent({ auth, events = [] }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [searchLocation, setSearchLocation] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    const institute = auth?.user?.institute || {};
    const instituteName = institute.institute_name || auth?.user?.name || "Institute";
    const institutePhoto = institute.institute_logo ? `/storage/${institute.institute_logo}` : "/assets/Dashboard/Institute/who.png";

    const { data, setData, post, processing, reset, errors } = useForm({
        _method: 'PUT',
        event_name: "",
        event_description: "",
        category: "",
        event_start: "",
        event_finish: "",
        event_start_time: "",
        event_end_time: "",
        event_location: "",
        address: "",
        event_quota: "",
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
        setData({
            _method: 'PUT',
            event_name: event.event_name || "",
            event_description: event.event_description || "",
            category: event.category || "",
            event_start: event.event_start || "",
            event_finish: event.event_finish || "",
            event_start_time: event.event_start_time || "",
            event_end_time: event.event_end_time || "",
            event_location: event.event_location || "",
            address: event.address || "",
            event_quota: event.event_quota || "",
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
        post(route('institute.events.update', selectedEventId), {
            forceFormData: true,
            onSuccess: () => {
                setIsEditModalOpen(false);
                reset();
            },
        });
    };

    const filteredEvents = events.filter((event) => {
        const matchSearch = (event.event_name || "").toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = selectedCategory ? event.category === selectedCategory : true;
        const matchLocation = (event.event_location || "").toLowerCase().includes(searchLocation.toLowerCase());
        return matchSearch && matchCategory && matchLocation;
    });

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
            <Head title="Atur Event - Institute" />
            <MyNavbar user={auth?.user} variant="sidebar" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            <main className="flex-1 w-full overflow-x-hidden p-4 md:p-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <div className="relative w-full md:max-w-xl">
                        <input type="text" placeholder="Cari Event Anda" className="w-full pl-10 pr-10 py-3 rounded-full border-none shadow-sm text-sm" value={searchQuery} onChange={(e)=>setSearchQuery(e.target.value)} />
                        <Search className="absolute left-3 top-3 text-gray-400" size={20} />
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        <img src={institutePhoto} className="w-12 h-12 rounded-full object-cover" />
                        <span className="font-bold">{instituteName}</span>
                    </div>
                </div>

                {/* Event Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <div key={event.event_id} className="bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col">
                            <div className="h-40 bg-gray-200 relative">
                                <img src={event.thumbnail ? `/storage/${event.thumbnail}` : "/assets/landing-page/event1.png"} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-4 flex-1">
                                <h3 className="font-bold text-sm mb-2">{event.event_name}</h3>
                                <div className="grid gap-2 mt-4">
                                    <button onClick={() => handleEditClick(event)} className="bg-[#33CCB5] hover:bg-teal-400 text-black py-2 rounded-lg text-xs font-bold transition flex items-center justify-center gap-2">
                                        <Pencil size={14}/> Edit Event
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* FULL MODAL EDIT EVENT */}
            {isEditModalOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl animate-in zoom-in duration-200">
                        <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                            <h2 className="font-bold text-lg text-[#005D67]">Edit Event Lengkap</h2>
                            <button onClick={() => setIsEditModalOpen(false)}><X size={20}/></button>
                        </div>
                        
                        <form onSubmit={handleUpdate} className="p-6 overflow-y-auto space-y-6">
                            {/* Section 1: Basic Info */}
                            <div className="space-y-4">
                                <h4 className="text-[#005D67] font-bold text-xs uppercase border-l-4 border-[#005D67] pl-2">Informasi Dasar</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Nama Event</label>
                                        <input type="text" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_name} onChange={e => setData('event_name', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Kategori</label>
                                        <select className="w-full border-gray-200 rounded-lg text-sm" value={data.category} onChange={e => setData('category', e.target.value)}>
                                            <option value="Lingkungan">Lingkungan</option>
                                            <option value="Sosial">Sosial</option>
                                            <option value="Pendidikan">Pendidikan</option>
                                            <option value="Kesehatan">Kesehatan</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Kuota</label>
                                        <input type="number" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_quota} onChange={e => setData('event_quota', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Deskripsi</label>
                                    <textarea rows="3" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_description} onChange={e => setData('event_description', e.target.value)} />
                                </div>
                            </div>

                            {/* Section 2: Waktu & Lokasi */}
                            <div className="space-y-4">
                                <h4 className="text-[#005D67] font-bold text-xs uppercase border-l-4 border-[#005D67] pl-2">Waktu & Lokasi</h4>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Mulai</label>
                                        <input type="date" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_start} onChange={e => setData('event_start', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Selesai</label>
                                        <input type="date" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_finish} onChange={e => setData('event_finish', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Jam Mulai</label>
                                        <input type="time" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_start_time} onChange={e => setData('event_start_time', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Jam Selesai</label>
                                        <input type="time" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_end_time} onChange={e => setData('event_end_time', e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Kota</label>
                                        <input type="text" className="w-full border-gray-200 rounded-lg text-sm" value={data.event_location} onChange={e => setData('event_location', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Deadline Daftar</label>
                                        <input type="date" className="w-full border-gray-200 rounded-lg text-sm" value={data.registration_deadline} onChange={e => setData('registration_deadline', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Alamat Detail</label>
                                    <input type="text" className="w-full border-gray-200 rounded-lg text-sm" value={data.address} onChange={e => setData('address', e.target.value)} />
                                </div>
                            </div>

                            {/* Section 3: Benefit & Kontak */}
                            <div className="space-y-4">
                                <h4 className="text-[#005D67] font-bold text-xs uppercase border-l-4 border-[#005D67] pl-2">Benefit & Kontak</h4>
                                <div className="flex flex-wrap gap-4 bg-gray-50 p-3 rounded-lg">
                                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                                        <input type="checkbox" checked={data.benefit_consumption} onChange={e => setData('benefit_consumption', e.target.checked)} /> Konsumsi
                                    </label>
                                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                                        <input type="checkbox" checked={data.benefit_certificate} onChange={e => setData('benefit_certificate', e.target.checked)} /> Sertifikat
                                    </label>
                                    <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                                        <input type="checkbox" checked={data.benefit_jam_volunt} onChange={e => setData('benefit_jam_volunt', e.target.checked)} /> Jam Volunteer
                                    </label>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">WA Kontak</label>
                                        <input type="text" className="w-full border-gray-200 rounded-lg text-sm" value={data.contact_person} onChange={e => setData('contact_person', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Link Group</label>
                                        <input type="text" className="w-full border-gray-200 rounded-lg text-sm" value={data.group_link} onChange={e => setData('group_link', e.target.value)} />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-gray-500 uppercase">Status Aktif</label>
                                    <select className="w-full border-gray-200 rounded-lg text-sm" value={data.event_status} onChange={e => setData('event_status', e.target.value)}>
                                        <option value="active">Active</option>
                                        <option value="closed">Closed</option>
                                    </select>
                                </div>
                            </div>

                            {/* Section 4: Gambar */}
                            <div className="space-y-4">
                                <h4 className="text-[#005D67] font-bold text-xs uppercase border-l-4 border-[#005D67] pl-2">Ganti Gambar (Opsional)</h4>
                                <input type="file" className="text-xs w-full" onChange={e => setData('thumbnail', e.target.files[0])} />
                            </div>
                        </form>

                        <div className="p-6 border-t bg-gray-50 flex gap-3">
                            <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 py-3 border rounded-xl text-xs font-bold hover:bg-white transition">Batal</button>
                            <button onClick={handleUpdate} disabled={processing} className="flex-1 py-3 bg-[#005D67] text-white rounded-xl text-xs font-bold hover:bg-[#004a52] transition disabled:opacity-50">
                                {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}