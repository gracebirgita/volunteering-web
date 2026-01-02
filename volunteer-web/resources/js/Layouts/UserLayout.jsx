// resources/js/Layouts/UserLayout.jsx
import { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import Topbar from "@/Components/Topbar";

export default function UserLayout({
    user,
    children,
    showSidebar = true,
    showTopbar = true,
}) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
            {/* Sidebar */}
            {showSidebar && (
                <MyNavbar
                    user={user}
                    variant="user-sidebar"
                    isOpen={sidebarOpen}
                    setIsOpen={setSidebarOpen}
                />
            )}

            {/* Main Area */}
            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                {showTopbar && (
                    <Topbar
                        user={user}
                        onMenuClick={() => setSidebarOpen(true)}
                    />
                )}

                {/* Page Content */}
                <main
                    className={`flex-1 ${
                        showTopbar ? "p-6 md:p-8" : "p-8"
                    }`}
                >
                    {children}
                </main>
            </div>
        </div>
    );
}
