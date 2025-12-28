import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { Button } from "flowbite-react";

export default function Dashboard() {
    const handleLogout=() =>{
        router.post(route('logout'));
    };
    return (
        
        <AuthenticatedLayout>
            <Head title="ADMIN Dashboard" />
            <h1 className='mt-20'>ADMIN DASHBOARD</h1>

            {/* perlu diterapkan di navbar */}
            
            {/*1. Manajemen Pengguna */}
            {/* <Link href={route('events.index')}>[ICON] Lihat Event</Link> */}
            <Link href={route('manage.user')}>[ICON] Manajemen Pengguna</Link>
            <br />
            
            {/* 2. Manajemen Konten */}
            <Link href={route('manage.content')}>[ICON] Manajemen Konten</Link>


        </AuthenticatedLayout>
        // <AuthenticatedLayout
        //     header={
        //         <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //             Dashboard
        //         </h2>
        //     }
        // >
        //     <Head title="Dashboard-Admin" />

        //     <div className="py-12">
        //         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        //             <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        //                 <div className="p-6 text-gray-900">
        //                     ADMIN DASHBOARD
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </AuthenticatedLayout>
    );
}
