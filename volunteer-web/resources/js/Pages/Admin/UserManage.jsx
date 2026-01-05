import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';
import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Search, Edit2, Lock, AlertCircle, Menu } from "lucide-react";


const dummyVolunteers = [
    { id: 1, name: "Nisha Kumari", email: "nishakumari@gmail.com", status: "Aktif", avatar: "https://i.pravatar.cc/150?u=1" },
    { id: 2, name: "Sophia", email: "sophia@gmail.com", status: "Aktif", avatar: "https://i.pravatar.cc/150?u=2" },
    { id: 3, name: "Rudra Pratap", email: "pratap.rudra@gmail.com", status: "Aktif", avatar: "https://i.pravatar.cc/150?u=3" },
    { id: 4, name: "Trisha Norton", email: "trishanorton@gmail.com", status: "Blokir", avatar: "https://i.pravatar.cc/150?u=4" },
    { id: 5, name: "Jolene Orr", email: "joleneorr@gmail.com", status: "Blokir", avatar: "https://i.pravatar.cc/150?u=5" },
];

const dummyInstitutes = [
    { id: 1, name: "Green Earth Foundation", email: "contact@greenearth.org", status: "Aktif", avatar: "https://i.pravatar.cc/150?u=6" },
    { id: 2, name: "Helping Hands", email: "support@helpinghands.com", status: "Blokir", avatar: "https://i.pravatar.cc/150?u=7" },
    { id: 3, name: "EduCare Initiative", email: "info@educare.org", status: "Aktif", avatar: "https://i.pravatar.cc/150?u=8" },
];


export default function MyEvent({ auth }) {
    const [activeTab, setActiveTab] = useState("relawan"); // 'relawan' or 'organisasi'
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = auth.user;

    // Toggle Tab Logic
    const dataList = activeTab === "relawan" ? dummyVolunteers : dummyInstitutes;
    
    // Filter Logic
    const filteredData = dataList.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
    //    <AuthenticatedLayout>
            <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
                <Head title="Management Pengguna" />
                
                {/* Navbar Section */}
                <MyNavbar
                    user={user}
                    variant="admin-sidebar"
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

                    <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto">
                        {/* Header Section */}
                        <div className="mb-10">
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Pengguna</h1>
                            <p className="text-gray-700 mt-2 text-sm md:text-base">Kontrol Akun Platform: Kelola, Verifikasi, dan Pastikan Keamanan Seluruh Pengguna</p>
                        </div>

                        {/* Navigation Tab */}
                        <div className="flex gap-8 border-b border-gray-200 mb-8">
                                {["relawan", "organisasi"].map((tab) => (
                                    <button
                                        key={tab}
                                        onClick = {() => setActiveTab(tab)}
                                        className = {`pb-3 text-base font-bold capitalize transition-all relative ${activeTab === tab ? "text-[#005D67]" : "text-gray-400 hover:text-gray-600"}`}>
                                                    {tab}
                                                    {activeTab === tab && (<span className = "absolute bottom-0 left-0 w-full h-[3px] bg-[#005D67] rounded"/>)}
                                    </button>
                                    ))}
                        </div>
                            
                        {/* Search Bar */}
                        <div className="mb-8 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-5 w-5"/>
                            <input
                                type="text"
                                placeholder={`Cari ${activeTab === "relawan" ? "Relawan" : "Organisasi"} Berdasarkan Nama...`}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-white border-none rounded-full focus:ring-2 focus:ring-[#005D67] focus:border-transparent outline-none shadow-sm text-sm"
                            />
                        </div>

                        {/* Table */}
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                            <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
                                <table className="w-full text-left border-collapse min-w-[1000px]">
                                    <thead className="bg-gray-100 sticky top-0 shadow-sm text-gray-800">
                                        <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                            <th className="p-5">{activeTab === 'relawan' ? 'Client Name' : 'Organization Name'}</th>
                                            <th className="p-5">Email</th>
                                            <th className="p-5 text-center">Status</th>
                                            <th className="p-5 text-center">Aksi - Status</th>
                                            <th className="p-5 text-center">Aksi</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {filteredData.map((row) => (
                                            <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">

                                                {/* User Info */}
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        <img src={row.avatar} alt={row.name} className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-sm"/>
                                                        <span className="font-semibold text-gray-900 text-sm">{row.name}</span>
                                                    </div>
                                                </td>
                                                
                                                {/* Email */}
                                                <td className="p-5 text-sm text-gray-600 font-medium">{row.email}</td>

                                                {/* Status Badge */}
                                                <td className="p-5 text-center">
                                                    <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${
                                                        row.status === "Aktif"
                                                                ? "bg-green-50 text-green-700 border-green-100"
                                                                : "bg-orange-50 text-orange-700 border-orange-100"
                                                    }`}>{row.status}</span>
                                                </td>

                                                {/* Toggle Switch */}
                                                <td className="p-5 text-center">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" checked={row.status === 'Aktif'} readOnly/>             
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                    </label>
                                                </td>

                                                {/* Actions */}
                                                <td className="p-5 text-center">
                                                    <div className="flex items-center justify-center gap-2">
                                                        {/* <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-[#005D67] transition-all shadow-sm">
                                                            <Edit2 size={14} />Edit Detail
                                                        </button> */}
                                                        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-full text-xs font-semibold text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-all shadow-sm">
                                                            <Lock size={14} />Reset Password
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                {/* Empty State */}
                                {filteredData.length === 0 && (
                                    <div className="p-20 text-center flex flex-col items-center gap-4">
                                            <AlertCircle className="text-gray-400" size={32} />
                                        <p className="text-gray-500">Tidak ada pengguna ditemukan</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    </main>
                </div>
        // </AuthenticatedLayout>
    );
}