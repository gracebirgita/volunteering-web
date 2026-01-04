import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import MyNavbar from "@/Components/Navbar";
import Topbar from "@/Components/Topbar";
import EventCard from "@/Components/EventCard";
import { CATEGORY_CONFIG } from "@/Components/AddOns";
import MobileFilterDrawer  from "@/Components/MobileFilterDrawer";


export default function ExploreEvent({
    auth,
    events = [],
    categories = [],
    categoryCounts = {},
    institutes = [],
    locations = [],
    status = [],
    filters: serverFilters,
}) {
    const user = auth.user;

    const {
        data,
        current_page,
        last_page,
        total,
    } = events;


    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filterOpen, setFilterOpen] = useState(false);


    const [filters, setFilters] = useState({
        search: serverFilters.search || "",
        category: serverFilters.category || "",
        institute: serverFilters.institute || "",
        location: serverFilters.location || "",
        status: serverFilters.status || "",
        date: serverFilters.date || "",
    });

    const changePage = (page) => {
        router.get(
            "/events",
            {
                ...filters,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };


    // Debounced Search (Limit Request Search)
    const [debouncedSearch, setDebouncedSearch] = useState(filters.search);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(filters.search);
        }, 400);

        return () => clearTimeout(timer);
    }, [filters.search]);


    useEffect(() => {
        router.get(
            "/events",
            { ...filters, search: debouncedSearch },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    }, [debouncedSearch]);


   const updateFilter = (key, value) => {
        if (key === "reset") {
            const cleared = {
                search: "",
                category: "",
                institute: "",
                location: "",
                status: "",
                date: "",
            };

            setFilters(cleared);

            router.get("/events", cleared, {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            });

            return;
        }

        setFilters((prev) => {
            const next = { ...prev, [key]: value };

            if (key !== "search") {
                router.get("/events", next, {
                    preserveState: true,
                    preserveScroll: true,
                    replace: true,
                });
            }

            return next;
        });
    };

    return (
        <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">
            <Head title="Explore Event" />

            {/* SIDEBAR */}
            <MyNavbar
                user={user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            <div className="flex-1 flex flex-col">
                {/* TOPBAR */}
                <Topbar 
                    user={user}
                    type="explore"
                    searchValue={filters.search}
                    onSearchChange={(value) => updateFilter("search", value)}
                    filters={filters}
                    onFilterRemove={(key) => updateFilter(key, "")}
                    onMenuClick={() => setSidebarOpen(true)}
                />
                <div className="flex flex-row">
                    <div className="flex flex-col px-4 md:px-8 py-6 flex-1">
                        <div className="flex flex-row items-center text-center justify-between mb-5">
                            {/* Pagination Display */}
                            {total > 0 && (
                                <p className="text-sm text-gray-600 mb-4">
                                    Menampilkan <strong>{data.length}</strong> dari{" "}
                                    <strong>{total}</strong> event
                                </p>
                            )}

                            {/* MOBILE FILTER BUTTON */}
                            <div className="flex px-4 md:px-8 mb-2 mt-2 lg:hidden">
                                <button
                                    onClick={() => setFilterOpen(true)}
                                    className="px-4 py-2 rounded-lg bg-white border text-sm font-medium shadow-sm w-2xl"
                                >
                                    Filter
                                </button>
                            </div>
                        </div>
                        {/* MAIN CONTENT */}
                        <main className="flex-1  w-full lg:max-w-7xl lg:mx-auto">
                            <div className="flex flex-col gap-3">
                                <div className="flex-1">
                                    {data.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center  py-32 text-center text-gray-500">
                                            <p className="text-base font-medium">
                                                Tidak ada event yang sesuai filter
                                            </p>
                                            <p className="text-sm mt-1">
                                                Coba ubah atau reset filter yang digunakan
                                            </p>

                                            <button
                                                onClick={() => updateFilter("reset", true)}
                                                className="mt-4 text-sm text-[#33CCB5] underline"
                                            >
                                                Reset filter
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {data.map((event) => (
                                                <EventCard key={event.event_id} event={event} />
                                            ))}
                                        </div>
                                    )}
                                </div>
                               {last_page > 1 && (
                                <div className="sticky bottom-0 z-30 bg-gray-50 pb-5">
                                    <Pagination
                                        currentPage={current_page}
                                        lastPage={last_page}
                                        onPageChange={changePage}
                                    />
                                </div>
                                )}
                            </div>

                        </main>
                    </div>
                    {/* DESKTOP */}
                    {/* RIGHT FILTER PANEL */}
                    <SideFilter
                        categories={categories}
                        categoryCounts={categoryCounts}
                        institutes={institutes}
                        locations={locations}
                        filters={filters}
                        onChange={(key, value) => {
                            // RESET FILTER
                            if (key === "reset") {
                                const cleared = {
                                    search: "",
                                    category: "",
                                    institute: "",
                                    location: "",
                                    status: "",
                                    date: "",
                                };

                                setFilters(cleared);

                                router.get("/events", cleared, {
                                    preserveState: true,
                                    replace: true,
                                    preserveScroll: true,
                                });

                                return;
                            }
                            // NORMAL FILTER CHANGE
                            updateFilter(key, value);
                        }}
                    />
                    
                    {/* MOBILE */}
                    <MobileFilterDrawer
                        open={filterOpen}
                        onClose={() => setFilterOpen(false)}
                    >
                        <SideFilter
                            categories={categories}
                            categoryCounts={categoryCounts}
                            institutes={institutes}
                            locations={locations}
                            filters={filters}
                            onChange={(key, value) => {
                                if (key === "reset") {
                                    const cleared = {
                                        search: "",
                                        category: "",
                                        institute: "",
                                        location: "",
                                        status: "",
                                        date: "",
                                    };

                                    setFilters(cleared);
                                    router.get("/events", cleared, {
                                        preserveState: true,
                                        replace: true,
                                        preserveScroll: true,
                                    });
                                } else {
                                    updateFilter(key, value);
                                }

                                setFilterOpen(false);
                            }}
                            isMobile
                        />
                    </MobileFilterDrawer>
                </div>
            </div>
        </div>
    );
}


