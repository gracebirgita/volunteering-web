import { Button, Navbar, NavbarBrand, NavbarCollapse } from "flowbite-react";
import { Link, useForm } from "@inertiajs/react";
import {
    House,
    SquarePlus,
    CalendarDays,
    HandHeart,
    UserRound,
    ClipboardList,
    Settings,
    LogOut,
    X,
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

    // untuk cek route aktif
    const isActive = (routeName) => {
        try {
            return route().current(routeName);
        } catch (error) {
            return false;
        }
    };

    const getSidebarLinkClass = (routeName) => {
        const baseClass =
            "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ";
        return isActive(routeName)
            ? baseClass + "bg-teal-50 text-[#005D67] font-semibold" // Style Aktif
            : baseClass +
                  "text-gray-500 hover:bg-gray-50 hover:text-gray-900 font-medium"; // Style Tidak Aktif
    };

    // SIDEBAR DASHBOARD
    if (variant === "sidebar") {
        return (
            <>
                {/* Mobile Overlay */}
                {isOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={() => setIsOpen(false)}
                    ></div>
                )}

                {/* Sidebar Container */}
                <aside
                    className={`
                        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 
                        transform transition-transform duration-300 ease-in-out
                        ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        md:translate-x-0 md:static md:h-screen md:flex md:flex-col
                    `}
                >
                    {/* Header Sidebar */}
                    <div className="p-6 flex items-center justify-between">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 md:w-12 md:h-12 bg-[#005D67] rounded-full flex items-center justify-center text-white font-bold shrink-0">
                                <img
                                    src="/assets/logo-color.png"
                                    alt="VH"
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
                                        Create Event
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        href={route("institute.organize")}
                                        className={getSidebarLinkClass(
                                            "institute.organize"
                                        )}
                                    >
                                        <CalendarDays size={20} />
                                        Atur Event
                                    </Link>
                                </li>
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

                        {/* Aktivitas */}
                        <div>
                            <p className="text-xs font-semibold text-black mb-3 px-2">
                                Aktivitas
                            </p>
                            <ul className="space-y-1">
                                <li>
                                    <Link
                                        href={route("institute.attendance")}
                                        className={getSidebarLinkClass(
                                            "institute.attendance"
                                        )}
                                    >
                                        <ClipboardList size={20} />
                                        Atur Absensi
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
                    <div className="p-4 border-gray-100 flex items-center gap-3 bg-white">
                        <img
                            src={
                                user?.profile_photo_url ||
                                "/assets/Dashboard/Institute/who.png"
                            }
                            alt="Profile"
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                        />
                        <span className="text-sm font-semibold text-gray-700 truncate">
                            {user?.name || "Institute"}
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
                            <Link href={route("dashboard.user")}>
                                <Button
                                    color="light"
                                    pill
                                    size="sm"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                                >
                                    Dashboard
                                </Button>
                            </Link>
                            <Button
                                onClick={handleLogout}
                                color="light"
                                pill
                                size="sm"
                                className="bg-white/10 text-white border-white/20 hover:bg-white hover:bg-red-700 backdrop-blur-sm"
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
