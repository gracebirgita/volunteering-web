import { Menu } from "lucide-react";

export default function Topbar({ user, onMenuClick }) {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
            {/* Mobile menu */}
            <button
                onClick={onMenuClick}
                className="md:hidden text-gray-600"
            >
                <Menu size={24} />
            </button>

            <div className="ml-auto flex items-center gap-3">
                <span className="hidden sm:block text-sm font-semibold">
                    {user.name}
                </span>
                <img
                    src={user.profile_photo_url || "/assets/avatar.png"}
                    className="w-8 h-8 rounded-full"
                />
            </div>
        </header>
    );
}
