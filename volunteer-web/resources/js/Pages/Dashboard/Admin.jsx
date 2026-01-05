import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import AdminStatCard from "@/Components/AdminStatCard";
import { Head, Link } from "@inertiajs/react";
import { Menu } from "lucide-react";
import {
    AreaChart, Area,
    XAxis, YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

const chartData = [
        { week: "Week 1", registrations: 45 },
        { week: "Week 2", registrations: 52 },
        { week: "Week 3", registrations: 38 },
        { week: "Week 4", registrations: 65 },
        { week: "Week 5", registrations: 48 },
        { week: "Week 6", registrations: 70 },
        { week: "Week 7", registrations: 61 },
        { week: "Week 8", registrations: 85 },
    ];

export default function AdminDashboard({ auth }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const user = auth.user;


    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Admin Dashboard" />

            {/* Sidebar ADMIN (Perubahan disini) */}
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

                <div className = "p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto">
                    {/* Content Placeholder - Header Section */}
                    <div className="mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Selamat Datang Kembali, WHO Group</h1>
                        <p className="text-gray-900 mt-5">Selamat datang, super admin, pantau metrik VolunteerHub</p>
                    </div>

                    {/* Content Placeholder - AdminStatCard Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                        <AdminStatCard
                            value = "18.154"
                            title = "Total Pengguna"
                        />
                        <AdminStatCard
                            value = "5.124"
                            title = "Total Organisasi"
                        />
                        <AdminStatCard
                            value = "25.712"
                            title = "Total Event Dibuat"
                        />
                        <AdminStatCard
                            value = "30.000"
                            title = "Total Jam Volunteer"
                        />
                    </div>

                    {/* Content Placeholder - Chart Area */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mt-8">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Statistik Registrasi Mingguan</h2>
                            <p className="text-sm text-gray-500 font-sans">Jumlah akun baru yang terdaftar per minggu</p>
                        </div>
                        
                        <div className="h-[400px] w-full text-sm">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#005D67" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#005D67" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    
                                    {/* X-Axis -> Week labels */}
                                    <XAxis 
                                        dataKey="week" 
                                        axisLine={true} 
                                        tickLine={false} 
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                        dy={10}
                                    />
                                    
                                    {/* Y-Axis -> count of accounts */}
                                    <YAxis 
                                        axisLine={true} 
                                        tickLine={false} 
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                    />
                                    
                                    <Tooltip 
                                        cursor={{ stroke: '#005D67', strokeWidth: 2 }}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    
                                    <Area
                                        type="monotone"
                                        dataKey="registrations" // Masih statik
                                        stroke="#005D67"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorReg)"
                                        animationDuration={1500}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
