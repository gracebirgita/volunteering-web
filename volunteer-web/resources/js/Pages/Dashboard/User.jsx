import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';

export default function Dashboard() {
    const handleLogout=() =>{
        router.post('/logout');
    };

    return (
        // <div className="p-6">
        //     <Head title="User Dashboard" />

        //     <h1 className="text-2xl font-bold mb-4">USER DASHBOARD</h1>

        //     <button
        //         onClick={handleLogout}
        //         className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        //     >
        //         Logout
        //     </button>
        // </div>
        <AuthenticatedLayout>
            <Head title="Dashboard" />
            <h1>USER DASHBOARD</h1>

            {/* perlu diterapkan di navbar */}
            
            {/* Events Explore relawan */}
            {/* <Link href={route('events.index')}>[ICON] Lihat Event</Link> */}
            <Link href='/events'>[ICON] Lihat Event</Link>
            <br />
            {/* AKUN  */}
            {/* profil */}
            <Link href='/profile'>[ICON] Profil</Link>

        </AuthenticatedLayout>

        // <AuthenticatedLayout
        //     header={
        //         <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //             Dashboard
        //         </h2>
        //     }
        // >
        //     <Head title="Dashboard-User" />

        //     <div className="py-12">
        //         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        //             <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        //                 <div className="p-6 text-gray-900">
        //                     USER DASHBOARD
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </AuthenticatedLayout>
    );
}
