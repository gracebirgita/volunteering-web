import { Button, Navbar, NavbarBrand, NavbarCollapse } from "flowbite-react";
import { Link, useForm } from "@inertiajs/react";
import {
    House,
    SquarePlus,
    HandHeart,
    UserRound,
    Settings,
    LogOut,
    X,
    Search,
    Calendar,
    Award,
    Trophy,
    User,
    SlidersHorizontal,
    UserCog,
} from "lucide-react";

export default function MyNavbar({
    user,
    variant = "public",
    isOpen,
    setIsOpen,
}) {
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    const isActive = (pathOrRoute) => {
        try {
            if (pathOrRoute.startsWith("/")) {
                return window.location.pathname.startsWith(pathOrRoute);
            }
            return route().current(pathOrRoute);
        } catch (error) {
            return false;
        }
    };

    const getSidebarLinkClass = (pathOrRoute) => {
        const baseClass =
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ";

        return isActive(pathOrRoute)
            ? baseClass + "bg-teal-50 text-[#005D67] font-semibold"
            : baseClass +
                  "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium";
    };

    // ADMIN SIDEBAR
    if (variant === "admin-sidebar") {
        return (
            <>
                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Sidebar Container */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                        transform transition-transform duration-300 ease-in-out
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex md:flex-col
                    `}
                >
                    {/* Header Sidebar */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                <img
                                    src="/assets/logo-color.png"
                                    alt="LOGO"
                                    className="h-6 w-6 md:h-8 md:w-8 object-contain"
                                />
                            </div>
                            <span className="text-lg md:text-xl font-bold text-[#005D67]">
                                VolunteerHub
                            </span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-gray-500 hover:text-red-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
                        <div>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/dashboard/admin"
                                        className={getSidebarLinkClass(
                                            "/dashboard/admin"
                                        )}
                                    >
                                        <House size={20} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/user-manage"
                                        className={getSidebarLinkClass(
                                            "/Admin/UserManage"
                                        )}
                                    >
                                        <UserCog size={20} /> Manajemen Pengguna
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/content-manage"
                                        className={getSidebarLinkClass(
                                            "Admin/ContentManage"
                                        )}
                                    >
                                        <SlidersHorizontal size={20} />{" "}
                                        Manajemen Konten
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Footer Sidebar */}
                    <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-white shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center text-white">
                                <UserCog size={16} />
                            </div>
                            <span className="text-sm font-semibold text-black truncate">
                                {user?.name || "Admin"}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="text-gray-400 hover:text-red-600"
                        >
                            <LogOut size={18} />
                        </button>
                    </div>
                </aside>
            </>
        );
    }

    // USER SIDEBAR
    if (variant === "user-sidebar") {
        return (
            <>
                {/* Mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                        transform transition-transform duration-300 ease-in-out
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex md:flex-col
                    `}
                >
                    {/* Header Sidebar */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                <img
                                    src="/assets/logo-color.png"
                                    alt="LOGO"
                                    className="h-6 w-6 md:h-8 md:w-8 object-contain"
                                />
                            </div>
                            <span className="text-lg md:text-xl font-bold text-[#005D67]">
                                VolunteerHub
                            </span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-gray-500 hover:text-red-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
                        {/* Utama */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Utama
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/dashboard/user"
                                        className={getSidebarLinkClass(
                                            "/dashboard/user"
                                        )}
                                    >
                                        <House size={20} /> Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/events"
                                        className={getSidebarLinkClass(
                                            "/events"
                                        )}
                                    >
                                        <Search size={20} /> Lihat Event
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/myevents"
                                        className={getSidebarLinkClass(
                                            "/Relawan/MyEvent"
                                        )}
                                    >
                                        <Calendar size={20} /> Event Saya
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Aktivitas */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Aktivitas
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/certificates"
                                        className={getSidebarLinkClass(
                                            "/certificates"
                                        )}
                                    >
                                        <Award size={20} /> Sertifikat
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/achievements"
                                        className={getSidebarLinkClass(
                                            "/achievements"
                                        )}
                                    >
                                        <Trophy size={20} /> Pencapaian
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Akun */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Akun
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href="/profile"
                                        className={getSidebarLinkClass(
                                            "/profile"
                                        )}
                                    >
                                        <User size={20} /> Profil
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href="/settings"
                                        className={getSidebarLinkClass(
                                            "/settings"
                                        )}
                                    >
                                        <Settings size={20} /> Pengaturan
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium"
                                    >
                                        <LogOut size={20} /> Keluar
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </aside>
            </>
        );
    }

    // INSTITUTE SIDEBAR
    if (variant === "sidebar") {
        return (
            <>
                {/* Mobile */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Sidebar Container */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                        transform transition-transform duration-300 ease-in-out
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex md:flex-col
                    `}
                >
                    {/* Header Sidebar */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                <img
                                    src="/assets/logo-color.png"
                                    alt="LOGO"
                                    className="h-6 w-6 md:h-8 md:w-8 object-contain"
                                />
                            </div>
                            <span className="text-lg md:text-xl font-bold text-[#005D67]">
                                VolunteerHub
                            </span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="md:hidden text-gray-500 hover:text-red-500"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
                        {/* Utama */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Utama
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href={route("dashboard.institute")}
                                        className={getSidebarLinkClass(
                                            "dashboard.institute"
                                        )}
                                    >
                                        <House size={20} />
                                        Dashboard
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("institute.create")}
                                        className={getSidebarLinkClass(
                                            "institute.create"
                                        )}
                                    >
                                        <SquarePlus size={20} />
                                        Buat Event
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("institute.organize")}
                                        className={getSidebarLinkClass(
                                            "institute.organize"
                                        )}
                                    >
                                        <SlidersHorizontal size={20} />
                                        Atur Event
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Aktivitas */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Aktivitas
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href={route("institute.appvol")}
                                        className={getSidebarLinkClass(
                                            "institute.appvol"
                                        )}
                                    >
                                        <HandHeart size={20} />
                                        Aplikasi Volunteer
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        {/* Akun */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Akun
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href={route("institute.profile")}
                                        className={getSidebarLinkClass(
                                            "institute.profile"
                                        )}
                                    >
                                        <UserRound size={20} />
                                        Profil Organisasi
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("institute.settings")}
                                        className={getSidebarLinkClass(
                                            "institute.settings"
                                        )}
                                    >
                                        <Settings size={20} />
                                        Pengaturan
                                    </Link>
                                </li>
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-3 px-3 py-2 text-gray-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-colors font-medium"
                                    >
                                        <LogOut size={20} />
                                        Keluar
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>

                    {/* Footer Sidebar */}
                    <div className="p-4 border-t border-gray-100 flex items-center gap-3 bg-white shrink-0">
                        <img
                            src={
                                user?.profile_photo_url ||
                                "/assets/Dashboard/Institute/who.png"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                        <span className="text-sm font-semibold text-gray-700 truncate">
                            {user?.institute?.institute_name ||
                                user?.name ||
                                "Institute"}
                        </span>
                    </div>
                </aside>
            </>
        );
    }

    // PUBLIC NAVBAR
    return (
        <div className="absolute top-0 left-0 w-full h-20 z-50 px-2 sm:px-4 bg-black/30 backdrop-blur-[3px]">
            <Navbar
                fluid={false}
                className="!bg-transparent !border-none px-0 mt-5"
            >
                <NavbarBrand
                    as={Link}
                    href="/"
                    className="flex items-center gap-4"
                >
                    <img
                        src="/assets/logo-color.png"
                        alt="VolunteerHub Logo"
                        className="h-8 w-8 object-contain"
                    />
                    <span className="self-center whitespace-nowrap text-2xl font-bold text-white tracking-tight">
                        Volunteer<span className="text-gray-200">Hub</span>
                    </span>
                </NavbarBrand>

                <div className="flex md:order-2 items-center gap-4">
                    {user ? (
                        <div className="flex items-center gap-4 text-white">
                            <span className="hidden sm:block font-semibold">
                                {user.name}
                            </span>
                            <Button
                                onClick={handleLogout}
                                color="light"
                                pill
                                size="sm"
                                className="!bg-transparent rounded-lg !text-white !border !border-white hover:!bg-white hover:!text-gray-900 focus:ring-0 shadow-none"
                            >
                                Keluar
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2 sm:gap-4">
                            <Link href={route("login")}>
                                <Button
                                    color="light"
                                    size="sm"
                                    className="!bg-transparent rounded-lg whitespace-nowrap !text-white !border-none hover:!text-gray-200 hover:!bg-white/10 focus:ring-0 shadow-none"
                                >
                                    Sign In
                                </Button>
                            </Link>
                            <Link href={route("register")}>
                                <Button
                                    color="light"
                                    size="sm"
                                    className="!bg-transparent rounded-lg !text-white !border !border-white hover:!bg-white hover:!text-gray-900 focus:ring-0 shadow-none"
                                >
                                    Register
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
                <NavbarCollapse className="md:ml-24 md:mr-auto md:w-auto md:block" />
            </Navbar>
        </div>
    );
}
