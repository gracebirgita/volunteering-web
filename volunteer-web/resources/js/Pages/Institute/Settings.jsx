import React, { useState } from "react";
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
} from "lucide-react";

export default function Settings({ auth }) {
    const [activeTab, setActiveTab] = useState("account");

    // state untuk edit privacy
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);

    // MOCK DATA (Sementara)
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

    // PROFILE SETTINGS
    const { data, setData, post, processing, errors } = useForm({
        name: institute.institute_name || user.name || "",
        address: institute.institute_address || "",
        phone: institute.institute_phone || "",
        bio: institute.bio || "",
        postal_code: institute.postal_code || "",
        photo: null,
    });

    // CHANGE EMAIL
    const emailForm = useForm({
        email: user.email || "",
        password: "",
    });

    // CHANGE PASSWORD
    const passwordForm = useForm({
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    const handleFileChange = (e) => {
        setData("photo", e.target.files[0]);
    };

    const handleSubmitProfile = (e) => {
        e.preventDefault();
        post(route("institute.settings.profile"), {
            forceFormData: true,

            onSuccess: () => {
                alert("Data berhasil disimpan!");
            },
            onError: (errors) => {
                console.error(errors);
                alert("Gagal menyimpan perubahan!");
            },
        });
    };

    const handleSubmitEmail = (e) => {
        e.preventDefault();
        emailForm.post(route("institute.settings.email"), {
            onSuccess: () => setIsEditingEmail(false),
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

            <div className="max-w-6xl mx-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-8">
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
                            <User size={18} />
                            Account
                        </button>

                        <button
                            onClick={() => setActiveTab("privacy")}
                            className={`flex items-center gap-3 px-4 py-3 rounded-full text-sm font-semibold transition-all ${
                                activeTab === "privacy"
                                    ? "bg-[#005D67] text-white shadow-md"
                                    : "bg-transparent text-gray-500 hover:bg-gray-100"
                            }`}
                        >
                            <Lock size={18} />
                            Privacy
                        </button>
                    </div>

                    {/* RIGHT */}
                    <div className="flex-1 w-full">
                        {/* TAB ACCOUNT */}
                        {activeTab === "account" && (
                            <div className="bg-white border-t border-gray-200 md:border md:border-gray-100 md:rounded-xl md:shadow-sm p-0 md:p-8 animate-fade-in">
                                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
                                    Profile Saya
                                </h2>

                                {/* Image Upload */}
                                <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                                    <div className="w-24 h-24 rounded-full border border-gray-200 p-1 bg-white">
                                        <img
                                            
                                            src={
                                                data.photo
                                                    ? URL.createObjectURL(data.photo)
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
                                                <Upload size={14} />
                                                Ubah Gambar
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    onChange={handleFileChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                            <button className="flex items-center gap-2 bg-white border border-gray-300 text-gray-600 px-4 py-2 rounded-lg text-xs font-medium hover:bg-gray-50 transition">
                                                <Trash2 size={14} />
                                                Remove Gambar
                                            </button>
                                        </div>
                                        <p className="text-[10px] text-gray-400 mt-1">
                                            Support: PNG, JPEG
                                        </p>
                                    </div>
                                </div>

                                {/* Form Profile */}
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
                                            placeholder="Nama organisasi"
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
                                            placeholder="Indonesia"
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
                                            placeholder="0812-xxxx-xxxx"
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
                                            placeholder="Product Designer"
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
                                            placeholder="75126"
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
                                <h2 className="text-lg font-bold text-gray-900 border-b border-gray-200 pb-4 mb-6">
                                    Keamanan Akun
                                </h2>

                                <div className="space-y-8">
                                    {/* EMAIL SECTION */}
                                    <div className="pb-6 border-b border-gray-100">
                                        {!isEditingEmail ? (
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-black mb-1">
                                                        Alamat Email:
                                                    </label>
                                                    <p className="text-xs text-gray-500 mb-2">
                                                        Alamat Email yang
                                                        terhubung ke akun anda.
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                                    <div className="text-right">
                                                        <p className="text-sm font-semibold text-gray-900">
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
                                                            setIsEditingEmail(
                                                                true
                                                            )
                                                        }
                                                        className="bg-[#005D67] hover:bg-teal-700 text-white px-4 py-2 rounded-full text-xs font-medium flex items-center gap-2"
                                                    >
                                                        <Mail size={12} /> Ubah
                                                        Email
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <form
                                                onSubmit={handleSubmitEmail}
                                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in"
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-sm font-bold text-gray-800">
                                                        Ubah Alamat Email
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setIsEditingEmail(
                                                                false
                                                            )
                                                        }
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                                            Email Baru
                                                        </label>
                                                        <input
                                                            type="email"
                                                            value={
                                                                emailForm.data
                                                                    .email
                                                            }
                                                            onChange={(e) =>
                                                                emailForm.setData(
                                                                    "email",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClasses
                                                            }
                                                            placeholder="masukkan email baru"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                                            Konfirmasi Password
                                                            Anda
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={
                                                                emailForm.data
                                                                    .password
                                                            }
                                                            onChange={(e) =>
                                                                emailForm.setData(
                                                                    "password",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClasses
                                                            }
                                                            placeholder="masukkan password saat ini"
                                                        />
                                                    </div>
                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setIsEditingEmail(
                                                                    false
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium text-black hover:bg-gray-200 rounded-lg"
                                                        >
                                                            Batal
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                emailForm.processing
                                                            }
                                                            className="bg-[#005D67] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-teal-700 flex items-center gap-2"
                                                        >
                                                            <Save size={14} />{" "}
                                                            Simpan Email
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
                                    </div>

                                    {/* PASSWORD SECTION */}
                                    <div>
                                        {!isEditingPassword ? (
                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                                <div>
                                                    <label className="block text-sm font-bold text-gray-800 mb-1">
                                                        Password:
                                                    </label>
                                                    <p className="text-xs text-gray-500">
                                                        Tetapkan password yang
                                                        unik untuk melindungi
                                                        akun anda
                                                    </p>
                                                </div>
                                                <div className="w-full sm:w-auto text-right">
                                                    <button
                                                        onClick={() =>
                                                            setIsEditingPassword(
                                                                true
                                                            )
                                                        }
                                                        className="bg-[#005D67] hover:bg-teal-700 text-white px-4 py-2 rounded-full text-xs font-medium"
                                                    >
                                                        Ubah Password
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            <form
                                                onSubmit={handleSubmitPassword}
                                                className="bg-gray-50 p-4 rounded-lg border border-gray-200 animate-fade-in mt-4"
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-sm font-bold text-black">
                                                        Ubah Password
                                                    </h3>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setIsEditingPassword(
                                                                false
                                                            )
                                                        }
                                                        className="text-gray-400 hover:text-red-500"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-xs font-medium text-gray-600 mb-1">
                                                            Password Saat Ini
                                                        </label>
                                                        <input
                                                            type="password"
                                                            value={
                                                                passwordForm
                                                                    .data
                                                                    .current_password
                                                            }
                                                            onChange={(e) =>
                                                                passwordForm.setData(
                                                                    "current_password",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={
                                                                inputClasses
                                                            }
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                Password Baru
                                                            </label>
                                                            <input
                                                                type="password"
                                                                value={
                                                                    passwordForm
                                                                        .data
                                                                        .password
                                                                }
                                                                onChange={(e) =>
                                                                    passwordForm.setData(
                                                                        "password",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClasses
                                                                }
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                Konfirmasi
                                                                Password Baru
                                                            </label>
                                                            <input
                                                                type="password"
                                                                value={
                                                                    passwordForm
                                                                        .data
                                                                        .password_confirmation
                                                                }
                                                                onChange={(e) =>
                                                                    passwordForm.setData(
                                                                        "password_confirmation",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={
                                                                    inputClasses
                                                                }
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="flex justify-end gap-2 mt-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setIsEditingPassword(
                                                                    false
                                                                )
                                                            }
                                                            className="px-3 py-2 text-xs font-medium text-black hover:bg-gray-200 rounded-lg"
                                                        >
                                                            Batal
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                passwordForm.processing
                                                            }
                                                            className="bg-[#005D67] text-white px-4 py-2 rounded-lg text-xs font-medium hover:bg-teal-700 flex items-center gap-2"
                                                        >
                                                            <Save size={14} />{" "}
                                                            Update Password
                                                        </button>
                                                    </div>
                                                </div>
                                            </form>
                                        )}
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
