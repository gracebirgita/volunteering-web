import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, useForm, router } from "@inertiajs/react";
import {
    Menu,
    Plus,
    Minus,
    Image as ImageIcon,
    Utensils,
    Award,
    Clock,
    Check,
} from "lucide-react";

export default function CreateEvent({ auth, categories }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("Informasi");
    
    // State popup
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        // Informasi
        event_name: "",
        event_description: "",
        category_id: categories && categories.length > 0 ? categories[0].category_id : "",
        thumbnail: null,

        // Logistik
        event_start: "",
        event_finish: "",
        event_start_time: "",
        event_end_time: "",

        // Lokasi
        event_location: "",
        address: "",

        // Relawan
        event_quota: 0,
        registration_deadline: "",

        // Benefits
        benefit_consumption: false,
        benefit_certificate: false,
        benefit_jam_volunt: false,
        other_benefit: "",

        // Kontak
        contact_person: "",
        group_link: "",
        event_status: "active",
    });

    const tabs = ["Informasi", "Logistik", "Relawan", "Kontak & Status"];

    const handleNext = () => {
        const currentIndex = tabs.indexOf(activeTab);
        if (currentIndex < tabs.length - 1) {
            setActiveTab(tabs[currentIndex + 1]);
            window.scrollTo(0, 0);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("institute.events.store"), {
            forceFormData: true,
            onSuccess: () => {
                setShowSuccessModal(true);
            },
            onError: (err) => {
                console.error(err);
                alert("Event gagal dibuat, periksa inputan Anda.");
            },
        });
    };

    // Redirect kalo sukses
    const handleCloseModal = () => {
        setShowSuccessModal(false);
        router.visit(route("institute.organize"));
    };

    const handleFileChange = (e) => {
        setData("thumbnail", e.target.files[0]);
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Create Event - Institute" />

            {/* Popup sukses */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in px-4">
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
                            “Event berhasil dibuat!”
                        </p>
                        <button
                            onClick={handleCloseModal}
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
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-black mb-3">
                            Create Event
                        </h1>
                        <p className="text-md text-black">
                            Satu Langkah, Ribuan Perubahan: Buat Event dan
                            Inspirasi Komunitas
                        </p>
                    </div>

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
                                        value={data.event_name}
                                        onChange={(e) =>
                                            setData(
                                                "event_name",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.event_name && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.event_name}
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Deskripsi Singkat:
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Bergabung untuk membersihkan sampah..."
                                        value={data.event_description}
                                        onChange={(e) =>
                                            setData(
                                                "event_description",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.event_description && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.event_description}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-md font-bold text-black mb-2">Kategori:</label>
                                    <div className="flex flex-wrap gap-3">
                                        {categories && categories.length > 0 ? (
                                            categories.map((cat) => {
                                                const isSelected = data.category_id === cat.category_id;
                                                
                                                // Dynamic style based on selection and DB Color
                                                const buttonStyle = isSelected
                                                    ? {
                                                          backgroundColor: `${cat.color}1A`, // 10% opacity hex
                                                          color: cat.color,
                                                          borderColor: cat.color,
                                                          borderWidth: '2px'
                                                      }
                                                    : {
                                                          backgroundColor: 'white',
                                                          color: '#4B5563', // gray-600
                                                          borderColor: '#E5E7EB', // gray-200
                                                          borderWidth: '1px'
                                                      };

                                                return (
                                                    <button
                                                        key={cat.category_id}
                                                        type="button" 
                                                        onClick={() => setData("category_id", cat.category_id)}
                                                        style={buttonStyle}
                                                        className="px-5 py-2 rounded-full text-xs font-bold transition hover:opacity-80"
                                                    >
                                                        {cat.name}
                                                    </button>
                                                );
                                            })
                                        ) : (
                                            <p className="text-sm text-gray-500 italic">Belum ada kategori tersedia.</p>
                                        )}
                                    </div>
                                    {errors.category_id && <div className="text-red-500 text-xs mt-1">{errors.category_id}</div>}
                                </div>

                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Gambar Thumbnail:
                                    </label>
                                    <div className="flex items-center gap-4">
                                        <div className="w-48 h-28 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 overflow-hidden">
                                            {data.thumbnail ? (
                                                <img
                                                    src={URL.createObjectURL(
                                                        data.thumbnail
                                                    )}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <ImageIcon size={24} />
                                            )}
                                        </div>
                                        <div className="flex flex-row items-center gap-4">
                                            <label className="cursor-pointer px-4 py-2 bg-[#005D67] text-white text-xs font-bold rounded-lg hover:bg-teal-700 flex items-center gap-2">
                                                <Plus size={14} /> Ubah Gambar
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                            <button
                                                onClick={() =>
                                                    setData("thumbnail", null)
                                                }
                                                className="text-xs font-bold text-black hover:text-red-500 flex items-center gap-1"
                                            >
                                                <Minus size={14} /> Remove
                                                Gambar
                                            </button>
                                        </div>
                                    </div>
                                    {errors.thumbnail && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.thumbnail}
                                        </div>
                                    )}
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
                                        <div className="w-1/2">
                                            <span className="text-md text-black mb-1 block">
                                                Mulai:
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
                                            <span className="text-md text-black mb-1 block">
                                                Selesai:
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
                                    {(errors.event_start ||
                                        errors.event_finish) && (
                                        <div className="text-red-500 text-xs mt-1">
                                            Tanggal harus diisi
                                        </div>
                                    )}
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
                                                value={data.event_start_time}
                                                onChange={(e) =>
                                                    setData(
                                                        "event_start_time",
                                                        e.target.value
                                                    )
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

                                {/* Lokasi */}
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Lokasi:
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Contoh: Pantai Balekambang, Gedung Serbaguna, dll."
                                        value={data.event_location}
                                        onChange={(e) =>
                                            setData(
                                                "event_location",
                                                e.target.value
                                            )
                                        }
                                    />
                                    {errors.event_location && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.event_location}
                                        </div>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div>
                                    <label className="block text-md font-bold text-black mb-2">
                                        Alamat Lengkap:
                                    </label>
                                    <textarea
                                        rows="3"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Jalan, RT/RW, Kecamatan, Kota..."
                                        value={data.address}
                                        onChange={(e) =>
                                            setData("address", e.target.value)
                                        }
                                    />
                                    {errors.address && (
                                        <div className="text-red-500 text-xs mt-1">
                                            {errors.address}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Relawan */}
                        {activeTab === "Relawan" && (
                            <div className="space-y-6 animate-fade-in">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-md font-bold text-black mb-2">
                                            Target Jumlah Relawan:
                                        </label>
                                        <div className="flex items-center border border-gray-300 rounded-lg w-fit overflow-hidden">
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "event_quota",
                                                        Math.max(
                                                            0,
                                                            data.event_quota - 1
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
                                                placeholder="0"
                                                value={
                                                    data.event_quota > 0
                                                        ? data.event_quota
                                                        : ""
                                                }
                                                readOnly
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setData(
                                                        "event_quota",
                                                        data.event_quota + 1
                                                    )
                                                }
                                                className="px-3 py-2 hover:bg-gray-100 border-l border-gray-300 text-gray-500"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-md font-bold text-black mb-2">
                                            Batas Akhir Pendaftaran:
                                        </label>
                                        <input
                                            type="date"
                                            className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67]"
                                            value={data.registration_deadline}
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
                                    <label className="block text-md font-bold text-gray-800 mb-3">
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
                                            <span className="flex items-center gap-2 text-md text-black">
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
                                    <label className="block text-md font-bold text-black mb-2">
                                        Lainnya: (opsional)
                                    </label>
                                    <input
                                        type="text"
                                        className="w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder:text-gray-400"
                                        placeholder="Benefit lain"
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
                                    <label className="block text-md font-bold text-black mb-2">
                                        Contact Person (CP)
                                    </label>
                                    <div className="flex gap-4 items-center">
                                        <input
                                            type="text"
                                            className="flex-1 border-gray-300 rounded-lg text-sm placeholder:text-gray-400"
                                            placeholder="0812 - xxxx - xxxx"
                                            value={data.contact_person}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_person",
                                                    e.target.value
                                                )
                                            }
                                        />
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
                                    <label className="block text-md font-bold text-black mb-2">
                                        Status:
                                    </label>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                setData(
                                                    "event_status",
                                                    "closed"
                                                )
                                            }
                                            className={`px-6 py-2 rounded-full text-sm font-bold ${
                                                data.event_status === "closed"
                                                    ? "bg-red-500 text-white"
                                                    : "bg-gray-100 text-gray-500"
                                            }`}
                                        >
                                            Closed
                                        </button>
                                        <button
                                            onClick={() =>
                                                setData(
                                                    "event_status",
                                                    "active"
                                                )
                                            }
                                            className={`px-6 py-2 rounded-full text-sm font-bold ${
                                                data.event_status === "active"
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

                    <div className="mt-6">
                        {activeTab === "Kontak & Status" ? (
                            <button
                                onClick={handleSubmit}
                                disabled={processing}
                                className="w-full bg-[#005D67] hover:bg-teal-800 text-white py-3 rounded-lg font-bold shadow-sm transition disabled:opacity-50"
                            >
                                {processing ? "Menyimpan..." : "Konfirmasi"}
                            </button>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="w-full bg-[#005D67] hover:bg-teal-800 text-white py-3 rounded-lg font-bold shadow-sm transition"
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
