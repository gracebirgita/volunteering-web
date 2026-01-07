import { useState, useEffect } from 'react'
import { Head, router, Link, usePage } from '@inertiajs/react'
import MyNavbar from '@/Components/Navbar'
import { CalendarDays, Clock, ArrowLeft,MapPin, Gift, Phone, Users } from "lucide-react";
import AddOns from "@/Components/AddOns";
import AgendaTimeline from "@/Components/AgendaTimeline";



// export default FlashMessage;
export default function EventDetail({auth,  event, institute, volunteers,
    isRegistered,
    isAccepted,
    isRejected,
    isProfileComplete
 }) {

    console.log(event.agendas);


    const user = auth.user 
    const userPorfile = auth.profile


    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [tab, setTab] = useState('description')

    const handleJoin = () => {
        router.post('/events/'+ event.id+'/join')
    }
    const getButtonLabel=()=>{
        if(isAccepted) return 'Accepted';
        if(isRejected) return 'Rejected';
        if(isRegistered) return 'Pending';
        return 'Jadi Relawan';
    };

    const handleCancel = () => {
        if (confirm('Yakin ingin membatalkan pendaftaran?')) {
            router.delete('/events/'+event.id+'/cancel')
        }
    }

     // 1. Ambil flash dari props melalui hook usePage
    const { flash } = usePage().props;

    // 2. State untuk kontrol alert
    const [showFlash, setShowFlash] = useState(false);

    // 3. Efek untuk otomatis munculkan alert jika ada flash message baru
    useEffect(() => {
        if (flash.success || flash.error) {
            setShowFlash(true);
        }
    }, [flash]);


    return (
        <div className='flex flex-row relative'>
            <Head title={event.name} />
            
            {/* Bagian Flash Message */}
            <div className="absolute top-5 right-5 z-50">
                {showFlash && flash.success && (
                    <div className="bg-green-500 text-white p-4 rounded shadow-lg flex justify-between items-center mb-2">
                        <span>{flash.success}</span>
                        <button onClick={() => setShowFlash(false)} className="ml-4 font-bold">×</button>
                    </div>
                )}

                {showFlash && flash.error && (
                    <div className="bg-red-500 text-white p-4 rounded shadow-lg flex justify-between items-center">
                        <span>{flash.error}</span>
                        <button onClick={() => setShowFlash(false)} className="ml-4 font-bold">×</button>
                    </div>
                )}
            </div>

            {/* Navbar */}
            <MyNavbar
                user={user}
                variant="user-sidebar"
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
            />

            {/* Main */}
            <main className='flex flex-col flex-1'>
                {/* Banner */}
                <div className="relative w-full h-32  md:h-48  overflow-hidden mb-6">
                    {/* Blurred background */}
                    <img
                        src={event.image_url}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover scale-110 blur-sm"
                    />

                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Content */}
                    <div className="relative z-20 flex items-center justify-between px-12  py-8">
                        <div className='flex flex-col gap-2'>
                            <h2 className=" font-hand text-white font-bold text-xl md:text-5xl mb-1">
                                {event.name}
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <CalendarDays size={16} />
                                <span className='text-md'>
                                    {new Date(event.start_date).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                    -
                                    {new Date(event.end_date).toLocaleDateString("id-ID", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric",
                                    })}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/90">
                                <Clock size={16} />
                                <span className='text-md'>
                                    {event.start_time} - {event.end_time}
                                </span>
                            </div>

                        </div>
                    </div>
                    <div className="absolute top-6 right-6 z-20">
                        <Link
                            href={route("events.index")}
                            className="
                                inline-flex items-center gap-2
                                px-3 py-1.5
                                text-sm font-medium
                                text-white
                                bg-white/10
                                backdrop-blur-sm
                                rounded-lg
                                hover:bg-white/20
                                transition
                            "
                        >
                        <ArrowLeft size={16} />
                            Kembali
                        </Link>
                    </div>
                </div>

                {/* Main Area */}
                <div className="w-full px-8 py-3">
                    <div className="max-w-7xl mx-auto grid grid-cols-12 gap-8">
                        {/* LEFT */}
                        <div className="col-span-8">
                            {/*Sub-Nav Area*/}
                            <div className="flex gap-8 border-b mb-6">
                                {[
                                    ['description', 'Deskripsi'],
                                    ['agenda', 'Agenda'],
                                    ['volunteers', 'Relawan'],
                                    ['institute', 'Organisasi'],
                                    ['gallery', 'Galeri'],
                                ].map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setTab(key)}
                                        className={`pb-3 text-sm font-medium transition
                                            ${tab === key
                                                ? 'text-[#005D67] border-b-2 border-[#005D67]'
                                                : 'text-gray-500 hover:text-gray-700'
                                            }
                                        `}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* ISI PER TAB */}
                            {tab === 'description' && (
                                <div className="space-y-6">
                                    <p className="text-gray-700 leading-relaxed">
                                        {event.description}
                                    </p>
                                </div>
                            )}

                            {tab === 'agenda' && (
                                <div className="space-y-6">
                                    {event.agendas.length === 0 ? (
                                        <p className="text-sm text-gray-500 italic">
                                            Agenda belum tersedia.
                                        </p>
                                    ) : (
                                        <AgendaTimeline agendas={event.agendas} event={event} />
                                    )}
                                </div>
                            )}

                            {tab === 'volunteers' && (
                                <div className=" max-h-[420] overflow-y-auto agenda-scroll">
                                    {/* HEADER */}
                                    <div className="grid grid-cols-12 px-6 py-3 text-sm font-semibold text-gray-500 border-b">
                                        <div className="col-span-6">Nama</div>
                                        <div className="col-span-4">Divisi</div>
                                        <div className="col-span-2 text-right">Status</div>
                                    </div>

                                    {/* LIST */}
                                    {volunteers.length === 0 ? (
                                        <div className="px-6 py-8 text-center text-sm text-gray-500">
                                            Belum ada relawan terdaftar.
                                        </div>
                                    ) : (
                                        <ul className="divide-y divide-gray-200 border-b">
                                            {volunteers.map((v, i) => (
                                                <li
                                                    key={i}
                                                    className="grid grid-cols-12 px-6 py-4 items-center hover:bg-white transition"
                                                >
                                                    {/* NAMA + AVATAR */}
                                                    <div className="col-span-6 flex items-center gap-4">
                                                        <img
                                                            src={v.avatar ?? '/images/avatar-placeholder.png'}
                                                            alt={v.name}
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                        <span className="font-medium text-gray-800">
                                                            {v.name}
                                                        </span>
                                                    </div>

                                                    {/* DIVISI */}
                                                    <div className="col-span-4 text-sm text-gray-700">
                                                        Divisi {v.division}
                                                    </div>

                                                    {/* STATUS */}
                                                    <div className="col-span-2 text-right">
                                                        <span
                                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold
                                                                ${v.status === 'Accepted' && 'bg-green-100 text-green-700'}
                                                                ${v.status === 'Pending' && 'bg-yellow-100 text-yellow-700'}
                                                                ${v.status === 'Rejected' && 'bg-red-100 text-red-700'}
                                                            `}
                                                        >
                                                            {v.status}
                                                        </span>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            )}


                            {tab === 'institute' && (
                                <>
                                    <h3 className='text-[20px]'>{institute.name}</h3>
                                    <hr />
                                    <br />

                                    <h2 className='text-[20px] font-bold'>Informasi </h2>

                                    <br />
                                    <p>Nama Organisasi : </p>
                                    <p><strong>{institute.name}</strong></p>

                                    <br />
                                    <p>Email: <br /><strong>{institute.email}</strong></p>

                                    <br />
                                    <p>Nomor Telepon Organisasi: <br /><strong>{institute.phone}</strong></p>
                                    {/* <p>Bio: {institute.bio}</p> */}
                                </>
                            )}

                            {tab === 'gallery' && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {(!event.galleries || event.galleries.length === 0) ? (
                                            <div className="col-span-full text-center text-gray-500 py-12 italic">
                                                Belum ada dokumentasi kegiatan yang tersedia.
                                            </div>
                                        ) : (
                                            event.galleries.map((photo, index) => (
                                                <div
                                                    key={index}
                                                    className="h-40 bg-gray-100 rounded-lg overflow-hidden shadow-sm"
                                                >
                                                    <img
                                                        src={photo.image_url}
                                                        alt={`Galeri ${index + 1}`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </div>
                            )}


                        </div>

                        {/* RIGHT CARD */}
                        <div className="col-span-4 border border-gray-300 p-5 rounded-lg flex flex-col gap-5">
                            {/* HEADER */}
                            <div>
                                <h2 className="font-inter font-bold md:text-2xl line-clamp-2 mb-2">{event.name}</h2>
                                <div className="flex flex-wrap gap-2">
                                    <span>
                                        <AddOns category={event.category}/>
                                    </span>
                                    <span>
                                        <AddOns organizer={institute.name} />
                                    </span>
                                </div>
                            </div>

                            {/* Card Data */}
                            <div className='flex flex-col gap-3 p-5 border border-gray-300 rounded-lg'>

                                {/* INFO KUOTA RELAWAN */}
                                <div>
                            
                                    <div className="flex items-center gap-2 text-[#005D67] font-semibold mb-2">
                                        <Users size={16} />
                                        <span>Kuota Relawan</span>
                                    </div>

                                    <hr className="mb-1" />

                                    {event.is_full ? (
                                        <p className="text-red-600 font-semibold italic text-sm mt-2">
                                            Penuh (Kuota Habis)
                                        </p>
                                    ) : (
                                        <p className="text-gray-700 text-sm mt-2">
                                            Tersisa{" "}
                                            <span className="font-bold text-[#005D67]">
                                                {event.quota_remaining}
                                            </span>{" "}
                                            dari {event.quota} slot
                                        </p>
                                    )}
                                </div>


                                {/* LOKASI */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#005D67] font-semibold mb-2">
                                        <MapPin size={16} />
                                        <span>Lokasi</span>
                                    </div>
                                    <hr className="mb-1" />
                                    <p className="text-gray-700 leading-relaxed text-sm mt-1">
                                        {event.location}
                                    </p>
                                </div>

                                {/* JADWAL EVENT */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#005D67] font-semibold mb-2">
                                        <CalendarDays size={16} />
                                        <span>Jadwal Event</span>
                                    </div>
                                    <hr className="mb-1" />
                                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                        <li>
                                            {new Date(event.start_date).toLocaleDateString("id-ID", {
                                            day: "2-digit",
                                            month: "long",
                                            year: "numeric",
                                            })}
                                            -
                                            {new Date(event.end_date).toLocaleDateString("id-ID", {
                                                day: "2-digit",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </li>
                                        <li>
                                            Pukul {event.start_time} – {event.end_time}
                                        </li>
                                    </ul>
                                </div>

                                {/* BENEFIT RELAWAN */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#005D67] font-semibold mb-2 tex">
                                        <Gift size={16} />
                                        <span>Benefit Relawan</span>
                                    </div>
                                    <hr className="mb-1" />
                                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                        {event.benefit_consumption && <li>Konsumsi</li>}
                                        {event.benefit_certificate && <li>Sertifikat</li>}
                                        {event.benefit_hour_volunt && <li>Jam Volunteer</li>}

                                        {!event.benefit_consumption &&
                                        !event.benefit_certificate &&
                                        !event.benefit_hour_volunt && (
                                            <li className="italic text-gray-400">
                                                Tidak ada benefit tambahan
                                            </li>
                                        )}
                                    </ul>
                                </div>

                                {/* CONTACT PERSON */}
                                <div>
                                    <div className="flex items-center gap-2 text-[#005D67] font-semibold mb-2">
                                        <Phone size={16} />
                                        <span>Contact Person</span>
                                    </div>
                                    <hr className="mb-1" />
                                    <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
                                        <li>{institute.phone}</li>
                                        {institute.whatsapp && (
                                            <li>
                                                <a
                                                    href={institute.whatsapp}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-[#005D67] hover:underline break-all"
                                                >
                                                    {institute.whatsapp}
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </div>

                               
                            </div>



                            <div className="w-full">
                                {/* 1: BELUM DAFTAR */}
                                {!isRegistered && event.status !== 'finished' && (
                                    <>
                                        {isProfileComplete ? (
                                            // Tampilkan tombol jika profil lengkap
                                            <button
                                                onClick={handleJoin}
                                                className="w-full p-2 rounded bg-[#005D67] text-white"
                                            >
                                                Jadi Relawan
                                            </button>
                                        ) : (
                                            // Tampilkan peringatan jika profil belum lengkap
                                            <div className="flex flex-col gap-2">
                                                <p className="text-sm text-red-600 font-medium">
                                                    * Anda harus melengkapi profil (No. Telp & Domisili) untuk mendaftar.
                                                </p>
                                                <a 
                                                    href="/profile" // Sesuaikan dengan route profil Anda
                                                    className="w-full p-2 rounded bg-gray-200 text-gray-700 text-center font-medium"
                                                >
                                                    Lengkapi Profil Sekarang
                                                </a>
                                            </div>
                                        )}
                                    </>
                                )}
                                {/* {!isRegistered && event.status!=='finished' && (
                                    <button
                                        onClick={handleJoin}
                                        className="w-full p-2 rounded bg-[#005D67] hover:bg-[#004a52] text-white font-medium transition-colors"
                                    >
                                        Jadi Relawan
                                    </button>
                                )} */}
                                {/* Opsional: Tampilkan status jika event sudah selesai */}
                                {!isRegistered && event.status === 'finished' && (
                                    <button
                                        disabled
                                        className="w-full p-2 rounded bg-gray-300 text-gray-600 cursor-not-allowed font-medium"
                                    >
                                        Pendaftaran ditutup
                                    </button>
                                )}


                                {/*2: PENDING (BISA BATAL) */}
                                {isRegistered && !isAccepted && !isRejected && (
                                    <div className="flex flex-col gap-2">
                                        <button
                                            disabled
                                            className="w-full p-2 rounded bg-gray-400 text-white cursor-not-allowed font-medium"
                                        >
                                            Pending
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="w-full p-2 text-red-600 hover:text-red-800 text-sm font-semibold underline transition-colors"
                                        >
                                            Batalkan Pendaftaran
                                        </button>
                                    </div>
                                )}

                                {/* 3: ACC*/}
                                {isAccepted && (
                                    <button
                                        disabled
                                        className="w-full p-2 rounded bg-green-600 text-white cursor-not-allowed font-medium"
                                    >
                                        Accepted
                                    </button>
                                )}

                                {/* 4. REJECT */}
                                {isRejected && (
                                    <button
                                        disabled
                                        className="w-full p-2 rounded bg-red-600 text-white cursor-not-allowed font-medium"
                                    >
                                        Rejected
                                    </button>
                                )}
                            </div>

                            {/* <button
                                disabled={isRegistered}
                                onClick={handleJoin}
                                className={`w-full p-2 rounded text-white font-medium transition-colors
                                    ${!isRegistered ? 'bg-[#005D67] hover:bg-[#004a52]' : ''}
                                    ${isRegistered && !isAccepted && !isRejected ? 'bg-gray-400 cursor-not-allowed' : ''}
                                    ${isAccepted ? 'bg-green-600 cursor-not-allowed' : ''}
                                    ${isRejected ? 'bg-red-600 cursor-not-allowed' : ''}
                                `}
                            >
                                {getButtonLabel()}
                            </button> */}
                        </div>


                    </div>
                </div>
            </main>
        </div>
    )
}