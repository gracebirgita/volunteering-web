import { useEffect } from 'react';
import { useState } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { User } from 'lucide-react'; // Import ikon person (User)

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        user_name: '',
        institute_name:'',

        email: '',
        password: '',
        password_confirmation: '',
        role: 'user', //dessfault sementara
    });

    const submit = (e) => {
        e.preventDefault();

        // post ke db
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };


    return (
        <div className="flex h-screen w-full overflow-hidden bg-white">
            <Head title="Register"/>

            {/* IMAGE LEFT */}
            <div
                className="relative hidden lg:block" 
                style={{ 
                    width: '737px', 
                    minHeight: '1024px',
                    backgroundImage: `url(${data.role === 'user' ? './assets/bg-relawan-regist.jpg' : './assets/bg-institute-regist.jpg'})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                {/* Overlay Gradient 180deg, 30.77% transparan ke Hitam */}
                <div 
                    className="absolute inset-0"
                    style={{
                        // background: 'linear-gradient(180deg, rgba(0, 0, 0, 0) 30.77%, #000000 100%)',
                        opacity: 1
                    }}
                />
            </div>

            {/* FORM SECTION RIGHT */}
            <div className="flex-1 flex flex-col justify-center items-center px-8 py-5 ">
                {/* Header Logo VolunteerHub */}
                <div className="w-full max-w-[700px] mb-8 flex justify-start pl-1">
                    <img
                    src="/assets/logo-volunteerhub.png"
                    alt="VolunteerHub Logo"
                    className ="h-10 w-auto object-contain" //h-10 = 40px
                    />
                </div>

                <div className="w-full max-w-[500px]">
                    

                    {/* Judul*/}
                    <div className="mb-6">
                        <h2 style={{
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 700,
                            fontSize: '27px',
                            lineHeight: '100%',
                            letterSpacing: '0%',
                            textAlign: 'center',
                        }} className="text-gray-900">
                            Daftar Sebagai {data.role === 'user' ? 'Relawan' : 'Institusi / Organisasi'}
                        </h2>
                        <p className="text-center text-gray-600 mt-2 text-sm leading-relaxed">
                            {data.role === 'user' 
                                ? 'Mulai perjalanan kebaikanmu bersama VolunteerHub.' 
                                : 'Buat kegiatan sosial dan kelola relawan dengan mudah.'}
                        </p>
                    </div>

                    {/* Role Switcher */}
                    <div className="flex bg-[#F6F6F6] rounded-lg p-1 mb-8 max-w-[400px] mx-auto">
                        <button
                            type="button"
                            onClick={() => {
                                setData('role', 'user');
                                setData('institute_name', '');
                            }}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all text-[14px] ${
                                data.role === 'user' ? 'bg-white shadow text-black' : 'text-gray-400'
                            }`}
                        >
                            Relawan
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                setData('role', 'institute');
                                setData('user_name', '');
                            }}
                            className={`flex-1 py-2 text-sm font-bold rounded-md transition-all text-[14px] ${
                                data.role === 'institute' ? 'bg-white shadow text-black' : 'text-gray-400'
                            }`}
                        >
                            Institute
                        </button>
                    </div>


                    {/* ISI FORM */}
                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="user_name" 
                            value={data.role === 'user' ? 'Username' : 'Nama Organisasi'} 
                            className="font-['inter']" />
                            <div className="relative mt-1">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    {/* <i className="fa-solid fa-user text-gray-600"></i> */}
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-person-fill text-gray-400" viewBox="0 0 20 20">
                                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                                    </svg>
                                </div>
                                <TextInput
                                    id={data.role==='user'? 'user_name': 'institute_name'}
                                    name={data.role==='user'? 'user_name': 'institute_name'}
                                    value={data.role==='user'? data.user_name: data.institute_name}
                                    className="block w-full bg-[#F6F6F6] border-none rounded-xl py-3 pl-10 font-['inter']-1 placeholder:text-[#A1A0A0]"
                                    placeholder="example12345"
                                    onChange={(e) => 
                                        data.role ==='user'
                                            ? setData('user_name', e.target.value)
                                            : setData('institute_name', e.target.value)
                                        }
                                    required
                                />
                            </div>
                            <InputError message={
                                    data.role==='user'
                                        ? errors.user_name
                                        : errors.institute_name
                                } 
                                className="mt-2" />
                        </div>

                        {/* EMAIL */}
                        <div>
                            <InputLabel htmlFor="email" value="Email" className="font-['inter']"/>
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
                                    className="mt-1 block w-full bg-[#F6F6F6] border-none rounded-xl py-3 pl-11 font-['inter']-1 placeholder:text-[#A1A0A0]"
                                    placeholder="example@gmail.com"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            <InputError message={errors.email} className="mt-2" />
                        </div>

                        {/* PASSWORD */}
                        <div>
                            <InputLabel htmlFor="password" value="Password" className="font-['inter']"/>

                            <div className="relative mt-1">
                                {/* Ikon Gembok (Kiri) */}
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
                                    className="mt-1 block w-full bg-[#F6F6F6] border-none rounded-xl py-3 pl-12 pr-12 font-['inter']-1 placeholder:text-[#A1A0A0]"
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

                        {/* CONFIRM PASSWORD */}
                        <div>
                            <InputLabel htmlFor="password_confirmation" value="Konfirmasi Password" className="font-['inter']"/>

                            <div className="relative mt-1">
                                {/* Ikon Gembok (Kiri) */}
                                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-lock-fill text-gray-400" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M8 0a4 4 0 0 1 4 4v2.05a2.5 2.5 0 0 1 2 2.45v5a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 13.5v-5a2.5 2.5 0 0 1 2-2.45V4a4 4 0 0 1 4-4m0 1a3 3 0 0 0-3 3v2h6V4a3 3 0 0 0-3-3"/>
                                    </svg>
                                </div>

                                {/* TextInput: sesuai show/hide */}
                                <TextInput
                                    id="password_confirmation"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full bg-[#F6F6F6] border-none rounded-xl py-3 pl-12 pr-12 font-['inter']-1 placeholder:text-[#A1A0A0]"
                                    placeholder="•••••••••••"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                />

                                {/* Tombol Show/Hide (Kanan) */}
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 focus:outline-none"
                                >
                                    {showConfirmPassword ? (
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
                                <InputError message={errors.password_confirmation} className="mt-2" />
                            </div>                            

                        </div>


                        {/* REGISTER BUTTON */}
                        <div className="pt-2">
                            <PrimaryButton 
                                className="w-full justify-center py-4 bg-[#005d67] 
                                hover:bg-[#004a52] 
                                rounded-xl transition-all 
                                font-['inter']-5 text-[16px] leading-[100%] 
                                normal-case tracking-normal text-center" 
                                disabled={processing}
                            >
                                Register
                            </PrimaryButton>
                        </div>

                        <div className="text-center mt-6">
                            <span 
                                style={{ 
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontWeight: 400,
                                    fontSize: '14px',
                                    lineHeight: '100%',
                                    letterSpacing: '0%',
                                    color: '#6B7280' 
                                }}
                            >
                                Sudah Punya Akun ?{' '}
                            </span>
                            <Link 
                                href='/login' 
                                style={{ 
                                    fontFamily: "'DM Sans', sans-serif",
                                    fontSize: '15px',
                                    lineHeight: '100%',
                                    color: '#07ACE6',
                                }}
                                className="underline"
                            >
                                Login Disini
                            </Link>
                        </div>

                    </form>
                </div>
            </div>

        </div>
        // <GuestLayout>
            
        //     <Head title="Register" />
        //     {/* header section */}
        //     <div className="mb-6 text-center">
        //         <h2 className="text-[32px] font-bold text-right leading-none tracking-normal"
        //             style={{fontFamily: 'Inter, sans-serif'}}>
        //             Daftar Sebagai {data.role === 'user'? 'Relawan' : 'Institusi/Organisasi'}
        //         </h2>
        //     </div>

        //     <form onSubmit={submit}>
        //         <div>
        //             <InputLabel htmlFor="name" value="Name" />

        //             <TextInput
        //                 id="user_name"
        //                 name="user_name"
        //                 value={data.user_name}
        //                 className="mt-1 block w-full"
        //                 autoComplete="name"
        //                 isFocused={true}
        //                 onChange={(e) => setData('user_name', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.user_name} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="email" value="Email" />

        //             <TextInput
        //                 id="email"
        //                 type="email"
        //                 name="email"
        //                 value={data.email}
        //                 className="mt-1 block w-full"
        //                 autoComplete="username"
        //                 onChange={(e) => setData('email', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.email} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel htmlFor="password" value="Password" />

        //             <TextInput
        //                 id="password"
        //                 type="password"
        //                 name="password"
        //                 value={data.password}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) => setData('password', e.target.value)}
        //                 required
        //             />

        //             <InputError message={errors.password} className="mt-2" />
        //         </div>

        //         <div className="mt-4">
        //             <InputLabel
        //                 htmlFor="password_confirmation"
        //                 value="Confirm Password"
        //             />

        //             <TextInput
        //                 id="password_confirmation"
        //                 type="password"
        //                 name="password_confirmation"
        //                 value={data.password_confirmation}
        //                 className="mt-1 block w-full"
        //                 autoComplete="new-password"
        //                 onChange={(e) =>
        //                     setData('password_confirmation', e.target.value)
        //                 }
        //                 required
        //             />

        //             <InputError
        //                 message={errors.password_confirmation}
        //                 className="mt-2"
        //             />
        //         </div>

        //         <div className="mt-4 flex items-center justify-end">
        //             <Link
        //                 href={route('login')}
        //                 className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        //             >
        //                 Already registered?
        //             </Link>

        //             <PrimaryButton className="ms-4" disabled={processing}>
        //                 Register
        //             </PrimaryButton>
        //         </div>
        //     </form>
        // </GuestLayout>
    );
}
