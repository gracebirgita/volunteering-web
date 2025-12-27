import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function Profile({ account, profile }) {
    return (

        <AuthenticatedLayout>
            <Head title="Lihat Profil" />

            <h1 className='mt-20'>LIHAT PROFIL RELAWAN</h1>
            <br />

            <div>
                <h1>Profile Saya</h1>
                <br />

                <h3>Informasi Personal</h3>
                <p><strong>Nama:</strong> {profile?.user_name}</p>
                <p><strong>Email:</strong> {account.email}</p>
                <p><strong>Nomor Telepon/user_phone:</strong> {profile?.user_phone ?? '-'}</p>
                <p><strong>Bio/user_interest:</strong> {profile?.user_interest ?? '-'}</p>

                <br />
                <h3>Alamat</h3>
                <p><strong>kota/user_domicile:</strong> {profile?.user_domicile ?? '-'}</p>
            </div>

        </AuthenticatedLayout>
    );
}
