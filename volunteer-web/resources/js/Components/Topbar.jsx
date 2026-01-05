import { Menu, Search, X } from "lucide-react";
import { CATEGORY_CONFIG } from "@/Components/AddOns";



function FilterChip({ label, onRemove, className = "" }) {
    return (
        <div
            className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${className}`}
        >
            <span className="line-clamp-1">{label}</span>
            <button onClick={onRemove} className="hover:opacity-70">
                <X size={12} />
            </button>
        </div>
    );
}

export default function Topbar({
    user,
    onMenuClick,
    type = "default",
    searchValue = "",
    onSearchChange,
    filters,
    onFilterRemove,
}) {
    return (
        <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-2">
            <div className="flex items-center gap-4">
                {/* BURGER */}
                <button onClick={onMenuClick} className="lg:hidden text-gray-600">
                    <Menu size={24} />
                </button>

                {/* SEARCH */}
                {type === "explore" && (
                    <div className="relative flex-1 max-w-xl">
                        <Search
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(e) =>
                                onSearchChange?.(e.target.value)
                            }
                            placeholder="Cari kegiatan, organisasi, atau kategori..."
                            className="
                                w-full
                                pl-11 pr-4 py-2
                                rounded-full
                                bg-white
                                border border-gray-300
                                focus:bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#33CCB5]/30
                                text-sm
                            "
                        />
                    </div>
                )}

                {/* PROFILE */}
                <div className="ml-auto flex items-center gap-4">
                    <span className="hidden sm:block text-sm font-semibold">
                        {user?.user_name}
                    </span>
                    <img
                        src={user?.avatar_url}
                        alt={user?.user_name}
                        className="w-10 h-10 rounded-full object-cover border"
                    />
                </div>
            </div>

            {/* FILTER CHIPS */}
            {type === "explore" && filters && (
                <div className="mt-2 flex flex-wrap gap-2">
                    {filters.category && CATEGORY_CONFIG[filters.category] && (
                        <FilterChip
                            label={CATEGORY_CONFIG[filters.category].label}
                            className={`${CATEGORY_CONFIG[filters.category].bg} ${CATEGORY_CONFIG[filters.category].text}`}
                            onRemove={() => onFilterRemove("category")}
                        />
                    )}

                    {filters.institute && (
                        <FilterChip
                            label={filters.institute}
                            className="bg-gray-100 text-gray-700"
                            onRemove={() => onFilterRemove("institute")}
                        />
                    )}

                    {filters.location && (
                        <FilterChip
                            label={filters.location}
                            className="bg-gray-100 text-gray-700"
                            onRemove={() => onFilterRemove("location")}
                        />
                    )}

                    {filters.date && (
                        <FilterChip
                            label={filters.date}
                            className="bg-gray-100 text-gray-700"
                            onRemove={() => onFilterRemove("date")}
                        />
                    )}
                </div>
            )}
        </header>
    );
}
