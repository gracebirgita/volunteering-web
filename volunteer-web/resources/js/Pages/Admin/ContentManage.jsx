import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from "react";
import { Head, router, Link } from '@inertiajs/react';
import MyNavbar from "@/Components/Navbar";
import { Plus, AlertCircle, Trash2, Leaf, Users, GraduationCap, Heart, Briefcase } from "lucide-react";


const dummyCategories = [
    { id: 1, status: "Aktif",  name: "Lingkungan", color: "bg-green-100 text-green-700", icon: <Leaf size={18} />, isActive: true },
    { id: 2, status: "Aktif",  name: "Sosial", color: "bg-orange-100 text-orange-700", icon: <Users size={18} />, isActive: true },
    { id: 3, status: "Aktif",  name: "Pendidikan", color: "bg-blue-100 text-blue-700", icon: <GraduationCap size={18} />, isActive: true },
    { id: 4, status: "Aktif",  name: "Kesehatan", color: "bg-cyan-100 text-cyan-700", icon: <Heart size={18} />, isActive: true },
    { id: 5, status: "Aktif",  name: "Kemanusiaan", color: "bg-yellow-100 text-yellow-700", icon: <Briefcase size={18} />, isActive: false },
];

const dummyAchievements = [];

export default function MyEvent({ auth }) {
    const [activeTab, setActiveTab] = useState("kategori");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = auth.user;
    
    // Toggle Tab Logic
    const dataList = activeTab === "kategori" ? dummyCategories : dummyAchievements;


    return (
       <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Management Konten" />
                       
           {/* Navbar Section */}
           <MyNavbar
               user={user}
               variant="admin-sidebar"
               isOpen={sidebarOpen}
               setIsOpen={setSidebarOpen}
           />

           {/* Mobile Header */}
            <main className="flex-1 w-full overflow-x-hidden">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold">
                            <img src="/assets/logo-color.png" alt="Logo" className="h-5 w-5 object-contain"/>
                        </div>
                        <span className="font-bold text-[#005D67]">VolunteerHub</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-gray-600 focus:outline-none p-1"
                    >
                    </button>
                </div>

                <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto">
                    {/* Header Section */}
                    <div className="mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Konten</h1>
                        <p className="text-gray-700 mt-2 text-sm md:text-base">Pengaturan Konten Global: Kontrol Taksonomi Event, Lokasi Geografis, dan Kriteria Pencapaian</p>
                    </div>
                    
                    {/* Navigation Tab */}
                    <div className="flex gap-8 border-b border-gray-200 mb-8">
                            {["kategori", "pencapaian"].map((tab) => (
                                <button
                                    key={tab}
                                    onClick = {() => setActiveTab(tab)}
                                    className = {`pb-3 text-base font-bold capitalize transition-all relative ${activeTab === tab ? "text-[#005D67]" : "text-gray-400 hover:text-gray-600"}`}>
                                                {tab}
                                                {activeTab === tab && (<span className = "absolute bottom-0 left-0 w-full h-[3px] bg-[#005D67] rounded"/>)}
                                </button>
                                ))}
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Daftar Kategori</h2>
                        <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-gray-100 sticky top-0 shadow-sm text-gray-800">
                                    <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        <th className="p-5 border-b border-gray-100">{activeTab === 'kategori' ? 'Nama Kategori' : 'Nama Pencapaian'}</th>
                                        <th className="p-5 border-b border-gray-100 text-right pr-10">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {dataList.map((row) => (
                                        <tr key={row.id} className="hover:bg-gray-50/50 transition-colors group">

                                            {/* Category Name */}
                                            <td className="p-5">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 shadow-sm ${row.color}`}>{row.icon}</div>
                                                    <span className="font-semibold text-gray-900 text-sm">{row.name}</span>
                                                </div>
                                            </td>

                                            {/* Action Button */}
                                            <td className="py-4 px-6 text-right">
                                                <label className="relative inline-flex items-center cursor-pointer">
                                                        <input type="checkbox" className="sr-only peer" checked={row.status === 'Aktif'} readOnly/>             
                                                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                </label>
                                                <button className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"><Trash2 size={18}/></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {dataList.length === 0 && (
                                <div className="p-20 text-center flex flex-col items-center gap-4">
                                    <AlertCircle className="text-gray-400" size={32} />
                                    <p className="text-gray-900">Silahkan tambahkan data Anda</p>
                                </div>
                            )}

                            {/* Bottom Action Button */}
                            <div className="mt-8 pt-4 border-t border-gray-50">
                                <button className="flex items-center gap-2 px-5 py-2.5 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg font-semibold shadow-sm transition-all text-sm">
                                    <Plus size={18} strokeWidth={3} />
                                    Tambah Kategori
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );  
}