import {
    LayoutGrid,
    Building2,
    MapPin,
    CalendarDays,
} from "lucide-react";

function SectionTitle({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <Icon size={18} className="text-gray-700" />
            <h3 className="font-semibold text-sm">{title}</h3>
        </div>
    );
}

function SideFilter({
    isMobile = false,
    categories = [],
    categoryCounts = {},
    institutes = [],
    locations = [],
    filters,
    onChange,
}) {
    return (
        <aside
            className={`
                ${isMobile ? "block" : "hidden lg:flex "}
                flex-col  lg:w-56 
                ${isMobile ? "" : "sticky top-20"}
            `}
        >
            <div className="bg-white  p-5 shadow-sm space-y-6 flex-1">

                {/* KATEGORI */}
                <div>
                    <SectionTitle icon={LayoutGrid} title="Kategori" />

                    <div className="mt-3 space-y-2">
                        {categories.map((cat) => {
                            const cfg = CATEGORY_CONFIG[cat];
                            if (!cfg) return null;

                            const Icon = cfg.icon;
                            const isActive = filters.category === cat;
                            const count = categoryCounts[cat] ?? 0;

                            return (
                                <button
                                    key={cat}
                                    onClick={() =>
                                        onChange("category", isActive ? "" : cat)
                                    }
                                    className={`
                                        w-full flex items-center justify-between
                                        px-4 py-2 rounded-full text-sm font-medium transition
                                        ${
                                            isActive
                                                ? `${cfg.bg} ${cfg.text}`
                                                : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                                        }
                                    `}
                                >
                                    <div className="flex items-center gap-2">
                                        <Icon size={14} />
                                        <span>{cfg.label}</span>
                                    </div>

                                    <span className="text-xs font-semibold opacity-70">
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ORGANISASI */}
                <div>
                    <SectionTitle icon={Building2} title="Organisasi" />
                    <select
                        value={filters.institute}
                        onChange={(e) =>
                            onChange("institute", e.target.value)
                        }
                        className="mt-3 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                        <option value="">Ketik Nama Organisasi</option>
                        {institutes.map((inst) => (
                            <option key={inst} value={inst}>
                                {inst}
                            </option>
                        ))}
                    </select>
                </div>

                {/* LOKASI */}
                <div>
                    <SectionTitle icon={MapPin} title="Lokasi Event" />
                    <select
                        value={filters.location}
                        onChange={(e) =>
                            onChange("location", e.target.value)
                        }
                        className="mt-3 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    >
                        <option value="">Ketik Lokasi</option>
                        {locations.map((loc) => (
                            <option key={loc} value={loc}>
                                {loc}
                            </option>
                        ))}
                    </select>
                </div>

                {/* TANGGAL */}
                <div>
                    <SectionTitle icon={CalendarDays} title="Tanggal Event" />
                    <input
                        type="date"
                        value={filters.date}
                        onChange={(e) =>
                            onChange("date", e.target.value)
                        }
                        className="mt-3 w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                    />
                </div>

                {/* RESET */}
                {(filters.category ||
                    filters.institute ||
                    filters.location ||
                    filters.date) && (
                    <button
                        onClick={() => onChange("reset", true)}
                        className="pt-2 text-sm text-red-500 hover:underline"
                    >
                        Reset Filter
                    </button>
                )}
            </div>
        </aside>
    );
}


function Pagination({
    currentPage,
    lastPage,
    onPageChange,
}) {
    if (lastPage <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-3 mt-10">
            {/* PREV */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    ${
                        currentPage === 1
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white border hover:bg-gray-50"
                    }
                `}
            >
                ← Sebelumnya
            </button>

            {/* BULLETS */}
            <div className="flex gap-2">
                {Array.from({ length: lastPage }).map((_, i) => {
                    const page = i + 1;
                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`
                                w-8 h-8 rounded-full text-sm font-semibold
                                ${
                                    isActive
                                        ? "bg-[#33CCB5] text-black"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                }
                            `}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            {/* NEXT */}
            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className={`
                    px-4 py-2 rounded-lg text-sm font-medium
                    ${
                        currentPage === lastPage
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-white border hover:bg-gray-50"
                    }
                `}
            >
                Selanjutnya →
            </button>
        </div>
    );
}