import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarCollapse,
    NavbarLink,
} from "flowbite-react";
import { Link, useForm } from "@inertiajs/react";

export default function MyNavbar({ user }) {
    const isRouteActive = (routeName) => {
        try {
            return route().current(routeName);
        } catch (error) {
            return false;
        }
    };
    const { post } = useForm();

    const handleLogout = (e) => {
        e.preventDefault();
        post(route("logout"));
    };

    const navLinkClasses =
        "text-base font-medium text-white hover:text-gray-300 transition-colors duration-200 cursor-pointer " +
        "!border-none !shadow-none !bg-transparent focus:!border-none focus:!ring-0 " +
        "aria-[current=page]:text-white aria-[current=page]:font-semibold";

    return (
        <div className="absolute top-0 left-0 w-full h-20 z-50 px-2 sm:px-4 bg-black/30 backdrop-blur-[3px]">
            <Navbar
                fluid={false}
                className="!bg-transparent !border-none px-0 mt-5"
            >
                {/* LOGO */}
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
                    {/* USER NAVBAR (RAW VER) */}
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

                            <Link href={route("events.index")}>
                                <Button
                                    color="light"
                                    pill
                                    size="sm"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                                >
                                    Lihat Event
                                </Button>
                            </Link>
                            <Link href={route("myevents.index")}>
                                <Button
                                    color="light"
                                    pill
                                    size="sm"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                                >
                                    Event Saya
                                </Button>
                            </Link>
                            <Link href={route("volunteer.profile")}>
                                <Button
                                    color="light"
                                    pill
                                    size="sm"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                                >
                                    Profil
                                </Button>
                            </Link>
                            <Link href={route("volunteer.settings")}>
                                <Button
                                    color="light"
                                    pill
                                    size="sm"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white hover:text-gray-900 backdrop-blur-sm"
                                >
                                    Pengaturan
                                </Button>
                            </Link>
                            <Link href={route("volunteer.settings")}>
                                <Button
                                    onClick={handleLogout}
                                    color="light"
                                    pill
                                    size="sm"
                                    className="bg-white/10 text-white border-white/20 hover:bg-white hover:bg-red-700 backdrop-blur-sm"
                                >
                                    Keluar
                                </Button>
                            </Link>

                        </div>
                    ) : (
                        // GUEST NAVBAR
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

                <NavbarCollapse 
                    className="md:ml-24 md:mr-auto md:w-auto md:block [&>ul]:md:flex-row [&>ul]:md:gap-8 [&>ul]:mt-0"
                >
                    {/* <NavbarLink
                        as={Link}
                        href={route("home")}
                        active={isRouteActive("home")}
                        className={navLinkClasses}
                    >
                        Home
                    </NavbarLink> */}
                </NavbarCollapse>
            </Navbar>
        </div>
    );
}