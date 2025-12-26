import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
// import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function Login({ status, canResetPassword }) {
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false, // remember me
        role:'user',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('admin.store'));
        // post(route('login'), {
        //     onFinish: () => reset('password'),
        // });
    };

    return (
       <div className="flex h-screen w-full overflow-hidden bg-white">
            <Head title="Login"/>

            {/* FORM SECTION RIGHT */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-5">
                
                {/* Header Logo VolunteerHub */}
                <div className="w-full max-w-[500px] mb-8 flex justify-center pl-1">
                    <img
                        src="/assets/logo-volunteerhub.png"
                        alt="VolunteerHub Logo"
                        className="h-10 w-auto object-contain"
                    />
                </div>

                <div className="w-full max-w-[500px]">
                    {/* Judul */}
                    <div className="mb-6">
                        <h2 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: '32px',
                            lineHeight: '100%',
                            textAlign: 'center',
                        }} className="text-gray-900">
                            Admin Login
                        </h2>
                    </div>

                    {/* FORM */}
                    {/* ISI FORM */}
                    {errors.role && (
                        <p className="text-red-500 text-sm mt-2">
                            {errors.role}
                        </p>
                    )}
                    <form onSubmit={submit} className="space-y-4">
                        {/* EMAIL */}
                        <div>
                            <InputLabel htmlFor="email" 
                            value={data.role === 'user' ? 'Email' : 'Email Organisasi'} 
                            className="font-['inter']" />
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-envelope-fill text-gray-400" viewBox="0 0 16 16">
                                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z"/>
                                    </svg>
                                </div>

                                <TextInput
                                    id="email"
                                    type="email"
                                    value={data.email}
                                    className="mt-1 block w-full bg-gray-50 border-none rounded-xl py-3 pl-11 font-['inter']-1"
                                    placeholder="example@gmail.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* PASSWORD  + remember me*/}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="font-['inter']"/>

                            <div className="relative mt-1">
                                {/* Ikon lock (Kiri) */}
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock-fill text-gray-400" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                                    </svg>
                                </div>

                                {/* TextInput: sesuai show/hide */}
                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'} // Logika ubah tipe
                                    value={data.password}
                                    className="mt-1 block w-full bg-gray-50 border-none rounded-xl py-3 pl-12 pr-12 font-['inter']-1"
                                    placeholder="•••••••••••"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />

                                {/* Tombol Show/Hide (Kanan) */}
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showPassword ? (
                                        /* Ikon open eye fill */
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-fill" viewBox="0 0 16 16">
                                            <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                            <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                        </svg>
                                    ) : (
                                        /* Ikon close slash fill */
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                            <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                            <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                            <InputError message={errors.password} className="mt-2" />
                        </div>

                        {/* REMEMBER ME & FORGOT PASSWORD */}
                        <div className="mt-4 flex items-center justify-between">
                            {/* Kiri: Remember Me */}
                            <label className="flex items-center">
                                <Checkbox
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />
                                <span className="ms-2 text-sm text-gray-600 font-['DM Sans']" style={{ fontSize: '16px' }}>
                                    Ingat saya
                                </span>
                            </label>
                        </div>
                        


                        {/* LOGIN BUTTON */}
                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 bg-[#005d67] 
                                hover:bg-[#004a52] 
                                rounded-xl transition-all 
                                font-['inter']-5 font-medium text-[16px] leading-[100%] 
                                normal-case tracking-normal text-center" 
                                disabled={processing}
                            >
                                Login
                            </PrimaryButton>
                        </div>              
                   </form>
                </div>
            </div>

            
        </div>
    );
}
