import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router, Link } from '@inertiajs/react';


export default function MyEvent({ }) {


    return (
       <AuthenticatedLayout>
            <Head title="Event saya" />
            <h1 className='mt-20'>INI PLACEHOLDER EVENT SAYA (FITUR UTAMA)</h1>

        </AuthenticatedLayout>
    );
}