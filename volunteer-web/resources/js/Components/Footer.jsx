import { Link } from "@inertiajs/react";

export default function Footer() {
    return (
        <footer className="bg-[#005D67] text-white py-16 font-sans relative z-30">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
                    
                    <div className="md:col-span-5 space-y-6">
                        <h2 className="text-4xl font-bold tracking-tight">VolunteerHub</h2>
                        <p className="text-gray-300 leading-relaxed max-w-sm text-lg">
                            Mempermudah siapa pun terlibat dalam aksi sosial. 
                            Temukan kegiatan, daftar cepat, dan wujudkan dampak nyata bagi masyarakat.
                        </p>
                        
                        {/* SOCIAL ICONS */}
                        <div className="flex gap-5 pt-2 items-center">
                            
                            {/* Facebook */}
                            <a href="#" className="hover:opacity-75 transition duration-300">
                                <img 
                                    src="https://img.icons8.com/ios-filled/50/ffffff/facebook-new.png" 
                                    alt="Facebook" 
                                    className="w-6 h-6 object-contain"
                                />
                            </a>

                            {/* LinkedIn */}
                            <a href="#" className="hover:opacity-75 transition duration-300">
                                <img 
                                    src="https://img.icons8.com/ios-filled/50/ffffff/linkedin.png" 
                                    alt="LinkedIn" 
                                    className="w-6 h-6 object-contain"
                                />
                            </a>

                            {/* X (Twitter) */}
                            <a href="#" className="hover:opacity-75 transition duration-300">
                                <img 
                                    src="https://img.icons8.com/ios-filled/50/ffffff/twitterx--v1.png" 
                                    alt="X" 
                                    className="w-6 h-6 object-contain"
                                />
                            </a>

                            {/* Instagram */}
                            <a href="#" className="hover:opacity-75 transition duration-300">
                                <img 
                                    src="https://img.icons8.com/ios-filled/50/ffffff/instagram-new.png" 
                                    alt="Instagram" 
                                    className="w-6 h-6 object-contain"
                                />
                            </a>

                            {/* YouTube */}
                            <a href="#" className="hover:opacity-75 transition duration-300">
                                <img 
                                    src="https://img.icons8.com/ios-filled/50/ffffff/youtube-play.png" 
                                    alt="YouTube" 
                                    className="w-7 h-7 object-contain"
                                />
                            </a>

                        </div>

                        <p className="text-gray-400 text-sm pt-4 font-light">
                            © 2025 VolunteerHub. Hak cipta dilindungi undang-undang.
                        </p>
                    </div>

                    <div className="hidden md:block md:col-span-1"></div>

                    {/* KOLOM KANAN 1 */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-normal mb-6">Navigasi</h3>
                        <ul className="space-y-4 text-gray-300 text-md font-light">
                            <li><Link href="#" className="hover:text-white transition">Home</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Cari Event</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Institute</Link></li>
                        </ul>
                    </div>

                    {/* KOLOM KANAN 2 */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-normal mb-6">Perusahaan</h3>
                        <ul className="space-y-4 text-gray-300 text-md font-light">
                            <li><Link href="#" className="hover:text-white transition">Persyaratan & Kondisi</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Privasi</Link></li>
                        </ul>
                    </div>

                    {/* KOLOM KANAN 3 */}
                    <div className="md:col-span-2">
                        <h3 className="text-2xl font-normal mb-6">Bantuan</h3>
                        <ul className="space-y-4 text-gray-300 text-md font-light">
                            <li><Link href="#" className="hover:text-white transition">Kontak Kami</Link></li>
                            <li><Link href="#" className="hover:text-white transition">Help Center</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}