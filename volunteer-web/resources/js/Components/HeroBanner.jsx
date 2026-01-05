import React from 'react';

export default function HeroBanner() {
  return (
    <div className="relative w-full h-49 rounded-3xl overflow-hidden mb-5">
        <img src="/assets/hero-banner.png" alt="Banner" className="w-full h-full object-cover opacity-80" />

        {/* Dark Gradient Overlay for Text Readability */}
        <div className="absolute inset-0.5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="relative h-full flex flex-col justify-center px-6 md:px-12 z-10">
          
          {/* TAMPILAN MOBILE (Layar Kecil) */}
          {/* 'md:hidden' artinya sembunyikan elemen ini jika layar >= medium (tablet/desktop) */}
          <h1 className="md:hidden text-3xl font-bold text-white text-center drop-shadow-sm">
            Event Saya
          </h1>

          {/* TAMPILAN DESKTOP (Layar Besar) */}
          {/* 'hidden md:block' artinya sembunyikan secara default, tapi munculkan (block) jika layar >= medium */}
          <div className="hidden md:block">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3 drop-shadow-sm">
                Lanjutkan Aksimu dan Jadilah Bagian <br />
                dari Perubahan Besar
            </h2>
            <p className="text-gray-100 text-sm md:text-base max-w-xl leading-relaxed font-medium drop-shadow-sm">
                Pantau semua kegiatan kerelawananmu disini. Teruslah berkontribusi untuk dunia yang lebih baik.
            </p>
          </div>
        </div>
        </div>
    </div>
  );
}