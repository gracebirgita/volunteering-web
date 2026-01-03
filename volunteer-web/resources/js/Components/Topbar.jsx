import { Menu } from "lucide-react";
import { useMemo } from "react";

const PROFILE_PLACEHOLDERS = [
    "/assets/Placeholder/placeholder_profile1.png",
    "/assets/Placeholder/placeholder_profile2.png",
    "/assets/Placeholder/placeholder_profile3.png",
];


export default function Topbar({ user, onMenuClick }) {

    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    const placeholderAvatar = useMemo(
        () => getRandomItem(PROFILE_PLACEHOLDERS),
        []
    );

   
    const avatarSrc = user.profile_picture
        ? `/storage/${user.profile_picture}`
        : placeholderAvatar;

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-6">
            <button
                onClick={onMenuClick}
                className="md:hidden text-gray-600"
            >
                <Menu size={24} />
            </button>

            <div className="ml-auto flex items-center gap-5">
                <span className="hidden sm:block text-sm font-semibold">
                    {user.user_name}
                </span>

                <img
                    src={avatarSrc}
                    alt={user.user_name}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
        </header>
    );
}
