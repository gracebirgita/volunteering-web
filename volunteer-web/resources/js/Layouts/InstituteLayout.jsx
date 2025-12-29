import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Menu } from "lucide-react";

export default function InstituteLayout({ user, children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
            
            {/* Navbar (Sidebar) */}
            <MyNavbar 
                user={user} 
                variant="sidebar" 
                isOpen={sidebarOpen} 
                setIsOpen={setSidebarOpen} 
            />

            {/* MAIN CONTENT */}
            <main className="flex-1 w-full overflow-x-hidden">
                {/* Mobile Header */}
                <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-30 shadow-sm h-16">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold">
                            <img src="/assets/logo-color.png" alt="Logo" className="h-5 w-5 object-contain" />
                        </div>
                        <span className="font-bold text-[#005D67]">VolunteerHub</span>
                    </div>
                    <button onClick={() => setSidebarOpen(true)} className="text-gray-600 focus:outline-none p-1">
                        <Menu size={24} />
                    </button>
                </div>

                {/* Content Container */}
                <div className="p-4 pt-20 md:p-8 md:pt-8">
                    {children}
                </div>
            </main>
        </div>
    );
}