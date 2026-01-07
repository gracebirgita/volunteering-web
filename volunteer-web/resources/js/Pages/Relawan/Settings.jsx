import React, { useState, useRef } from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import MyNavbar from "@/Components/Navbar";
import Topbar from "@/Components/Topbar";
import {
    User,
    Lock,
    Upload,
    Trash2,
    Check,
    Eye,
    EyeOff,
} from "lucide-react";

export default function Settings() {
    const { auth } = usePage().props;
    const profile = auth.profile;

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("account");

    const fileInputRef = useRef(null);

    const { data, setData, post, processing } = useForm({
        name: profile?.user_name || "",
        phone: profile?.user_phone || "",
        domicile: profile?.user_domicile || "",
        interest: profile?.user_interest || "",
        photo: null,
    });

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [showPasswordEmail, setShowPasswordEmail] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const emailForm = useForm({
        email: auth.user.email || "",
        password: "",
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const inputClasses =
    "w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder-gray-400";



    // PROFILE
    const handleSubmitProfile = (e) => {
        e.preventDefault();
        post(route("volunteer.settings.profile"), {
            forceFormData: true,
            onSuccess: () => {
                setShowSuccessModal(true);
                setData("remove_photo", false);

                setTimeout(() => {
                    window.location.reload();
                }, 600);
            },
            
        });
    };

    // EMAIL
    const handleSubmitEmail = (e) => {
        e.preventDefault();
        emailForm.post(route("volunteer.settings.email"), {
            onSuccess: () => {
                setIsEditingEmail(false);
                emailForm.reset('password');
            }
        });
    };

    // PASSWORD
    const handleSubmitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route("volunteer.settings.password"), {
            onSuccess: () => {
                setIsEditingPassword(false);
                passwordForm.reset();
            },
        });
    };


    return (
        <div className="flex min-h-screen bg-gray-50">
            <Head title="Pengaturan Akun" />

            {/* SIDEBAR */}
            <MyNavbar
                user={auth.user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />


            {/* Success Ngedit */}
            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[#2D6A6A] rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Check size={40} strokeWidth={4} className="text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-2">
                            Success
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            Profil Anda berhasil diperbarui.
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-[#2D6A6A] hover:bg-[#235353] text-white font-bold py-3 rounded-lg"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            )}

             {/* Ngedit Email */}
            {isEditingEmail && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-black mb-6">
                                Ubah Email
                            </h2>

                            <form
                                onSubmit={handleSubmitEmail}
                                className="space-y-4"
                            >
                                {/* Email Lama */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Email Lama:
                                    </label>
                                    <input
                                        type="text"
                                        value={auth.user.email}
                                        disabled
                                        className="w-full border-gray-200 bg-gray-50 rounded-lg text-sm text-gray-500"
                                    />
                                </div>

                                {/* Email Baru */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Email Baru:
                                    </label>
                                    <input
                                        type="email"
                                        value={emailForm.data.email}
                                        onChange={(e) =>
                                            emailForm.setData(
                                                "email",
                                                e.target.value
                                            )
                                        }
                                        className={inputClasses}
                                        placeholder="Masukkan email baru"
                                    />
                                    {emailForm.errors.email && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {emailForm.errors.email}
                                        </p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Konfirmasi Password:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showPasswordEmail
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={emailForm.data.password}
                                            onChange={(e) =>
                                                emailForm.setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className={inputClasses}
                                            placeholder="Masukkan password saat ini"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPasswordEmail(
                                                    !showPasswordEmail
                                                )
                                            }
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPasswordEmail ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {emailForm.errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {emailForm.errors.password}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        disabled={emailForm.processing}
                                        className="w-full bg-[#2D6A6A] hover:bg-[#235353] text-white font-bold py-3 rounded-lg shadow-sm transition-colors"
                                    >
                                        Confirm Perubahan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsEditingEmail(false)}
                                        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Ganti Password */}
            {isEditingPassword && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="p-6">
                            <h2 className="text-xl font-bold text-black mb-6">
                                Ubah Password
                            </h2>

                            <form
                                onSubmit={handleSubmitPassword}
                                className="space-y-4"
                            >
                                {/* Password Lama */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Password Lama:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showCurrentPass
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                passwordForm.data
                                                    .current_password
                                            }
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "current_password",
                                                    e.target.value
                                                )
                                            }
                                            className={inputClasses}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowCurrentPass(
                                                    !showCurrentPass
                                                )
                                            }
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showCurrentPass ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {passwordForm.errors.current_password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {
                                                passwordForm.errors
                                                    .current_password
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Password Baru */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Password Baru:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showNewPass
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={passwordForm.data.password}
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className={inputClasses}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowNewPass(!showNewPass)
                                            }
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showNewPass ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {passwordForm.errors.password && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {passwordForm.errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Konfirmasi Password */}
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-1">
                                        Konfirmasi Password:
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={
                                                showConfirmPass
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={
                                                passwordForm.data
                                                    .password_confirmation
                                            }
                                            onChange={(e) =>
                                                passwordForm.setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className={inputClasses}
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPass(
                                                    !showConfirmPass
                                                )
                                            }
                                            className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                                        >
                                            {showConfirmPass ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    {passwordForm.errors.password_confirmation && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {passwordForm.errors.password_confirmation}
                                        </p>
                                    )}
                                </div>

                                <div className="pt-4 flex flex-col gap-3">
                                    <button
                                        type="submit"
                                        disabled={passwordForm.processing}
                                        className="w-full bg-[#2D6A6A] hover:bg-[#235353] text-white font-bold py-3 rounded-lg shadow-sm transition-colors"
                                    >
                                        Confirm Perubahan
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsEditingPassword(false)
                                        }
                                        className="w-full bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-50 transition-colors"
                                    >
                                        Kembali
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}


            {/* MAIN */}
            <div className="flex-1 flex flex-col">
                <Topbar
                    user={profile}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <main className="max-w-6xl mx-auto w-full px-6 py-8">
                    <h1 className="text-2xl font-bold mb-8">
                        Pengaturan{" "}
                        <span className="text-gray-400 font-medium mx-2">&gt;</span>{" "}
                        {activeTab === "account" ? "Akun" : "Keamanan"}
                    </h1>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* LEFT TAB */}
                        <div className="w-full md:w-64 space-y-2">
                            <TabButton
                                active={activeTab === "account"}
                                onClick={() => setActiveTab("account")}
                                icon={<User size={18} />}
                                label="Account"
                            />
                            <TabButton
                                active={activeTab === "privacy"}
                                onClick={() => setActiveTab("privacy")}
                                icon={<Lock size={18} />}
                                label="Privacy"
                            />
                        </div>

                        {/* RIGHT CONTENT */}
                        <div className="flex-1">
                            {activeTab === "account" && (
                                <div className="bg-white rounded-xl shadow-sm border p-8">
                                    <h2 className="text-lg font-bold mb-6 border-b pb-4">
                                        Profile Saya
                                    </h2>

                                    {/* AVATAR */}
                                    <div className="flex items-center gap-6 mb-8">
                                        <img
                                            src={
                                                data.photo
                                                    ? URL.createObjectURL(
                                                          data.photo
                                                      )
                                                    : profile?.avatar_url ||
                                                      "/images/avatar-placeholder.png"
                                            }
                                            className="w-24 h-24 rounded-full object-cover border"
                                        />

                                        <div className="flex gap-3">
                                            <label className="cursor-pointer flex items-center gap-2 bg-[#005D67] text-white px-4 py-2 rounded-lg text-xs">
                                                <Upload size={14} /> Ubah Gambar
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    hidden
                                                    accept="image/*"
                                                    onChange={(e) =>
                                                        setData(
                                                            "photo",
                                                            e.target.files[0]
                                                        )
                                                    }
                                                />
                                            </label>

                                            <button
                                                type="button"
                                                onClick={() =>{
                                                    setData("photo", null)       
                                                    setData("remove_photo", true)
                                                }}
                                                className="flex items-center gap-2 border px-4 py-2 rounded-lg text-xs"
                                            >
                                                <Trash2 size={14} /> Remove
                                            </button>
                                        </div>
                                    </div>

                                    {/* FORM */}
                                    <form
                                        onSubmit={handleSubmitProfile}
                                        className="space-y-6"
                                    >
                                        <Input
                                            label="Nama Relawan"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            label="Nomor Telepon"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData(
                                                    "phone",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            label="Domisili"
                                            value={data.domicile}
                                            onChange={(e) =>
                                                setData(
                                                    "domicile",
                                                    e.target.value
                                                )
                                            }
                                        />
                                        <Input
                                            label="Minat Relawan"
                                            value={data.interest}
                                            onChange={(e) =>
                                                setData(
                                                    "interest",
                                                    e.target.value
                                                )
                                            }
                                        />

                                        <button
                                            disabled={processing}
                                            className="bg-[#005D67] text-white px-6 py-2.5 rounded-full text-sm"
                                        >
                                            Simpan Perubahan
                                        </button>
                                    </form>
                                </div>
                            )}

                           {activeTab === "privacy" && (
                                <div className="bg-white border rounded-xl shadow-sm p-8 animate-fade-in">
                                    <h2 className="text-lg font-bold text-black border-b pb-4 mb-6">
                                        Keamanan Akun
                                    </h2>

                                    <div className="space-y-8">
                                        {/* EMAIL SECTION */}
                                        <div className="pb-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-1">
                                                    Alamat Email:
                                                </label>
                                                <p className="text-xs text-gray-500">
                                                    Email yang terhubung ke akun relawan Anda.
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                <div className="text-right">
                                                    <p className="text-sm font-semibold text-black">
                                                        {auth.user.email}
                                                    </p>
                                                    {auth.user.email_verified_at ? (
                                                        <span className="text-[10px] text-green-600 font-bold">
                                                            Verified
                                                        </span>
                                                    ) : (
                                                        <span className="text-[10px] text-red-500 font-bold">
                                                            Unverified
                                                        </span>
                                                    )}
                                                </div>

                                                <button
                                                    onClick={() => setIsEditingEmail(true)}
                                                    className="bg-[#005D67] hover:bg-teal-700 text-white px-4 py-2 rounded-full text-xs font-medium"
                                                >
                                                    Ubah Email
                                                </button>
                                            </div>
                                        </div>

                                        {/* PASSWORD SECTION */}
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                            <div>
                                                <label className="block text-sm font-bold text-black mb-1">
                                                    Password:
                                                </label>
                                                <p className="text-xs text-gray-500">
                                                    Tetapkan password yang kuat untuk melindungi akun Anda.
                                                </p>
                                            </div>

                                            <div className="w-full sm:w-auto text-right">
                                                <button
                                                    onClick={() => setIsEditingPassword(true)}
                                                    className="bg-[#005D67] hover:bg-teal-700 text-white px-4 py-2 rounded-full text-xs font-medium"
                                                >
                                                    Ubah Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

/* ===================== */
/* SMALL COMPONENTS */
/* ===================== */

function TabButton({ active, icon, label, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold w-full ${
                active
                    ? "bg-[#005D67] text-white shadow"
                    : "text-gray-500 hover:bg-gray-100"
            }`}
        >
            {icon} {label}
        </button>
    );
}

function Input({ label, ...props }) {
    return (
        <div>
            <label className="block text-sm font-medium mb-1">{label}</label>
            <input
                {...props}
                className="w-full border rounded-lg px-4 py-2 text-sm focus:ring-[#005D67] focus:border-[#005D67]"
            />
        </div>
    );
}
