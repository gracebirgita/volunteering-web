import React, { useState } from "react";
import MyNavbar from "@/Components/Navbar";
import { Head, Link } from "@inertiajs/react";
import {
  Menu,
  Search,
  MapPin,
  Calendar,
  Clock,
  LayoutTemplate,
  Sprout,
  UserRound,
  GraduationCap,
  Hospital,
  X,
} from "lucide-react";

export default function MyEvent({ auth, events = [] }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // state filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");

  // data institute
  const institute = auth?.user?.institute || {};
  const instituteName =
    institute.institute_name || auth?.user?.name || "Institute";
  const institutePhoto = institute.institute_logo
    ? `/storage/${institute.institute_logo}`
    : "/assets/Dashboard/Institute/who.png";

  // filtering
  const filteredEvents = events.filter((event) => {
    const matchSearch = (event.event_name || "")
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory
      ? event.category === selectedCategory
      : true;

    let matchDate = true;
    if (selectedDate) {
      matchDate = event.event_start === selectedDate;
    }

    const matchLocation = (event.event_location || "")
      .toLowerCase()
      .includes(searchLocation.toLowerCase());

    return matchSearch && matchCategory && matchDate && matchLocation;
  });

  const getCategoryStyle = (cat) => {
    switch (cat) {
      case "Lingkungan":
        return "bg-[#E7F8F1] text-[#00772A]";
      case "Sosial":
        return "bg-[#FEEDE5] text-[#FF7A00]";
      case "Pendidikan":
        return "bg-[#E7F0FF] text-[#07ACE6]";
      case "Kesehatan":
        return "bg-[#E9FBFF] text-[#33CCB5]";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Lingkungan":
        return <Sprout size={14} />;
      case "Sosial":
        return <UserRound size={14} />;
      case "Pendidikan":
        return <GraduationCap size={14} />;
      case "Kesehatan":
        return <Hospital size={14} />;
      default:
        return <Sprout size={14} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-black relative">
      <Head title="Atur Event - Institute" />

      <MyNavbar
        user={auth?.user}
        variant="sidebar"
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <main className="flex-1 w-full overflow-x-hidden">
        <div className="md:hidden bg-white border-b border-gray-200 p-4 flex justify-between items-center sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#005D67]">VolunteerHub</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-gray-600">
            <Menu size={24} />
          </button>
        </div>

        <div className="p-4 pt-6 md:p-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
            {/* Search bar */}
            <div className="relative w-full md:max-w-xl">
              <input
                type="text"
                placeholder="Cari Event Anda"
                className="w-full pl-10 pr-10 py-3 rounded-full border-none bg-white shadow-sm focus:ring-2 focus:ring-[#005D67] text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search
                className="absolute left-3 top-3 text-gray-400"
                size={20}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-gray-400 hover:text-red-500 transition"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Header */}
            <div className="hidden md:flex justify-end items-center gap-4 mb-6">
              <img
                src={institutePhoto}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border border-gray-200"
              />
              <span className="text-lg font-semibold text-black">
                {instituteName}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              {filteredEvents.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300 text-gray-500">
                  <p className="mb-2">Tidak ada event ditemukan.</p>
                  <button
                    onClick={() => {
                      setSelectedCategory(null);
                      setSearchQuery("");
                      setSelectedDate("");
                      setSearchLocation("");
                    }}
                    className="text-[#005D67] font-bold text-sm hover:underline"
                  >
                    Reset Semua Filter
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredEvents.map((event, index) => (
                    <div
                      key={event.id || index}
                      className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-md transition"
                    >
                      <div className="h-40 bg-gray-200 relative">
                        <img
                          src={
                            event.thumbnail
                              ? `/storage/${event.thumbnail}`
                              : "/assets/landing-page/event1.png"
                          }
                          alt={event.event_name}
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            event.event_status === "active"
                              ? "bg-green-700 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {event.event_status}
                        </span>
                      </div>

                      <div className="p-4 flex flex-col flex-1">
                        <div className="flex gap-2 mb-3">
                          <span
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${getCategoryStyle(
                              event.category
                            )}`}
                          >
                            {getCategoryIcon(event.category)} {event.category}
                          </span>
                          <span className="px-2 py-1 rounded-full bg-[#005D67] text-white text-[10px] font-bold line-clamp-1">
                            {instituteName}
                          </span>
                        </div>

                        <h3 className="font-bold text-black text-sm mb-2 line-clamp-1">
                          {event.event_name}
                        </h3>
                        <p className="text-xs text-gray-500 mb-4 line-clamp-3 leading-relaxed">
                          {event.event_description}
                        </p>

                        <div className="mt-auto space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <Clock size={14} />
                            {new Date(event.event_start).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                              }
                            )}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <MapPin size={14} />
                            {event.event_location &&
                            event.event_location.length > 20
                              ? event.event_location.substring(0, 20) + "..."
                              : event.event_location}
                          </div>
                        </div>

                        <div className="grid gap-2">
                          <Link
                            href={`/institute/events/${event.id}/edit`}
                            className="bg-[#33CCB5] hover:bg-teal-400 text-black py-2 rounded-lg text-xs font-bold transition text-center"
                          >
                            Edit
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar Filter */}
            <div className="lg:col-span-1 space-y-8">
              {/* Kategori */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-black flex items-center gap-2">
                    <LayoutTemplate size={16} /> Kategori
                  </h3>
                  {selectedCategory && (
                    <button
                      onClick={() => setSelectedCategory(null)}
                      className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
                    >
                      <X size={12} className="mr-1" /> Reset
                    </button>
                  )}
                </div>
                <div className="space-y-3">
                  {[
                    "Lingkungan",
                    "Sosial",
                    "Pendidikan",
                    "Kesehatan",
                  ].map((cat, idx) => {
                    const isSelected = selectedCategory === cat;
                    return (
                      <button
                        key={idx}
                        onClick={() =>
                          setSelectedCategory(isSelected ? null : cat)
                        }
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-full text-xs font-bold transition border-2
                        ${
                          isSelected
                            ? `border-[#005D67] opacity-100 ${getCategoryStyle(
                                cat
                              )}`
                            : `border-transparent hover:opacity-80 ${getCategoryStyle(
                                cat
                              )}`
                        }`}
                      >
                        {getCategoryIcon(cat)} {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lokasi */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-black flex items-center gap-2">
                    <MapPin size={16} /> Lokasi Event
                  </h3>
                  {searchLocation && (
                    <button
                      onClick={() => setSearchLocation("")}
                      className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
                    >
                      <X size={12} className="mr-1" /> Reset
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ketik Lokasi..."
                    className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                  />
                  <Search
                    className="absolute right-3 top-3 text-gray-400 pointer-events-none"
                    size={14}
                  />
                </div>
              </div>

              {/* Tanggal */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-black flex items-center gap-2">
                    <Calendar size={16} /> Tanggal Event
                  </h3>
                  {selectedDate && (
                    <button
                      onClick={() => setSelectedDate("")}
                      className="text-[10px] text-red-500 font-bold flex items-center hover:underline"
                    >
                      <X size={12} className="mr-1" /> Reset
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input
                    type="date"
                    className="w-full bg-white border-none rounded-lg py-3 px-4 text-xs shadow-sm focus:ring-1 focus:ring-[#005D67] placeholder:text-gray-400"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="w-full flex justify-center pt-10">
                <img
                  src="/assets/Dashboard/Institute/image1.png"
                  alt="image"
                  className="w-48 object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}