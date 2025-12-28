import { useState, useEffect } from 'react'
import { Head, router, Link, usePage } from '@inertiajs/react'

// export default FlashMessage;
export default function EventDetail({ event, institute, volunteers,
    isRegistered,
    isAccepted,
    isRejected,
    isProfileComplete
 }) {

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
        <>
            <Head title={event.name} />
            {/* Bagian Flash Message */}
            <div className="fixed top-5 right-5 z-50">
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

            <h2 className="font-bold text-lg">{event.name}</h2>
            <div className="h-60 bg-gray-200 mb-2">
                [ Placeholder thumbnail ]
                <br />
                <br />
                <br />
                {new Date(event.start).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })}
                {" - "}
                {new Date(event.finish).toLocaleDateString('id-ID', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })}



            </div>
            <br />
            <br />

            <Link
                href={route('events.index')}
                className="flex items-center text-[#005D67] text-lg"
            >
                Balik page events
            </Link>
            <br />
            <br />


            <div className="flex gap-6">
                {/* LEFT */}
                <div className="w-3/4">
                    <div className="flex gap-4 mb-6">
                        <button
                            onClick={() => setTab('description')}
                            className={tab === 'description' ? 'font-bold' : ''}
                        > Deskripsi </button>
                        
                        <button
                            onClick={() => setTab('volunteers')}
                            className={tab === 'volunteers' ? 'font-bold' : ''}
                        >Relawan </button>
                        
                        <button
                            onClick={() => setTab('institute')}
                            className={tab === 'institute' ? 'font-bold' : ''}
                        >Organisasi </button>

                        <button
                            onClick={() => setTab('gallery')}
                            className={tab === 'gallery' ? 'font-bold' : ''}
                        > Galery</button>
                    </div>

                    {/* ISI PER TAB */}
                    {tab === 'description' && (
                        <>
                            <h2 className="text-xl font-bold">{event.name}</h2>
                            <div className="h-64 bg-gray-200 mb-4">
                                [ Placeholder Image Kegiatan ]
                            </div>
                            <p>{event.description}</p>
                        </>
                    )}

                    {tab === 'volunteers' && (
                        <>
                            <h3>Daftar Relawan</h3>
                            {volunteers.length===0?(
                                <p>Belum ada relawan</p>
                            ):(
                                <ul className="space-y-2">
                                    {volunteers.map((v, i) => (
                                        <li key={i} className="border p-2 rounded">
                                            {v.name} — {v.status}
                                        </li>
                                    ))}
                                </ul>
                            )}


                        </>
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
                    <>
                        <h3 className="font-bold mb-4">Galeri Kegiatan</h3>

                        <div className="grid grid-cols-3 gap-4">
                        {[1,2,3].map(i => (
                            <div
                            key={i}
                            className="h-40 bg-gray-200 flex items-center justify-center"
                            >
                            Foto {i}
                            </div>
                        ))}
                        </div>
                    </>
                    )}

                </div>

                {/* RIGHT CARD */}
                <div className="w-1/4 border p-4 rounded">
                    <h2 className="font-bold">{event.name}</h2>
                    {/* kategori institute + nama institute penyelenggara*/}
                    {/* Institute category */}
                    <span className="px-2 py-1 bg-red-100 rounded">
                        <strong>({institute.category})</strong>
                    </span>
                    {/* institute name penyelenggara */}
                    <span className="px-2 py-1 bg-green-100 rounded">
                        {institute.name}
                    </span>

                    {/* INFO KUOTA RELAWAN */}
                    <div className="my-3 p-2 border-y border-gray-100">
                        <h3 className="font-bold text-sm">Kuota Relawan</h3>
                        {event.is_full ? (
                            <p className="text-red-600 font-bold text-sm italic">Penuh (Kuota Habis)</p>
                        ) : (
                            <p className="text-gray-700 text-sm">
                                Tersisa <span className="font-bold text-[#005D67]">{event.quota_remaining}</span> dari {event.quota} slot
                            </p>
                        )}
                    </div>
                    <br />


                    {/* LOKASI */}
                    <h3 className="font-bold">Lokasi</h3>
                    <p>{event.location}</p>

                    <br />
                    {/* JADWAL EVENT */}
                    <h3 className="font-bold">Jadwal Event</h3>
                    {/* <p>{event.start} - {event.finish}</p> */}
                    {new Date(event.start).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })}
                    {" - "}
                    {new Date(event.finish).toLocaleDateString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    })}                    

                    <br />
                    {/* CONTACT PERSON */}
                    <h3 className="font-bold">Contact Person</h3>
                    <ul>
                        <li>{institute.pic}</li>
                        <li>{institute.phone}</li>
                    </ul>


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
        </>
    )
}