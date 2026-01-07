import { X } from "lucide-react";

export default function MobileFilterDrawer({
    open,
    onClose,
    children,
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 lg:hidden">
            {/* BACKDROP */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={onClose}
            />

            {/* DRAWER */}
            <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-xl flex flex-col">
                <div className="flex items-center justify-between p-4 border-b">
                    <h3 className="font-semibold">Filter Event</h3>
                    <button onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
