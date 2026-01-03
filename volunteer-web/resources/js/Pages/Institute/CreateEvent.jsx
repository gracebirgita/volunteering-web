import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import {
    Menu,
    Plus,
    Minus,
    Trash2,
    Image as ImageIcon,
    Sprout,
    UserRound,
    GraduationCap,
    Hospital,
    Utensils,
    Award,
    Clock,
} from "lucide-react";

export default function CreateEvent({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // state buat tab yg aktif
    const [activeTab, setActiveTab] = useState("Informasi");

    // state data form (masih mockup)
    const [formData, setFormData] = useState({
        // Informasi
        judul: "",
        deskripsiSingkat: "",
        kategori: "Lingkungan",
        thumbnail: null,

        // Logistik
        tanggalMulai: "",
        tanggalSelesai: "",
        waktuMulai: "",
        waktuSelesai: "",
        lokasi: "",

        // Relawan
        targetRelawan: 0,
        batasPendaftaran: "",
        benefits: { konsumsi: false, sertifikat: false, jam: false },
        divisi: [{ id: 1, name: "Divisi Publikasi", quota: 0 }],
        // Kontak
        cp: "",
        linkGroup: "",
        status: "Active",
    });

    // List Kategori
    const categoryList = [
        {
            name: "Lingkungan",
            icon: Sprout,
            style: "bg-[#E7F8F1] text-[#00772A]",
        },
        {
            name: "Social",
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

    const tabs = ["Informasi", "Logistik", "Relawan", "Kontak & Status"];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
            window.scrollTo(0, 0);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Create Event - Institute" />

            <MyNavbar
                user={auth?.user}
                variant="sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* CONTENT */}
            <main className="flex-1 w-full overflow-x-hidden">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
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

                <div className="p-4 pt-24 md:p-8 md:pt-8 max-w-5xl mx-auto">
                    {/* HEADER */}
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-black mb-3">
                            Create Event
                        </h1>
                        <p className="text-md text-black">
                            Satu Langkah, Ribuan Perubahan: Buat Event dan
                            Inspirasi Komunitas
                        </p>
                    </div>

                    {/* TABS NAVIGATION */}
                    <div className="bg-white rounded-t-xl border-b border-gray-200 overflow-x-auto">
                        <div className="flex min-w-max">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-4 text-md font-bold transition-colors border-b-2 ${
                                        activeTab === tab
                                            ? "border-[#005D67] text-[#005D67]"
                                            : "border-transparent text-gray-700 hover:text-black"
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* FORM CONTAINER */}
                    <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-6 md:p-8 min-h-[500px]">
                        {/* Informasi */}
                        {activeTab === "Informasi" && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Judul Event:
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Aksi Bersih Pantai Balekambang"
                                        value={formData.judul}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                judul: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Deskripsi Singkat:
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem  pantai tetap lestari."
                                        value={formData.deskripsiSingkat}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                deskripsiSingkat:
                                                    e.target.value,
                                            })
                                        }
                                    />
                                </div>
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Kategori:
                                    </label>
                                    <div className="flex flex-wrap gap-3">
                                        {categoryList.map((cat) => {
                                            const IconComponent = cat.icon;
                                            const isSelected =
                                                formData.kategori === cat.name;

                                            return (
                                                <button
                                                    key={cat.name}
                                                    onClick={() =>
                                                        setFormData({
                                                            ...formData,
                                                            kategori: cat.name,
                                                        })
                                                    }
                                                    className={`px-4 py-2 rounded-full text-xs font-bold transition border flex items-center gap-2 ${
                                                        cat.style
                                                    } ${
                                                        isSelected
                                                            ? "ring-2 ring-offset-1 ring-[#005D67] opacity-100" // Efek saat dipilih
                                                            : "opacity-60 hover:opacity-100" // Efek saat tidak dipilih
                                                    }`}
                                                >
                                                    <IconComponent
                                                        size={16}
                                                        strokeWidth={2.5}
                                                    />
                                                    {cat.name}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Gambar Thumbnail:
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-48 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400">
                                            {formData.thumbnail ? (
                                                <span className="text-xs">
                                                    Image Selected
                                                </span>
                                            ) : (
                                                <ImageIcon size={24} />
                                            )}
                                        </div>
                                        <div className="flex flex-row items-center gap-4">
                                            <button className="px-4 py-2 bg-[#005D67] text-white text-xs font-bold rounded-lg hover:bg-teal-700 flex items-center gap-2">
                                                <Plus size={14} /> Ubah Gambar
                                            </button>

                                            <button className="text-xs font-bold text-black hover:text-red-500 flex items-center gap-1">
                                                <Minus size={14} /> Remove
                                                Gambar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Logistik */}
                        {activeTab === "Logistik" && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Tanggal Pelaksanaan:
                                    </label>
                                    <div className="flex gap-4">
                                        {/* Tanggal Mulai */}
                                        <div className="w-1/2">
                                            <span className="text-md text-black mb-1 block">
                                                Mulai:
                                            </span>
                                            <input
                                                type="date"
                                                className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                                value={formData.tanggalMulai}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        tanggalMulai:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        {/* Tanggal Selesai */}
                                        <div className="w-1/2">
                                            <span className="text-md text-black mb-1 block">
                                                Selesai:
                                            </span>
                                            <input
                                                type="date"
                                                className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                                value={formData.tanggalSelesai}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        tanggalSelesai:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Waktu Mulai & Selesai:
                                    </label>
                                    <div className="flex gap-4">
                                        <div className="w-1/2 md:w-1/4">
                                            <span className="text-md text-black mb-1 block">
                                                Mulai:
                                            </span>
                                            <input
                                                type="time"
                                                className="w-full border-gray-300 rounded-lg text-sm"
                                                value={formData.waktuMulai}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        waktuMulai:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="w-1/2 md:w-1/4">
                                            <span className="text-md text-black mb-1 block">
                                                Selesai:
                                            </span>
                                            <input
                                                type="time"
                                                className="w-full border-gray-300 rounded-lg text-sm"
                                                value={formData.waktuSelesai}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        waktuSelesai:
                                                            e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Lokasi & Alamat Lengkap:
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Alamat lengkap lokasi kegiatan"
                                        value={formData.lokasi}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                lokasi: e.target.value,
                                            })
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
                                        {/* jumlah relawan */}
                                        <label className="block text-md font-bold text-black mb-2">
                                            Target Jumlah Relawan:
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        targetRelawan: Math.max(
                                                            0,
                                                            formData.targetRelawan -
                                                                1
                                                        ),
                                                    })
                                                }
                                                className="px-3 py-2 hover:bg-gray-100 border-r border-gray-300 text-gray-500"
                                            >
                                                <Minus size={14} />
                                            </button>

                                            <input
                                                type="text"
                                                className="w-20 text-center border-none focus:ring-0 text-sm text-gray-600 placeholder:text-gray-400"
                                                placeholder="0"
                                                value={
                                                    formData.targetRelawan > 0
                                                        ? formData.targetRelawan
                                                        : ""
                                                }
                                                readOnly
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData({
                                                        ...formData,
                                                        targetRelawan:
                                                            formData.targetRelawan +
                                                            1,
                                                    })
                                                }
                                                className="px-3 py-2 hover:bg-gray-100 border-l border-gray-300 text-gray-500"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    {/* tanggal */}
                                    <div>
                                        <label className="block text-md font-bold text-black mb-2">
                                            Batas Akhir Pendaftaran:
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                            value={formData.batasPendaftaran}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    batasPendaftaran:
                                                        e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                {/* checkbox */}
                                <div>
                                    <label className="block text-md font-bold text-gray-800 mb-3">
                                        Benefit Relawan:
                                    </label>
                                    <div className="space-y-3">
                                        {/* Konsumsi */}
                                        <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.benefits.konsumsi
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        benefits: {
                                                            ...formData.benefits,
                                                            konsumsi:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    })
                                                }
                                                className="rounded border-gray-300 text-[#005D67] focus:ring-[#005D67]"
                                            />
                                            <span className="flex items-center gap-2 text-md text-black">
                                                <Utensils
                                                    size={16}
                                                    className="text-gray-500"
                                                />{" "}
                                                Konsumsi
                                            </span>
                                        </label>

                                        {/* Sertifikat */}
                                        <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                            <input
                                                type="checkbox"
                                                checked={
                                                    formData.benefits.sertifikat
                                                }
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        benefits: {
                                                            ...formData.benefits,
                                                            sertifikat:
                                                                e.target
                                                                    .checked,
                                                        },
                                                    })
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

                                        {/* Jam volun */}
                                        <label className="flex items-center gap-3 cursor-pointer group w-fit">
                                            <input
                                                type="checkbox"
                                                checked={formData.benefits.jam}
                                                onChange={(e) =>
                                                    setFormData({
                                                        ...formData,
                                                        benefits: {
                                                            ...formData.benefits,
                                                            jam: e.target
                                                                .checked,
                                                        },
                                                    })
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
                                    <label className="block text-md font-bold text-black mb-2">
                                        Lainnya: (opsional)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Benefit lain"
                                        value={formData.lainnya || ""}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                lainnya: e.target.value,
                                            })
                                        }
                                    />
                                </div>
                            </div>
                        )}

                        {/* Kontak dan Status */}
                        {activeTab === "Kontak & Status" && (
                            <div className="space-y-6 animate-fade-in">
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Contact Person (CP)
                                    </label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="text"
                                            className="flex-1 border-gray-300 rounded-lg text-sm placeholder:text-gray-400"
                                            placeholder="0812 - xxxx - xxxx"
                                        />
                                        <span className="text-xs border-l px-2 text-black w-1/3">
                                            Jika Kosong maka otomatis
                                            menggunakan nomor Anda
                                        </span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Link Group: (Opsional)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg text-sm placeholder:text-gray-400"
                                        placeholder="https://chat.whatsapp.com/..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-black mb-2">
                                        Status:
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    status: "Closed",
                                                })
                                            }
                                            className={`px-6 py-2 rounded-full text-sm font-bold ${
                                                formData.status === "Closed"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            Closed
                                        </button>
                                        <button
                                            onClick={() =>
                                                setFormData({
                                                    ...formData,
                                                    status: "Active",
                                                })
                                            }
                                            className={`px-6 py-2 rounded-full text-sm font-bold ${
                                                formData.status === "Active"
                                                    ? "bg-green-700 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            Active
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ACTION BUTTON */}
                    <div className="mt-6">
                        {activeTab === "Kontak & Status" ? (
                            <button className="w-full bg-[#2D6A6A] hover:bg-teal-800 text-white py-3 rounded-lg font-bold shadow-sm transition">
                                Konfirmasi
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="w-full bg-[#2D6A6A] hover:bg-teal-800 text-white py-3 rounded-lg font-bold shadow-sm transition"
                            >
                                Tahap Selanjutnya
                            </button>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

//HANYA BUAT TESTING
// import React, { useState } from "react";
// import MyNavbar from "@/Components/Navbar";
// import { Head, useForm } from "@inertiajs/react";
// import {
//     Menu, Plus, Minus, Trash2, Image as ImageIcon,
//     Sprout, UserRound, GraduationCap, Hospital,
// } from "lucide-react";

// export default function CreateEvent({ auth }) {
//     const [sidebarOpen, setSidebarOpen] = useState(false);
//     const [activeTab, setActiveTab] = useState("Informasi");

//     // State langsung menggunakan nama yang diminta Controller agar 100% terbaca
//     const { data, setData, post, processing, errors } = useForm({
//         event_name: "",
//         event_description: "",
//         category: "Lingkungan",
//         thumbnail: null,
//         event_start: "",
//         event_finish: "",
//         event_start_time: "",
//         event_end_time: "",
//         event_location: "",
//         address: "",
//         event_quota: 0,
//         registration_deadline: "",
//         benefit_consumption: false,
//         benefit_certificate: false,
//         benefit_jam_volunt: false,
//         other_benefit: "",
//         contact_person: "",
//         group_link: "",
//         event_status: "active",
//     });

//     const categoryList = [
//         { name: "Lingkungan", icon: Sprout, style: "bg-[#E7F8F1] text-[#00772A]" },
//         { name: "Sosial", icon: UserRound, style: "bg-[#FEEDE5] text-[#FF7A00]" },
//         { name: "Pendidikan", icon: GraduationCap, style: "bg-[#E7F0FF] text-[#07ACE6]" },
//         { name: "Kesehatan", icon: Hospital, style: "bg-[#E9FBFF] text-[#33CCB5]" },
//     ];

//     const tabs = ["Informasi", "Logistik", "Relawan", "Kontak & Status"];

//     const handleNext = () => {
//         const currentIndex = tabs.indexOf(activeTab);
//         if (currentIndex < tabs.length - 1) {
//             setActiveTab(tabs[currentIndex + 1]);
//             window.scrollTo(0, 0);
//         }
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         post(route("institute.events.store"), {
//             forceFormData: true,
//             onSuccess: () => alert("Event Berhasil Dibuat!"),
//         });
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
//             <Head title="Create Event - Institute" />
//             <MyNavbar user={auth?.user} variant="sidebar" isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

//             <main className="flex-1 w-full overflow-x-hidden">
//                 <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
//                     <span className="font-bold text-[#005D67]">VolunteerHub</span>
//                     <button onClick={() => setSidebarOpen(true)} className="text-gray-600"><Menu size={24} /></button>
//                 </div>

//                 <div className="p-4 pt-24 md:p-8 md:pt-8 max-w-5xl mx-auto">
//                     <div className="mb-6">
//                         <h1 className="text-2xl font-bold text-black mb-3">Create Event</h1>
//                         <p className="text-md text-black">Buat Event dan Inspirasi Komunitas</p>
//                     </div>

//                     {/* Navigasi Tab */}
//                     <div className="bg-white rounded-t-xl border-b border-gray-200 overflow-x-auto">
//                         <div className="flex min-w-max">
//                             {tabs.map((tab) => (
//                                 <button key={tab} onClick={() => setActiveTab(tab)} className={`px-6 py-4 text-md font-bold transition-colors border-b-2 ${activeTab === tab ? "border-[#005D67] text-[#005D67]" : "border-transparent text-gray-700 hover:text-black"}`}>{tab}</button>
//                             ))}
//                         </div>
//                     </div>

//                     <div className="bg-white rounded-b-xl shadow-sm border border-t-0 border-gray-200 p-6 md:p-8 min-h-[500px]">

//                         {/* Tab 1: Informasi */}
//                         {activeTab === "Informasi" && (
//                             <div className="space-y-6">
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Judul Event:</label>
//                                     <input type="text" className="w-full border-gray-300 rounded-lg" value={data.event_name} onChange={(e) => setData("event_name", e.target.value)} />
//                                     {errors.event_name && <p className="text-red-500 text-xs mt-1">{errors.event_name}</p>}
//                                 </div>
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Deskripsi Singkat:</label>
//                                     <textarea rows="3" className="w-full border-gray-300 rounded-lg" value={data.event_description} onChange={(e) => setData("event_description", e.target.value)} />
//                                 </div>
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Kategori:</label>
//                                     <div className="flex flex-wrap gap-3">
//                                         {categoryList.map((cat) => (
//                                             <button key={cat.name} type="button" onClick={() => setData("category", cat.name)} className={`px-4 py-2 rounded-full text-xs font-bold transition border flex items-center gap-2 ${cat.style} ${data.category === cat.name ? "ring-2 ring-offset-1 ring-[#005D67] opacity-100" : "opacity-60"}`}>
//                                                 <cat.icon size={16} /> {cat.name}
//                                             </button>
//                                         ))}
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Gambar Thumbnail:</label>
//                                     <div className="flex items-center gap-4">
//                                         <div className="w-48 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
//                                             {data.thumbnail ? <img src={URL.createObjectURL(data.thumbnail)} className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-gray-400" />}
//                                         </div>
//                                         <input type="file" id="thumb" className="hidden" onChange={(e) => setData("thumbnail", e.target.files[0])} />
//                                         <label htmlFor="thumb" className="px-4 py-2 bg-[#005D67] text-white text-xs font-bold rounded-lg cursor-pointer">Upload</label>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Tab 2: Logistik */}
//                         {activeTab === "Logistik" && (
//                             <div className="space-y-6">
//                                 <div className="flex flex-col md:flex-row gap-4">
//                                     <div className="flex-1">
//                                         <label className="block text-md font-bold text-black mb-2">Tanggal Mulai:</label>
//                                         <input type="date" className="w-full border-gray-300 rounded-lg" value={data.event_start} onChange={(e) => setData("event_start", e.target.value)} />
//                                     </div>
//                                     <div className="flex-1">
//                                         <label className="block text-md font-bold text-black mb-2">Tanggal Selesai:</label>
//                                         <input type="date" className="w-full border-gray-300 rounded-lg" value={data.event_finish} onChange={(e) => setData("event_finish", e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div className="flex flex-col md:flex-row gap-4">
//                                     <div className="flex-1">
//                                         <label className="block text-md font-bold text-black mb-2">Waktu Mulai:</label>
//                                         <input type="time" className="w-full border-gray-300 rounded-lg" value={data.event_start_time} onChange={(e) => setData("event_start_time", e.target.value)} />
//                                     </div>
//                                     <div className="flex-1">
//                                         <label className="block text-md font-bold text-black mb-2">Waktu Selesai:</label>
//                                         <input type="time" className="w-full border-gray-300 rounded-lg" value={data.event_end_time} onChange={(e) => setData("event_end_time", e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Nama Lokasi:</label>
//                                     <input type="text" className="w-full border-gray-300 rounded-lg mb-4" value={data.event_location} onChange={(e) => setData("event_location", e.target.value)} />
//                                     <label className="block text-md font-bold text-black mb-2">Alamat Lengkap:</label>
//                                     <textarea rows="2" className="w-full border-gray-300 rounded-lg" value={data.address} onChange={(e) => setData("address", e.target.value)} />
//                                 </div>
//                             </div>
//                         )}

//                         {/* Tab 3: Relawan */}
//                         {activeTab === "Relawan" && (
//                             <div className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div>
//                                         <label className="block text-md font-bold text-black mb-2">Target Relawan:</label>
//                                         <input type="number" className="w-full border-gray-300 rounded-lg" value={data.event_quota} onChange={(e) => setData("event_quota", e.target.value)} />
//                                     </div>
//                                     <div>
//                                         <label className="block text-md font-bold text-black mb-2">Batas Pendaftaran:</label>
//                                         <input type="date" className="w-full border-gray-300 rounded-lg" value={data.registration_deadline} onChange={(e) => setData("registration_deadline", e.target.value)} />
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <label className="block text-md font-bold text-gray-800 mb-3">Benefit:</label>
//                                     <div className="space-y-3">
//                                         <label className="flex items-center gap-3 cursor-pointer">
//                                             <input type="checkbox" checked={data.benefit_consumption} onChange={(e) => setData("benefit_consumption", e.target.checked)} className="rounded text-[#005D67]" />
//                                             <span>Konsumsi</span>
//                                         </label>
//                                         <label className="flex items-center gap-3 cursor-pointer">
//                                             <input type="checkbox" checked={data.benefit_certificate} onChange={(e) => setData("benefit_certificate", e.target.checked)} className="rounded text-[#005D67]" />
//                                             <span>Sertifikat</span>
//                                         </label>
//                                         <label className="flex items-center gap-3 cursor-pointer">
//                                             <input type="checkbox" checked={data.benefit_jam_volunt} onChange={(e) => setData("benefit_jam_volunt", e.target.checked)} className="rounded text-[#005D67]" />
//                                             <span>Jam Volunteer</span>
//                                         </label>
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* Tab 4: Kontak & Status */}
//                         {activeTab === "Kontak & Status" && (
//                             <div className="space-y-6">
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Contact Person:</label>
//                                     <input type="text" className="w-full border-gray-300 rounded-lg" value={data.contact_person} onChange={(e) => setData("contact_person", e.target.value)} />
//                                 </div>
//                                 <div>
//                                     <label className="block text-md font-bold text-black mb-2">Link Group:</label>
//                                     <input type="text" className="w-full border-gray-300 rounded-lg" value={data.group_link} onChange={(e) => setData("group_link", e.target.value)} />
//                                 </div>
//                                 <div>
//                                     <label className="block text-sm font-bold text-black mb-2">Status:</label>
//                                     <div className="flex gap-3">
//                                         {['closed', 'active'].map((s) => (
//                                             <button key={s} type="button" onClick={() => setData("event_status", s)} className={`px-6 py-2 rounded-full text-sm font-bold capitalize ${data.event_status === s ? "bg-[#005D67] text-white" : "bg-gray-100 text-gray-500"}`}>{s}</button>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}
//                     </div>

//                     <div className="mt-6">
//                         {activeTab === "Kontak & Status" ? (
//                             <button onClick={handleSubmit} disabled={processing} className="w-full bg-[#2D6A6A] hover:bg-teal-800 text-white py-3 rounded-lg font-bold disabled:opacity-50">
//                                 {processing ? "Menyimpan..." : "Konfirmasi & Simpan"}
//                             </button>
//                         ) : (
//                             <button onClick={handleNext} className="w-full bg-[#2D6A6A] hover:bg-teal-800 text-white py-3 rounded-lg font-bold">Tahap Selanjutnya</button>
//                         )}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// }
