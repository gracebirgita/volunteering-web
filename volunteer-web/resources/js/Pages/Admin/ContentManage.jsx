import React, { useState } from "react";
import { Head, router, useForm } from '@inertiajs/react';
import MyNavbar from "@/Components/Navbar";
import { Plus, AlertCircle, Trash2, X } from "lucide-react";



export default function ContentManage({ auth, categories, achievements }) {
    const [activeTab, setActiveTab] = useState("kategori");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = auth.user;

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        color: '#14b8a6', 
    });
    
    // Toggle Tab Logic
    const dataList = activeTab === "kategori" 
        ? (categories?.data || [])      
        : (achievements?.data || []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Only submit if we are on the Category tab (Safety check)
        if(activeTab === 'kategori') {
            post(route('admin.category.store'), {
                onSuccess: () => {
                    setIsModalOpen(false);
                    reset();
                },
            });
        }
    };

    const handleToggle = (id) => {
        router.put(route('admin.category.toggle', id));
    };

    const handleDelete = (id) => {
        if(confirm('Apakah anda ingin menghapus kategori ini?')) {
            router.delete(route('admin.category.delete', id));
        }
    };

    return (
       <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800 relative">
            <Head title="Management Konten" />
                        
           <MyNavbar
               user={user}
               variant="admin-sidebar"
               isOpen={sidebarOpen}
               setIsOpen={setSidebarOpen}
           />

            <main className="flex-1 w-full overflow-x-hidden">
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[#005D67]">VolunteerHub</span>
                    </div>
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 focus:outline-none p-1">Menu</button>
                </div>

                <div className="p-6 md:p-10 lg:p-12 max-w-[1600px] mx-auto mt-16 md:mt-0">
                    <div className="mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manajemen Konten</h1>
                        <p className="text-gray-700 mt-2 text-sm md:text-base">Pengaturan Konten Global</p>
                    </div>
                    
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
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            {activeTab === 'kategori' ? 'Daftar Kategori' : 'Daftar Pencapaian'}
                        </h2>
                        <div className="overflow-x-auto max-h-[50vh] overflow-y-auto">
                            <table className="w-full text-left border-collapse min-w-[800px]">
                                <thead className="bg-gray-100 sticky top-0 shadow-sm text-gray-800 z-10">
                                    <tr className="text-xs font-bold text-gray-500 uppercase tracking-wider border-b border-gray-200">
                                        <th className="p-5 border-b border-gray-100">{activeTab === 'kategori' ? 'Nama Kategori' : 'Nama Pencapaian'}</th>
                                        <th className="p-5 border-b border-gray-100 text-right pr-10">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {dataList.map((row, index) => {
                                        return (
                                            <tr key={row.category_id || row.id || index} className="hover:bg-gray-50/50 transition-colors group">
                                                <td className="p-5">
                                                    <div className="flex items-center gap-4">
                                                        {/* Dynamic Color Circle from DB */}
                                                        <div 
                                                            className="w-10 h-10 rounded-full border border-gray-200 shadow-sm"
                                                            style={{ backgroundColor: row.color || '#e5e7eb' }} 
                                                        ></div>
                                                        <span className="font-semibold text-gray-900 text-sm">{row.name}</span>
                                                    </div>                                    
                                                </td>                                    
                                                
                                                <td className="py-4 px-6 text-right flex justify-end items-center gap-2">
                                                    <label className="relative inline-flex items-center cursor-pointer">
                                                            <input type="checkbox" className="sr-only peer" checked={Boolean(row.is_active)} 
                                                                        onChange={() => handleToggle(row.category_id)}/>              
                                                            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-2 peer-focus:ring-teal-300 peer-checked:after:translate-x-full peer-checked:bg-[#14b8a6] after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                                                    </label>
                                                    <button onClick = {() => handleDelete(row.category_id)} 
                                                            className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50"><Trash2 size={18}/></button>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>

                            {/* <div className="p-20 text-center flex flex-col items-center gap-4">
                                <AlertCircle className="text-gray-400" size={32} />
                                <p className="text-gray-900">Coming Soon</p>
                            </div> */}
                            {dataList.length === 0 && (
                                <div className="p-20 text-center flex flex-col items-center gap-4">
                                    <AlertCircle className="text-gray-400" size={32} />
                                    <p className="text-gray-900">Belum ada data. Silahkan tambahkan.</p>
                                </div>
                            )}

                            {activeTab === 'kategori' && (
                                <div className="mt-8 pt-4 border-t border-gray-50">
                                    <button 
                                        onClick={() => setIsModalOpen(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg font-semibold shadow-sm transition-all text-sm"
                                    >
                                        <Plus size={18} strokeWidth={3} />
                                        Tambah Kategori
                                    </button>
                                </div>
                            )}
                            {/* <div className="mt-8 pt-4 border-t border-gray-50">
                                <button onClick = {() => setIsModalOpen(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 bg-[#14b8a6] hover:bg-[#0d9488] text-white rounded-lg font-semibold shadow-sm transition-all text-sm">
                                    <Plus size={18} strokeWidth={3} />
                                    {activeTab === 'kategori' ? 'Tambah Kategori' : 'Tambah Pencapaian'}
                                </button>
                            </div> */}


                        </div>
                    </div>
                </div>
            </main>
        
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden transform transition-all scale-100">
                        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h3 className="text-lg font-bold text-gray-900">
                                {activeTab === 'kategori' ? 'Tambah Kategori Baru' : 'Tambah Pencapaian Baru'}
                            </h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                                <X size={20} />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmit} className="p-6">
                            <div className="mb-6 space-y-4">
                                {/* NAME INPUT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Nama</label>
                                    <input 
                                        type="text" 
                                        value={data.name}
                                        onChange={e => setData('name', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#14b8a6] focus:border-[#14b8a6] transition-all outline-none"
                                        placeholder="Contoh: Lingkungan"
                                        autoFocus
                                    />
                                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                </div>

                                {/* COLOR PICKER INPUT */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Warna Label</label>
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-full">
                                            <input 
                                                type="color" 
                                                value={data.color}
                                                onChange={e => setData('color', e.target.value)}
                                                className="w-full h-10 p-1 rounded-lg border border-gray-300 cursor-pointer"
                                            />
                                        </div>
                                        <div 
                                            className="w-10 h-10 rounded-full border border-gray-200 shadow-sm shrink-0"
                                            style={{ backgroundColor: data.color }}
                                        ></div>
                                    </div>
                                    {errors.color && <p className="text-red-500 text-xs mt-1">{errors.color}</p>}
                                </div>
                            </div>
                            
                            <div className="flex justify-end gap-3">
                                <button 
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                >
                                    Batal
                                </button>
                                <button 
                                    type="submit"
                                    disabled={processing}
                                    className="px-4 py-2 bg-[#14b8a6] hover:bg-[#0d9488] text-white font-medium rounded-lg shadow-sm transition-colors flex items-center gap-2"
                                >
                                    {processing ? 'Menyimpan...' : 'Simpan'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );  
}