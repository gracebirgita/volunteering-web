import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    const handleLogout=() =>{
        router.post(route('logout'));
    };
    return (
        <AuthenticatedLayout>
            <Head title="INSTITUTE Dashboard" />
            <h1>INSTITUTE DASHBOARD</h1>
        </AuthenticatedLayout>
        // <AuthenticatedLayout
        //     header={
        //         <h2 className="text-xl font-semibold leading-tight text-gray-800">
        //             Dashboard
        //         </h2>
        //     }
        // >
        //     <Head title="Dashboard-Institute" />

        //     <div className="py-12">
        //         <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        //             <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
        //                 <div className="p-6 text-gray-900">
        //                     INSTITUTE DASHBOARD
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </AuthenticatedLayout>
    );
}
