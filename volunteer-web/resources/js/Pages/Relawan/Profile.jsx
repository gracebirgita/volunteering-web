import React, { useState } from "react";
import { Head, usePage } from "@inertiajs/react";
import MyNavbar from "@/Components/Navbar";

export default function Profile({ auth }) {
    const { volunteer } = usePage().props;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const profileData = {
        name: volunteer?.name || "Nama Relawan",
        email: volunteer?.email || "-",
        phone: volunteer?.phone || "-",
        domicile: volunteer?.domicile || "-",
        dob: volunteer?.birth_date || "-",
        interest: volunteer?.interest || "-",
        avatar: volunteer?.avatar_url || "/images/avatar-placeholder.png",
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title="Profil Saya" />

            {/* SIDEBAR */}
            <MyNavbar
                user={auth.user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* MAIN */}
            <div className="flex-1 flex flex-col">
                

                {/* CONTENT */}
                <main className="flex-1 px-6 py-8 max-w-5xl mx-auto w-full space-y-8">
                    <h1 className="text-2xl border-b border-gray-200 font-bold text-black pb-4">
                        Profil Saya
                    </h1>

                    {/* HEADER */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border flex flex-col md:flex-row items-center gap-8">
                        <div className="w-32 h-32 rounded-full border shadow-sm overflow-hidden">
                            <img
                                src={profileData.avatar}
                                alt={profileData.name}
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <h2 className="text-3xl font-bold text-black">
                            {profileData.name}
                        </h2>
                    </div>

                    {/* INFORMASI */}
                    <div className="bg-white p-8 rounded-2xl shadow-sm border">
                        <h3 className="text-xl font-bold mb-6">
                            Informasi Personal
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <Info label="Email" value={profileData.email} />
                            <Info label="Nomor Telepon" value={profileData.phone} />
                            <Info label="Domisili" value={profileData.domicile} />
                            <Info label="Tanggal Lahir" value={profileData.dob} />
                            <Info
                                label="Minat Relawan"
                                value={profileData.interest}
                                className="md:col-span-2"
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

function Info({ label, value, className = "" }) {
    return (
        <div className={className}>
            <label className="block text-sm font-medium text-gray-400 mb-1">
                {label}
            </label>
            <p className="text-lg text-black">{value}</p>
        </div>
    );
}
