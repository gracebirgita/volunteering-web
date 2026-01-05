import React, { useState, useRef } from "react";
import InstituteLayout from "@/Layouts/InstituteLayout";
import { Head, useForm } from "@inertiajs/react";
import {
    User,
    Lock,
    Upload,
    Trash2,
    Mail,
    ShieldCheck,
    X,
    Save,
    Check,
    Eye,
    EyeOff,
} from "lucide-react";

export default function Settings({ auth }) {
    const [activeTab, setActiveTab] = useState("account");

    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    const [showPasswordEmail, setShowPasswordEmail] = useState(false);
    const [showCurrentPass, setShowCurrentPass] = useState(false);
    const [showNewPass, setShowNewPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const fileInputRef = useRef(null);

    // MOCK DATA
    const user = { ...(auth.user || {}) };
    if (!user.institute) {
        user.institute = {
            institute_name: "PD Susanti Tbk",
            institute_address: "Kpg. Babakan No. 578",
            institute_phone: "0757 2845 0892",
            postal_code: "34864",
            bio: "Product Designer",
        };
        if (!user.name) user.name = "PD Susanti Tbk";
    }
    const institute = user.institute || {};

    // Forms
    const { data, setData, post, processing, errors } = useForm({
        name: institute.institute_name || user.name || "",
        address: institute.institute_address || "",
        phone: institute.institute_phone || "",
        bio: institute.bio || "",
        postal_code: institute.postal_code || "",
        photo: null,
    });

    const emailForm = useForm({
        email: user.email || "",
        password: "", // Konfirmasi password
    });

    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // Handlers
    const handleFileChange = (e) => {
        setData("photo", e.target.files[0]);
    };

    const handleRemovePhoto = () => {
        setData("photo", null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        post(route("institute.settings.profile"), {
            forceFormData: true,
            onSuccess: () => setShowSuccessModal(true),
            onError: (errors) => alert("Gagal menyimpan perubahan!"),
        });
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        emailForm.post(route("institute.settings.email"), {
            onSuccess: () => {
                setIsEditingEmail(false);
                emailForm.reset();
            },
        });
    };

    const handleSubmitPassword = (e) => {
        e.preventDefault();
        passwordForm.post(route("institute.settings.password"), {
            onSuccess: () => {
                setIsEditingPassword(false);
                passwordForm.reset();
            },
        });
    };

    const inputClasses =
        "w-full border-gray-300 rounded-lg text-sm focus:border-[#005D67] focus:ring-[#005D67] placeholder-gray-400";

    return (
        <InstituteLayout user={user} title="Pengaturan">
            <Head title="Pengaturan - Institute" />

            {showSuccessModal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-sm flex flex-col items-center text-center">
                        <div className="w-20 h-20 bg-[#2D6A6A] rounded-full flex items-center justify-center mb-4 shadow-sm">
                            <Check
                                size={40}
                                strokeWidth={4}
                                className="text-white"
                            />
                        </div>
                        <h2 className="text-2xl font-bold text-black mb-2">
                            Success
                        </h2>
                        <p className="text-gray-500 mb-8 text-sm">
                            “Profil Anda berhasil diperbarui.”
                        </p>
                        <button
                            onClick={() => setShowSuccessModal(false)}
                            className="w-full bg-[#2D6A6A] hover:bg-[#235353] text-white font-bold py-3 rounded-lg shadow-md transition-colors"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            )}

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
                                        value={user.email}
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

            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-black mb-8">
                    Pengaturan{" "}
                    <span className="text-gray-400 font-medium mx-2">&gt;</span>{" "}
                    Umum
                </h1>

                <div className="flex flex-col md:flex-row gap-8 items-start">
                    {/* LEFT NAVIGATION */}
                    <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                        <button
                            onClick={() => setActiveTab("account")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                                activeTab === "account"
                                    ? "bg-[#005D67] text-white shadow-md"
                                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <User size={18} /> Account
                        </button>

                        <button
                            onClick={() => setActiveTab("privacy")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                                activeTab === "privacy"
                                    ? "bg-[#005D67] text-white shadow-md"
                                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <Lock size={18} /> Privacy
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 w-full">
                        {/* TAB ACCOUNT */}
                        {activeTab === "account" && (
                            <div className="bg-white border-t border-gray-200 md:border md:border-gray-100 md:rounded-xl md:shadow-sm p-0 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-black border-b border-gray-200 pb-4 mb-6">
                                    Profile Saya
                                </h2>

                                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full border border-gray-200 p-1 bg-white">
                                        <img
                                            src={
                                                data.photo
                                                    ? URL.createObjectURL(
                                                          data.photo
                                                      )
                                                    : institute.institute_logo
                                                    ? `/storage/${institute.institute_logo}`
                                                    : "/assets/Dashboard/Institute/who.png"
                                            }
                                            alt="Profile"
                                            className="w-full h-full object-contain rounded-full"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex gap-3">
                                            <label className="cursor-pointer flex items-center gap-2 bg-[#005D67] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-teal-700 transition">
                                                <Upload size={14} /> Ubah Gambar
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                            <button
                                                type="button"
                                                onClick={handleRemovePhoto}
                                                className="flex items-center gap-2 bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition"
                                            >
                                                <Trash2 size={14} /> Remove
                                                Gambar
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            Support: PNG, JPEG
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleSubmitProfile}
                                    className="space-y-6"
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nama Organisasi:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Alamat:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.address}
                                            onChange={(e) =>
                                                setData(
                                                    "address",
                                                    e.target.value
                                                )
                                            }
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Nomor Telepon Organisasi:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData("phone", e.target.value)
                                            }
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio:
                                        </label>
                                        <textarea
                                            rows="3"
                                            value={data.bio}
                                            onChange={(e) =>
                                                setData("bio", e.target.value)
                                            }
                                            className={inputClasses}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Kode Pos:
                                        </label>
                                        <input
                                            type="text"
                                            value={data.postal_code}
                                            onChange={(e) =>
                                                setData(
                                                    "postal_code",
                                                    e.target.value
                                                )
                                            }
                                            className={`md:w-1/2 ${inputClasses}`}
                                        />
                                    </div>
                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={processing}
                                            className="bg-[#005D67] hover:bg-teal-700 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-sm transition-colors"
                                        >
                                            Simpan Perubahan
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* TAB PRIVACY */}
                        {activeTab === "privacy" && (
                            <div className="bg-white border-t border-gray-200 md:border md:border-gray-100 md:rounded-xl md:shadow-sm p-0 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-black border-b border-gray-200 pb-4 mb-6">
                                    Keamanan Akun
                                </h2>
                                <div className="space-y-8">
                                    <div className="pb-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-1">
                                                Alamat Email:
                                            </label>
                                            <p className="text-xs text-gray-500 mb-2">
                                                Alamat Email yang terhubung ke
                                                akun anda.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                            <div className="text-right">
                                                <p className="text-sm font-semibold text-black">
                                                    {user.email}
                                                </p>
                                                {user.email_verified_at ? (
                                                    <span className="text-[10px] text-green-600 font-bold flex items-center justify-end gap-1">
                                                        Verified{" "}
                                                        <ShieldCheck
                                                            size={10}
                                                        />
                                                    </span>
                                                ) : (
                                                    <span className="text-[10px] text-red-500 font-bold">
                                                        Unverified
                                                    </span>
                                                )}
                                            </div>
                                            <button
                                                onClick={() =>
                                                    setIsEditingEmail(true)
                                                }
                                                className="bg-[#005D67] hover:bg-teal-700 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2"
                                            >
                                                <Mail size={12} /> Ubah Email
                                            </button>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-black mb-1">
                                                Password:
                                            </label>
                                            <p className="text-xs text-gray-500">
                                                Tetapkan password yang unik
                                                untuk melindungi akun anda
                                            </p>
                                        </div>
                                        <div className="w-full sm:w-auto text-right">
                                            <button
                                                onClick={() =>
                                                    setIsEditingPassword(true)
                                                }
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
            </div>
        </InstituteLayout>
    );
}
