import {
    Leaf,
    Users,
    GraduationCap,
    HeartPulse,
} from "lucide-react";

export const CATEGORY_CONFIG = {
    Lingkungan: {
        label: "Lingkungan",
        icon: Leaf,
        bg: "bg-green-100",
        text: "text-green-700",
    },
    Sosial: {
        label: "Social",
        icon: Users,
        bg: "bg-orange-100",
        text: "text-orange-600",
    },
    Pendidikan: {
        label: "Pendidikan",
        icon: GraduationCap,
        bg: "bg-blue-100",
        text: "text-blue-600",
    },
    Kesehatan: {
        label: "Kesehatan",
        icon: HeartPulse,
        bg: "bg-teal-100",
        text: "text-teal-600",
    },
};

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

    const categoryConfig = category
        ? CATEGORY_CONFIG[category]
        : null;

    const statusConfig = status
        ? STATUS_CONFIG[status]
        : null;

    return (
        <div className="flex items-center gap-3 flex-wrap">
            {categoryConfig && (
                <div
                    className={`flex items-center gap-2 px-4 py-1 rounded-full text-xs font-semibold line-clamp-1
                        ${categoryConfig.bg} ${categoryConfig.text}`}
                >
                    <categoryConfig.icon size={12} />
                    <span>{categoryConfig.label}</span>
                </div>
            )}

            {organizer && (
                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium truncate max-w-[140px]">
                    {organizer}
                </span>
            )}

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
