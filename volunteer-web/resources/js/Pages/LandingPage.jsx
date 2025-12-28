import { useState } from "react";
import { route } from "ziggy-js";
import { Head, Link } from "@inertiajs/react";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";

export default function LandingPage({ auth }) {
    // STATE UNTUK SLIDE DAN PAGINATION
    const [currentActPage, setCurrentActPage] = useState(0); // Untuk Section 6
    const [currentTestiPage, setCurrentTestiPage] = useState(0); // Untuk Section 8

    const [openFaq, setOpenFaq] = useState(0);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? -1 : index);
    };

    // DATA DUMMY
    const allActivities = [
        {
            title: "Aksi Bersih Pantai Balekambang",
            desc: "Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem pantai tetap lestari.",
            date: "14-12-2025",
            location: "Pantai Balekambang, Malang",
            image: "/assets/landing-page/event1.png",
        },
        {
            title: "Kelas Ceria Membaca",
            desc: "Mengajar anak-anak membaca sambil bermain untuk meningkatkan minat literasi sejak dini.",
            date: "21-12-2025",
            location: "Taman baca, Surabaya",
            image: "/assets/landing-page/event2.png",
        },
        {
            title: "Dapur Umum Warga",
            desc: "Masak dan membagikan makanan hangat untuk keluarga yang membutuhkan di area pemukiman.",
            date: "28-12-2025",
            location: "Posko Komunitas RW 03",
            image: "/assets/landing-page/event3.png",
        },
        {
            title: "Aksi pembersihan",
            desc: "Bergabung untuk membersihkan sampah plastik dan menjaga ekosistem pantai tetap lestari.",
            date: "11-12-2025",
            location: "Pantai Kuta, Malang",
            image: "/assets/landing-page/event1.png",
        },
        {
            title: "Belajar Membaca",
            desc: "Mengajar anak-anak membaca sambil bermain untuk meningkatkan minat literasi sejak dini.",
            date: "11-12-2025",
            location: "Rumah Baca Pelangi, Surabaya",
            image: "/assets/landing-page/event2.png",
        },
        {
            title: "Masak Bersama Warga",
            desc: "Masak dan membagikan makanan hangat untuk keluarga yang membutuhkan di area pemukiman.",
            date: "22-12-2025",
            location: "Kompleks perumahan A",
            image: "/assets/landing-page/event3.png",
        },
    ];

    const actPerPage = 3;
    const totalActPages = Math.ceil(allActivities.length / actPerPage);

    const handlePrevAct = () => {
        setCurrentActPage((prev) =>
            prev === 0 ? totalActPages - 1 : prev - 1
        );
    };
    const handleNextAct = () => {
        setCurrentActPage((prev) =>
            prev === totalActPages - 1 ? 0 : prev + 1
        );
    };
    const currentActivities = allActivities.slice(
        currentActPage * actPerPage,
        (currentActPage + 1) * actPerPage
    );

    const faqs = [
        {
            question: "Apa itu VolunteerHub?",
            answer: "VolunteerHub adalah platform yang menghubungkan relawan dengan berbagai kegiatan sosial, lingkungan, dan pendidikan secara mudah dan cepat.",
        },
        {
            question: "Apakah saya harus membayar untuk bergabung?",
            answer: "Tidak, bergabung dengan VolunteerHub sepenuhnya gratis untuk relawan.",
        },
        {
            question: "Bagaimana cara mendaftar sebagai relawan?",
            answer: "Cukup klik tombol daftar di pojok kanan atas, isi data diri, dan Anda siap memilih kegiatan.",
        },
        {
            question: "Apakah pengalaman sebelumnya diperlukan?",
            answer: "Sebagian besar kegiatan tidak memerlukan pengalaman khusus, hanya niat baik dan semangat!",
        },
        {
            question: "Apakah saya bisa membatalkan keikutsertaan?",
            answer: "Ya, Anda bisa membatalkan melalui dashboard profil Anda minimal 24 jam sebelum acara dimulai.",
        },
    ];

    const allTestimonials = [
        {
            id: 1,
            name: "Alya Pramesti",
            role: "Mahasiswa & Relawan Pendidikan",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi1.png",
        },
        {
            id: 2,
            name: "Raka Wijaya",
            role: "Karyawan Swasta & Relawan Lingkungan",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi2.png",
        },
        {
            id: 3,
            name: "Siti Handayani",
            role: "Ibu Rumah Tangga & Relawan Sosial",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi3.png",
        },
        {
            id: 4,
            name: "Laras Nuraini",
            role: "Mahasiswa & Relawan Pendidikan",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi1.png",
        },
        {
            id: 5,
            name: "Budiyanto",
            role: "Karyawan Swasta & Relawan Lingkungan",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi2.png",
        },
        {
            id: 6,
            name: "Lili Nur",
            role: "Ibu Rumah Tangga & Relawan Sosial",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi3.png",
        },
        {
            id: 7,
            name: "Tiya Mawar",
            role: "Mahasiswa & Relawan Pendidikan",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi1.png",
        },
        {
            id: 8,
            name: "Udin Wijaya",
            role: "Karyawan Swasta & Relawan Lingkungan",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi2.png",
        },
        {
            id: 9,
            name: "Jasmine",
            role: "Ibu Rumah Tangga & Relawan Sosial",
            quote: "Lewat VolunteerHub, aku jadi lebih mudah menemukan kegiatan yang benar-benar sesuai minat. Prosesnya cepat, dan setiap aksi terasa berdampak.",
            image: "/assets/landing-page/testi3.png",
        },
    ];

    // Logika Pagination Section 8
    const itemsPerPage = 3;
    const totalTestiPages = Math.ceil(allTestimonials.length / itemsPerPage);
    const currentTestimonials = allTestimonials.slice(
        currentTestiPage * itemsPerPage,
        (currentTestiPage + 1) * itemsPerPage
    );

    return (
        <>
            <Head title="Selamat Datang" />

            {/* SECTION 1: HERO & NAVBAR */}
            <div className="min-h-screen relative overflow-hidden bg-[url('/assets/landing-page/lp-1.png')] bg-cover bg-center bg-no-repeat flex flex-col">
                <div className="absolute inset-0 bg-black/70 z-0"></div>

                {/* Navbar  */}
                <div className="fixed top-0 left-0 w-full z-50">
                    <Navbar user={auth.user} />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 flex-grow px-4 flex items-center justify-center pb-32">
                    <div className="max-w-7xl mx-auto text-center text-white">
                        <h1 className="font-['Playwrite_NO'] text-5xl md:text-5xl font-extrabold mb-6 leading-tight drop-shadow-lg">
                            Bantu Sesama, Bangun Indonesia
                        </h1>
                        <p className="text-xl md:text-xl text-gray-200 mb-10 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
                            "Ikuti program sosial dari komunitas dan organisasi
                            terpercaya, lalu berikan kontribusi nyata untuk
                            mendukung masyarakat yang membutuhkan."
                        </p>

                        {/* Tombol CTA */}
                        {!auth.user ? (
                            <div className="flex flex-col sm:flex-row justify-center gap-4">
                                <Link
                                    href={route("register")}
                                    className="px-8 py-4 bg-[#33CCB5] text-black font-bold rounded-xl hover:bg-[#28A08D] transition shadow-lg text-lg w-fit mx-auto"
                                >
                                    Cari Aktivitas
                                </Link>
                            </div>
                        ) : (
                            <Link
                                href={route("login")}
                                className="px-8 py-4 bg-[#33CCB5] text-black font-bold rounded-xl hover:bg-[#28A08D] transition shadow-lg text-lg inline-block"
                            >
                                Ke Dashboard Saya
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* SECTION 2 */}
            <div className="relative z-30 -mt-32 px-4">
                <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-10 flex flex-col md:flex-row items-center justify-around gap-8 text-center md:text-left">
                    {/* Item 1 */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/assets/landing-page/icons/give.png"
                            alt="Icon"
                            className="w-12 h-12 object-contain"
                        />
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900">
                                60.123
                            </h3>
                            <p className="text-gray-600 font-medium">
                                Total Relawan
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-16 bg-black"></div>

                    {/* Item 2 */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/assets/landing-page/icons/hand.png"
                            alt="Icon"
                            className="w-12 h-12 object-contain"
                        />
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900">
                                512
                            </h3>
                            <p className="text-gray-600 font-medium">
                                Total Institut
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="hidden md:block w-px h-16 bg-black"></div>

                    {/* Item 3 */}
                    <div className="flex items-center gap-4">
                        <img
                            src="/assets/landing-page/icons/bag.png"
                            alt="Icon"
                            className="w-12 h-12 object-contain"
                        />
                        <div>
                            <h3 className="text-3xl font-extrabold text-gray-900">
                                22.123
                            </h3>
                            <p className="text-gray-600 font-medium">
                                Total Event
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 3 */}
            <div className="min-h-screen bg-[#005D67] text-white pt-96 md:pt-20 pb-0 -mt-60 md:-mt-20 z-10 relative overflow-hidden flex items-end">
                <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center h-full">
                    <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-neutral-900 via-neutral-900/50 to-transparent z-10"></div>

                    {/* KOLOM KIRI */}
                    <div className="lg:col-span-5 relative z-20 pb-20 lg:pb-0 self-center mb-10 lg:mb-0">
                        <h2 className="text-5xl md:text-6xl font-['Playwrite_NO'] leading-tight mb-14">
                            Platform relawan untuk <br />
                            aksi sosial{" "}
                            <span className="text-[#FF7A00]">Indonesia.</span>
                        </h2>

                        <div className="space-y-8">
                            {/* Poin 1 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 mt-2 bg-[#FF7A00] text-white font-bold flex items-center justify-center rounded-md text-xl shadow-lg">
                                    1
                                </div>
                                <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
                                    <span className="text-[#FF7A00] font-bold">
                                        VolunteerHub
                                    </span>{" "}
                                    membantu kamu menemukan kegiatan sosial yang
                                    terpercaya dan relevan di seluruh Indonesia.
                                </p>
                            </div>

                            {/* Poin 2 */}
                            <div className="flex gap-4">
                                <div className="flex-shrink-0 w-10 h-10 mt-2 bg-[#FF7A00] text-white font-bold flex items-center justify-center rounded-md text-xl shadow-lg">
                                    2
                                </div>
                                <p className="text-xl md:text-2xl leading-relaxed text-gray-200">
                                    Dengan platform yang{" "}
                                    <span className="text-[#FF7A00] font-bold">
                                        sederhana dan mudah digunakan
                                    </span>
                                    , kamu bisa memilih aksi yang sesuai minat
                                    serta langsung terhubung dengan komunitas
                                    yang membutuhkan.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* KOLOM KANAN: GAMBAR */}
                    <div className="relative flex justify-center lg:justify-end lg:col-span-7 h-full items-end">
                        <img
                            src="/assets/landing-page/lp-2.png"
                            alt="Volunteer Person"
                            className="relative z-10 w-full lg:w-[160%] max-w-none lg:-mr-64 transform scale-105 origin-bottom-left drop-shadow-2xl"
                        />
                    </div>
                </div>
            </div>

            {/* SECTION 4 */}
            <div className="py-24 bg-white relative z-20 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header Judul */}
                    <div className="text-center mb-16 md:mb-24">
                        <h2 className="text-4xl md:text-6xl font-['Playwrite_NO'] text-black mb-8 relative inline-block">
                            Kenapa Pilih
                        </h2>
                        <h2 className="text-4xl md:text-6xl font-extrabold font-['Playwrite_NO'] text-[#FF7A00] mt-2">
                            Volunteer Hub?
                        </h2>
                    </div>

                    {/* DESKTOP VIEW */}
                    <div className="hidden lg:flex items-center justify-center gap-4 relative">
                        {/* Kiri */}
                        <div className="relative h-[500px] w-1/3 text-right">
                            {/* Item 1 */}
                            <div className="absolute top-[3%] right-0 pr-1 group">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                    Kegiatan Berdasarkan <br /> Lokasi dan Minat
                                </h4>
                                <p className="text-gray-600 text-lg">
                                    Temukan aksi sosial sesuai <br /> minatmu.
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div className="absolute top-1/2 -translate-y-1/2 right-0 pr-14 group">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                    Sistem Notifikasi dan <br /> Pengingat Event
                                </h4>
                                <p className="text-gray-600 text-lg">
                                    Lihat dampak sosial dari <br />{" "}
                                    partisipasimu.
                                </p>
                            </div>

                            {/* Item 3 */}
                            <div className="absolute bottom-[3%] right-0 pr-1 group">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                    Kegiatan Terverifikasi <br /> dan Aman
                                </h4>
                                <p className="text-gray-600 text-lg">
                                    Semua kegiatan lolos proses <br /> kurasi.
                                </p>
                            </div>
                        </div>

                        {/* Tengah */}
                        <div className="relative w-[500px] h-[500px] flex-shrink-0 flex items-center justify-center">
                            {/* Ring */}
                            <div className="absolute inset-8 border-[6px] border-[#005D67] rounded-full"></div>

                            <div className="absolute top-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FF7A00] rounded-full z-10"></div>
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-5 h-5 bg-[#FF7A00] rounded-full z-10"></div>

                            {/* Logo */}
                            <div className="w-40 h-40 bg-[#005D67] rounded-full flex items-center justify-center p-6 shadow-2xl relative z-20">
                                <img
                                    src="/assets/logo-color.png"
                                    alt="Center Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>

                            {/* ICONS */}
                            {/* 1. Top Left */}
                            <div className="absolute top-[8%] left-[16%] w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg z-30 transform hover:scale-110 transition duration-300">
                                <img
                                    src="/assets/landing-page/icons/smile.png"
                                    alt="Smile"
                                    className="w-10 h-10 object-contain invert brightness-0 pb-1"
                                />
                            </div>

                            {/* 2. Top Right */}
                            <div className="absolute top-[8%] right-[16%] w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg z-30 transform hover:scale-110 transition duration-300">
                                <img
                                    src="/assets/landing-page/icons/list.png"
                                    alt="List"
                                    className="w-10 h-10 object-contain invert brightness-0"
                                />
                            </div>

                            {/* 3. Middle Left */}
                            <div className="absolute top-1/2 left-8 w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg z-30 transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition duration-300">
                                <img
                                    src="/assets/landing-page/icons/bel.png"
                                    alt="Bell"
                                    className="w-10 h-10 object-contain invert brightness-0"
                                />
                            </div>

                            {/* 4. Middle Right */}
                            <div className="absolute top-1/2 right-8 w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg z-30 transform translate-x-1/2 -translate-y-1/2 hover:scale-110 transition duration-300">
                                <img
                                    src="/assets/landing-page/icons/mouse.png"
                                    alt="Cursor"
                                    className="w-10 h-10 object-contain invert brightness-0"
                                />
                            </div>

                            {/* 5. Bottom Left */}
                            <div className="absolute bottom-[8%] left-[16%] w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg z-30 transform hover:scale-110 transition duration-300">
                                <img
                                    src="/assets/landing-page/icons/check.png"
                                    alt="Shield"
                                    className="w-10 h-10 object-contain invert brightness-0"
                                />
                            </div>

                            {/* 6. Bottom Right */}
                            <div className="absolute bottom-[8%] right-[16%] w-20 h-20 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg z-30 transform hover:scale-110 transition duration-300">
                                <img
                                    src="/assets/landing-page/icons/people.png"
                                    alt="Community"
                                    className="w-10 h-10 object-contain invert brightness-0"
                                />
                            </div>
                        </div>

                        {/* Kanan */}
                        <div className="relative h-[500px] w-1/3 text-left">
                            {/* Item 1 */}
                            <div className="absolute top-[3%] left-0 pl-1 group">
                                <h4 className="text-2xl font-bold text-gray-900 mb-0">
                                    Tracking Kontribusi dan <br /> Aktivitas
                                    Kamu
                                </h4>
                                <p className="text-gray-600 text-lg">
                                    Tetap update jadwal dan <br /> kegiatan
                                    baru.
                                </p>
                            </div>

                            {/* Item 2 */}
                            <div className="absolute top-1/2 -translate-y-1/2 left-0 pl-14 group">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                    Daftar Relawan dalam <br /> Satu Klik
                                </h4>
                                <p className="text-gray-600 text-lg">
                                    Ikut aksi sosial dalam <br /> sekali klik.
                                </p>
                            </div>

                            {/* Item 3*/}
                            <div className="absolute bottom-[1%] left-0 pl-1 group">
                                <h4 className="text-2xl font-bold text-gray-900 mb-1">
                                    Profil Komunitas dan <br /> Penyelenggara
                                </h4>
                                <p className="text-gray-600 text-lg">
                                    Kenali penyelenggara dan <br /> rekam
                                    jejaknya.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE VIEW */}
                    <div className="lg:hidden flex flex-col gap-8">
                        {/* Item Smile */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src="/assets/landing-page/icons/smile.png"
                                    className="w-8 h-8 invert brightness-0"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Kegiatan Berdasarkan Lokasi dan Minat
                                </h4>
                                <p className="text-gray-600 text-md mt-1">
                                    Temukan aksi sosial sesuai minatmu.
                                </p>
                            </div>
                        </div>
                        {/* Item List */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src="/assets/landing-page/icons/list.png"
                                    className="w-8 h-8 invert brightness-0"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Tracking Kontribusi dan Aktivitas
                                </h4>
                                <p className="text-gray-600 text-md mt-1">
                                    Tetap update jadwal dan kegiatan baru.
                                </p>
                            </div>
                        </div>
                        {/* Item Cursor */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src="/assets/landing-page/icons/mouse.png"
                                    className="w-8 h-8 invert brightness-0"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Daftar Relawan dalam Satu Klik
                                </h4>
                                <p className="text-gray-600 text-md mt-1">
                                    Ikut aksi sosial dalam sekali klik.
                                </p>
                            </div>
                        </div>
                        {/* Item People */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src="/assets/landing-page/icons/people.png"
                                    className="w-8 h-8 invert brightness-0"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Profil Komunitas dan Penyelenggara
                                </h4>
                                <p className="text-gray-600 text-md mt-1">
                                    Kenali penyelenggara dan rekam jejaknya.
                                </p>
                            </div>
                        </div>
                        {/* Item Shield */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src="/assets/landing-page/icons/check.png"
                                    className="w-8 h-8 invert brightness-0"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Kegiatan Terverifikasi dan Aman
                                </h4>
                                <p className="text-gray-600 text-md mt-1">
                                    Semua kegiatan lolos proses kurasi.
                                </p>
                            </div>
                        </div>
                        {/* Item Bell */}
                        <div className="flex items-start gap-4">
                            <div className="w-16 h-16 flex-shrink-0 bg-[#005D67] rounded-full flex items-center justify-center shadow-lg">
                                <img
                                    src="/assets/landing-page/icons/bel.png"
                                    className="w-8 h-8 invert brightness-0"
                                />
                            </div>
                            <div>
                                <h4 className="text-xl font-bold text-gray-900">
                                    Sistem Notifikasi dan Pengingat
                                </h4>
                                <p className="text-gray-600 text-md mt-1">
                                    Lihat dampak sosial dari partisipasimu.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5 */}
            <div className="py-24 bg-white relative overflow-hidden font-sans">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Header Section */}
                    <div className="text-center mb-60">
                        <h2 className="text-4xl md:text-5xl font-['Playwrite_NO'] text-black mb-2">
                            Bagaimana cara
                        </h2>
                        <h2 className="text-4xl md:text-5xl font-['Playwrite_NO'] text-[#FF7A00] font-bold">
                            Volunteer Hub bekerja?
                        </h2>
                    </div>

                    <div className="space-y-32">
                        {/* STEP 1 */}
                        <div className="flex flex-col md:flex-row items-start gap-10 md:gap-16 relative">
                            {/* Text Section */}
                            <div className="w-full md:w-1/2 order-2 md:order-1 relative z-10 pt-10">
                                <h3 className="text-3xl font-['Playwrite_NO'] font-bold mb-6">
                                    <span className="mr-3">1.</span> Temukan
                                    Aksi yang Kamu Suka
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed pr-4">
                                    Scroll-scroll, lihat kegiatan seru dari
                                    berbagai komunitas. Tinggal pilih yang
                                    paling cocok sama vibes kamu!
                                </p>
                            </div>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 order-1 md:order-2 relative flex justify-end">
                                <div className="absolute -top-14 -right-8 w-64 h-44 bg-[#FF7A00] z-0 translate-x-8 -translate-y-8"></div>

                                <img
                                    src="/assets/landing-page/dots-h.png"
                                    className="absolute -top-16 -right-5 w-32 h-auto z-0"
                                    alt="dots horizontal"
                                />

                                <div className="absolute top-64 right-8 w-64 h-40 bg-[#005D67] z-10 translate-x-8 -translate-y-8"></div>

                                {/* Foto 1*/}
                                <div className="relative z-10">
                                    <img
                                        src="/assets/landing-page/orang1.png"
                                        alt="Step 1"
                                        className="relative w-full max-w-md shadow-none"
                                    />
                                    <img
                                        src="/assets/landing-page/dots-v.png"
                                        className="absolute -bottom-10 -right-6 h-24 w-auto z-20"
                                        alt="dots vertical"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative flex justify-start">
                                <div className="relative z-10 max-w-md">
                                    <img
                                        src="/assets/landing-page/orang2.png"
                                        alt="Step 2"
                                        className="relative w-96 shadow-none z-10"
                                    />
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#005D67] z-20 translate-x-8 -translate-y-8"></div>
                                    <img
                                        src="/assets/landing-page/dots-v.png"
                                        className="absolute top-10 right-10 h-24 w-auto z-20"
                                        alt="dots vertical"
                                    />
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full md:w-1/2 text-left md:text-right">
                                <h3 className="text-3xl font-['Playwrite_NO'] font-bold mb-6">
                                    <span className="mr-3">2.</span> Daftar
                                    Sekali Klik
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed pl-4">
                                    Tidak ribet tinggal klik Join, isi data
                                    singkat, dan kamu langsung terhubung dengan
                                    penyelenggara.
                                </p>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 relative">
                            <div className="absolute top-96 left-0 -translate-x-1/2 w-28 h-80 bg-[#FF7A00] z-0"></div>

                            {/* Text Section */}
                            <div className="w-full md:w-1/2 order-2 md:order-1 relative z-10">
                                <h3 className="text-3xl font-['Playwrite_NO'] font-bold mb-6">
                                    <span className="mr-3">3.</span> Datang &
                                    Berkontribusi
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed pr-4">
                                    Ikut kegiatan, bantu orang lain, dan nikmati
                                    pengalaman yang bikin kamu merasa "Wah, gue
                                    berguna banget hari ini!"
                                </p>
                            </div>

                            {/* Image Section */}
                            <div className="w-full md:w-1/2 order-1 md:order-2 relative flex justify-end">
                                <div className="relative z-10 max-w-md">
                                    <img
                                        src="/assets/landing-page/orang3.png"
                                        alt="Step 3"
                                        className="relative w-96 shadow-none z-10"
                                    />
                                    <div className="absolute top-14 -left-60 w-28 h-16 bg-[#FF7A00] z-10 translate-x-8 -translate-y-8"></div>
                                    <div className="absolute top-5 -left-28 w-40 h-32 bg-[#005D67] z-0 -translate-x-8 translate-y-8"></div>
                                    <img
                                        src="/assets/landing-page/dots-h.png"
                                        className="absolute -top-5 right-2 w-24 h-auto z-20"
                                        alt="dots horizontal"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* STEP 4 */}
                        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
                            {/* Image Section */}
                            <div className="w-full md:w-1/2 relative flex justify-start">
                                <div className="absolute bottom-0 right-10 w-20 h-40 md:w-32 md:h-60 bg-[#005D67] z-20 translate-x-8 translate-y-8"></div>

                                <div className="relative z-10 max-w-md">
                                    <img
                                        src="/assets/landing-page/orang4.png"
                                        alt="Step 4"
                                        className="relative w-full shadow-none z-10"
                                    />
                                    <img
                                        src="/assets/landing-page/dots-h.png"
                                        className="absolute -top-24 -left-6 w-24 h-auto z-20"
                                        alt="dots horizontal"
                                    />
                                    <img
                                        src="/assets/landing-page/dots-h.png"
                                        className="absolute top-24 -right-12 w-24 h-auto z-20"
                                        alt="dots horizontal"
                                    />
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="w-full md:w-1/2 text-left md:text-right relative">
                                <h3 className="text-3xl font-['Playwrite_NO'] font-bold mb-6">
                                    <span className="mr-3">4.</span> Lihat
                                    Dampakmu Berkembang
                                </h3>
                                <p className="text-gray-700 text-lg leading-relaxed pl-4 mb-10">
                                    Setiap kegiatan tercatat, jam relawan
                                    bertambah, dan kamu bisa bangga lihat
                                    progress kontribusimu dari waktu ke waktu.
                                </p>
                                <img
                                    src="/assets/landing-page/dots-h.png"
                                    className="absolute -bottom-16 -right-14 w-24 h-auto z-20"
                                    alt="dots horizontal"
                                />
                                <div className="absolute bottom-20 -right-28 w-12 h-12 bg-[#FF7A00] z-20"></div>
                                <div className="absolute top-16 -right-28 w-28 h-60 bg-[#005D67] z-10 translate-x-8 translate-y-8"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 6 */}
            <div className="pt-24 pb-32 bg-[#005D67] relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-['Playwrite_NO'] font-bold mb-2 text-[#FF7A00]">
                            Kegiatan <span className="text-white">Pilihan</span>
                        </h2>
                        <h2 className="text-4xl md:text-5xl font-['Playwrite_NO'] text-white">
                            untuk Kamu
                        </h2>
                    </div>

                    <div className="flex items-center justify-center gap-4 md:gap-8">
                        {/* Prev Button */}
                        <button
                            onClick={handlePrevAct}
                            className="hidden md:block text-[#FF7A00] hover:text-white transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 19.5L8.25 12l7.5-7.5"
                                />
                            </svg>
                        </button>

                        {/* Cards Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
                            {currentActivities.map((act, idx) => (
                                <div
                                    key={idx}
                                    className="bg-transparent text-white rounded-xl overflow-hidden flex flex-col group animate-fade-in"
                                >
                                    <div className="h-56 overflow-hidden rounded-xl mb-4 relative">
                                        <img
                                            src={act.image}
                                            alt={act.title}
                                            className="w-full h-full object-cover transform group-hover:scale-110 transition duration-500"
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://via.placeholder.com/400x300?text=Activity";
                                            }}
                                        />
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <h3 className="text-xl font-bold mb-3 leading-tight min-h-[3.5rem]">
                                            {act.title}
                                        </h3>
                                        <p className="text-sm text-gray-200 mb-6 line-clamp-3 leading-relaxed">
                                            {act.desc}
                                        </p>
                                        <div className="space-y-2 mb-6 text-sm text-gray-300">
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    ></path>
                                                </svg>
                                                <span>{act.date}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                                    ></path>
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                                    ></path>
                                                </svg>
                                                <span className="truncate">
                                                    {act.location}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="mt-auto">
                                            <button className="px-6 py-2 bg-[#33CCB5] text-[#005D67] font-bold rounded-full text-sm hover:bg-[#28A08D] transition shadow-md w-fit">
                                                Lihat Detailnya
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={handleNextAct}
                            className="hidden md:block text-[#FF7A00] hover:text-white transition"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={3}
                                stroke="currentColor"
                                className="w-10 h-10"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* SECTION 7 */}
            <div className="bg-white relative">
                {/* FLOATING BOX */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 w-full px-4 flex justify-center">
                    <div className="bg-white rounded-2xl shadow-xl px-12 py-8 text-center max-w-2xl w-full border border-gray-100">
                        <h2 className="text-3xl md:text-4xl font-bold font-sans text-black">
                            FAQ VolunteerHub
                        </h2>
                    </div>
                </div>

                {/* Content FAQ */}
                <div className="pt-32 pb-24 max-w-4xl mx-auto px-6 text-center">
                    <p className="text-gray-500 text-lg mb-12 font-light">
                        Berikut merupakan Pertanyaan yang{" "}
                        <br className="hidden md:block" />
                        Sering Diajukan pada Kami
                    </p>

                    <div className="text-left space-y-2">
                        {faqs.map((faq, idx) => (
                            <div
                                key={idx}
                                className="border-b border-gray-300 last:border-0"
                            >
                                <button
                                    onClick={() => toggleFaq(idx)}
                                    className="w-full py-6 flex items-center justify-between group focus:outline-none"
                                >
                                    <h4 className="text-lg md:text-xl font-bold text-gray-900 group-hover:text-[#005D67] transition-colors">
                                        {faq.question}
                                    </h4>
                                    <div className="flex-shrink-0 ml-4">
                                        {openFaq === idx ? (
                                            <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600">
                                                <svg
                                                    xmlns="https://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M20 12H4"
                                                    />
                                                </svg>
                                            </div>
                                        ) : (
                                            <div className="w-8 h-8 rounded-full border border-gray-400 flex items-center justify-center text-gray-600">
                                                <svg
                                                    xmlns="https://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 4v16m8-8H4"
                                                    />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                </button>

                                <div
                                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                                        openFaq === idx
                                            ? "max-h-40 opacity-100 mb-6"
                                            : "max-h-0 opacity-0"
                                    }`}
                                >
                                    <p className="text-gray-600 leading-relaxed pr-10">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SECTION 8 */}
            <div className="py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold text-black mb-4 font-sans">
                            Testimoni Dari Pengguna Kami
                        </h2>
                        <p className="text-xl text-gray-600 font-light">
                            Cerita Nyata dari Para Relawan Kami
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {currentTestimonials.map((testi) => (
                            <div
                                key={testi.id}
                                className="relative h-[500px] rounded-3xl overflow-hidden group shadow-lg animate-fade-in-up"
                            >
                                <img
                                    src={testi.image}
                                    alt={testi.name}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                <div className="absolute bottom-0 left-0 w-full p-8 text-white">
                                    <h3 className="text-2xl font-bold mb-1">
                                        {testi.name}
                                    </h3>
                                    <p className="text-sm font-medium text-gray-300 mb-4">
                                        {testi.role}
                                    </p>
                                    <p className="text-xs md:text-sm text-gray-200 leading-relaxed opacity-90">
                                        "{testi.quote}"
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center gap-3">
                        {Array.from({ length: totalTestiPages }).map(
                            (_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentTestiPage(index)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                        currentTestiPage === index
                                            ? "bg-gray-800 scale-125"
                                            : "bg-gray-300 hover:bg-gray-400"
                                    }`}
                                />
                            )
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}
