import React from "react";
import InstituteLayout from "@/Layouts/InstituteLayout";
import { Head } from "@inertiajs/react";

export default function Profile({ auth }) {
    const user = auth.user || {};

    const institute = user.institute || {};

    const profileData = {
        name: institute.institute_name || "Nama Organisasi",
        email: user.email,
        phone: institute.institute_phone || "-",
        address: institute.institute_address || "-",
        postal_code: institute.postal_code || "-",
        bio: institute.institute_desc || "-",
    };

    return (
        <InstituteLayout user={user} title="Profil Organisasi">
            <Head title="Profil Organisasi" />

            <div className="max-w-5xl mx-auto space-y-8">
                <h1 className="text-2xl border-b border-gray-200 font-bold text-black pb-4 mb-8">
                    Profile Saya
                </h1>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8">
                    <div className="w-32 h-32 rounded-full bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2 shrink-0">
                        <img
                            src={
                                user.profile_photo_url ||
                                "/assets/Dashboard/Institute/who.png"
                            }
                            alt={profileData.name}
                            className="w-full h-full object-contain rounded-full"
                        />
                    </div>

                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-bold text-black">
                            {profileData.name}
                        </h2>
                    </div>
                </div>

                {/* DATA ORIGANISASI */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-black">
                            Informasi Personal
                        </h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Nama Organisasi */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Nama Organisasi
                            </label>
                            <p className="text-lg text-black">
                                {profileData.name}
                            </p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Email:
                            </label>
                            <p className="text-lg text-black">
                                {profileData.email}
                            </p>
                        </div>

                        {/* Nomor Telepon */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Nomor Telepon Organisasi:
                            </label>
                            <p className="text-lg text-black">
                                {profileData.phone}
                            </p>
                        </div>

                        {/* Bio */}
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Bio:
                            </label>
                            <p className="text-lg text-black leading-relaxed">
                                {profileData.bio}
                            </p>
                        </div>
                    </div>
                </div>

                {/* ALAMAT */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mb-10">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">
                        Alamat
                    </h3>
                    {/* Kode Pos */}
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">
                            Kode Pos
                        </label>
                        <p className="text-lg text-black mb-5">
                            {profileData.postal_code}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Alamat */}
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                                Alamat Lengkap:
                            </label>
                            <p className="text-lg text-black leading-relaxed">
                                {profileData.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </InstituteLayout>
    );
}
