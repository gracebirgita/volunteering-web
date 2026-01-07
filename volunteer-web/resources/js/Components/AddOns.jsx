import { hexToRgba } from "@/Utils/Color";

const STATUS_CONFIG = {
    active: {
        label: "Active",
        bg: "bg-green-500",
        text: "text-white",
    },
    finished: {
        label: "Closed",
        bg: "bg-red-500",
        text: "text-white",
    },
};

export default function AddOns({ category, organizer, status }) {
    if (!category && !organizer && !status) return null;

    const statusConfig = status ? STATUS_CONFIG[status] : null;

    return (
        <div className="flex items-center gap-2 flex-wrap">
            {/* CATEGORY */}
            {category && (
                <span
                    className="px-3 py-1 rounded-full text-xs font-semibold border"
                    style={{
                        backgroundColor: hexToRgba(category.color, 0.15),
                        color: category.color,
                        borderColor: hexToRgba(category.color, 0.4),
                    }}
                >
                    {category.name}
                </span>
            )}

            {/* ORGANIZER */}
            {organizer && (
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium truncate max-w-[140px]">
                    {organizer}
                </span>
            )}

            {/* STATUS */}
            {statusConfig && (
                <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${statusConfig.bg} ${statusConfig.text}`}
                >
                    {statusConfig.label}
                </span>
            )}
        </div>
    );
}
