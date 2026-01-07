import { Head, router } from "@inertiajs/react";
import { useState, useEffect } from "react";
import MyNavbar from "@/Components/Navbar";
import Topbar from "@/Components/Topbar";
import EventCard from "@/Components/EventCard";
import MobileFilterDrawer from "@/Components/MobileFilterDrawer";
import { hexToRgba } from "@/Utils/Color";
import {
    LayoutGrid,
    Building2,
    MapPin,
    CalendarDays,
} from "lucide-react";

/* ======================================================
   PAGE
====================================================== */
export default function ExploreEvent({
    auth,
    events = {},
    categories = [],
    categoryCounts = {},
    institutes = [],
    locations = [],
    profileUser,
    filters: serverFilters,
}) {
    const user = auth.account;

    const {
        data = [],
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
        date: serverFilters.date || "",
    });

    /* =========================
       PAGINATION (JANGAN DIUBAH)
    ========================= */
    const changePage = (page) => {
        router.get(
            "/events",
            { ...filters, page },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            }
        );
    };

    /* =========================
       SEARCH DEBOUNCE
    ========================= */
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

    /* =========================
       FILTER HANDLER
    ========================= */
    const updateFilter = (key, value) => {
        if (key === "reset") {
            const cleared = {
                search: "",
                category: "",
                institute: "",
                location: "",
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
        <div className="flex min-h-screen bg-gray-50 text-gray-800">
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
                    user={profileUser}
                    type="explore"
                    searchValue={filters.search}
                    onSearchChange={(v) => updateFilter("search", v)}
                    filters={filters}
                    categories={categories}   
                    onFilterRemove={(k) => updateFilter(k, "")}
                    onMenuClick={() => setSidebarOpen(true)}
                />

                <div className="flex">
                    {/* MAIN */}
                    <div className="flex-1 px-4 md:px-8 py-6">
                        {total > 0 && (
                            <p className="text-sm text-gray-600 mb-4">
                                Menampilkan <strong>{data.length}</strong> dari{" "}
                                <strong>{total}</strong> event
                            </p>
                        )}

                        <main className="lg:max-w-7xl lg:mx-auto">
                            {data.length === 0 ? (
                                <EmptyState
                                    onReset={() => updateFilter("reset", true)}
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {data.map((event) => (
                                        <EventCard
                                            key={event.event_id}
                                            event={event}
                                        />
                                    ))}
                                </div>
                            )}

                            {last_page > 1 && (
                                <div className="sticky bottom-0 z-30 bg-gray-50 pb-5">
                                    <Pagination
                                        currentPage={current_page}
                                        lastPage={last_page}
                                        onPageChange={changePage}
                                    />
                                </div>
                            )}
                        </main>
                    </div>

                    {/* DESKTOP FILTER */}
                    <SideFilter
                        categories={categories}
                        categoryCounts={categoryCounts}
                        institutes={institutes}
                        locations={locations}
                        filters={filters}
                        onChange={updateFilter}
                    />
                </div>

                {/* MOBILE FILTER */}
                <MobileFilterDrawer
                    open={filterOpen}
                    onClose={() => setFilterOpen(false)}
                >
                    <SideFilter
                        isMobile
                        categories={categories}
                        categoryCounts={categoryCounts}
                        institutes={institutes}
                        locations={locations}
                        filters={filters}
                        onChange={(k, v) => {
                            updateFilter(k, v);
                            setFilterOpen(false);
                        }}
                    />
                </MobileFilterDrawer>
            </div>
        </div>
    );
}

/* ======================================================
   COMPONENTS
====================================================== */

function SectionTitle({ icon: Icon, title }) {
    return (
        <div className="flex items-center gap-2 pb-2 border-b border-gray-200">
            <Icon size={18} />
            <h3 className="font-semibold text-sm">{title}</h3>
        </div>
    );
}

/* =========================
   SIDE FILTER (KATEGORI PILL)
   ⬅️ INI SATU-SATUNYA BAGIAN
      YANG DIUBAH VISUALNYA
========================= */
function SideFilter({
    isMobile = false,
    categories,
    categoryCounts,
    institutes,
    locations,
    filters,
    onChange,
}) {
    return (
        <aside
            className={`
                ${isMobile ? "block" : "hidden lg:flex"}
                flex-col lg:w-56
                ${isMobile ? "" : "sticky top-20"}
            `}
        >
            <div className="bg-white p-5 shadow-sm space-y-6">
                {/* KATEGORI */}
                <div>
                    <SectionTitle icon={LayoutGrid} title="Kategori" />
                    <div className="mt-3 space-y-2">
                        {categories.map((cat) => {
                            const isActive = filters.category === cat.slug;
                            const count = categoryCounts[cat.slug] ?? 0;

                            return (
                                <button
                                    key={cat.slug}
                                    onClick={() =>
                                        onChange(
                                            "category",
                                            isActive ? "" : cat.slug
                                        )
                                    }
                                    className="w-full flex items-center justify-between px-4 py-2 rounded-full text-sm font-medium transition"
                                    style={{
                                        backgroundColor: hexToRgba(cat.color, 0.15),
                                        color: cat.color,
                                        border: `${isActive ? 2 : 1}px solid ${hexToRgba(
                                            cat.color,
                                            0.6
                                        )}`,
                                    }}
                                >
                                    <span>{cat.name}</span>
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
                        className="mt-3 w-full px-3 py-2 border rounded-lg text-sm"
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
                        className="mt-3 w-full px-3 py-2 border rounded-lg text-sm"
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
                        className="mt-3 w-full px-3 py-2 border rounded-lg text-sm"
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

/* =========================
   PAGINATION (ASLI – TIDAK DIUBAH)
========================= */
function Pagination({ currentPage, lastPage, onPageChange }) {
    if (lastPage <= 1) return null;

    return (
        <div className="flex items-center justify-center gap-3 mt-10">
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === 1
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white border hover:bg-gray-50"
                }`}
            >
                ← Sebelumnya
            </button>

            <div className="flex gap-2">
                {Array.from({ length: lastPage }).map((_, i) => {
                    const page = i + 1;
                    const isActive = page === currentPage;

                    return (
                        <button
                            key={page}
                            onClick={() => onPageChange(page)}
                            className={`w-8 h-8 rounded-full text-sm font-semibold ${
                                isActive
                                    ? "bg-[#33CCB5] text-black"
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            {page}
                        </button>
                    );
                })}
            </div>

            <button
                disabled={currentPage === lastPage}
                onClick={() => onPageChange(currentPage + 1)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === lastPage
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white border hover:bg-gray-50"
                }`}
            >
                Selanjutnya →
            </button>
        </div>
    );
}

function EmptyState({ onReset }) {
    return (
        <div className="py-32 text-center text-gray-500">
            <p className="font-medium">
                Tidak ada event yang sesuai filter
            </p>
            <button
                onClick={onReset}
                className="mt-4 text-sm text-[#33CCB5] underline"
            >
                Reset filter
            </button>
        </div>
    );
}
