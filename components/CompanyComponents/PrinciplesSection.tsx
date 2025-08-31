'use client';

import { motion } from 'framer-motion';
import { staggerContainer, fadeInUp } from '../../utils/lib/animations';

const principles = [
    {
        title: 'Inovasi Tanpa Henti',
        description: 'Kami tidak pernah puas. Kami terus mendorong batas-batas dari apa yang mungkin dilakukan oleh AI untuk membantu proses kreatif manusia.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56v4.82a6 6 0 01-1.24 3.53m-4.6-3.53l.01-.01m3.24-5.96a7.5 7.5 0 10-11.96-4.24l.01.01a7.5 7.5 0 0011.95 4.24z" />
            </svg>
        ),
        hoverClass: 'hover:skew-x-3'
    },
    {
        title: 'Fokus pada Developer',
        description: 'Kami membangun untuk developer, bersama developer. Masukan dari komunitas adalah bahan bakar utama bagi perkembangan produk kami.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75s.168-.75.375-.75.375.336.375.75zm.75 4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75zm4.5-4.5a.75.75 0 00-1.5 0v.75a.75.75 0 001.5 0v-.75z" />
            </svg>
        ),
        hoverClass: 'hover:-skew-y-3'
    },
    {
        title: 'Keterbukaan & Kolaborasi',
        description: 'Kami percaya pada komunikasi yang transparan dan membangun komunitas di mana pengetahuan dapat dibagikan secara bebas.',
        icon: (
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
            </svg>
        ),
        hoverClass: 'hover:skew-x-3'
    },
    {
        title: 'Integritas & Kualitas',
        description: 'Kami berkomitmen pada standar tertinggi untuk keandalan, keamanan, dan etika dalam semua yang kami lakukan.',
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        hoverClass: 'hover:-skew-y-3'
    },
];

const PrinciplesSection = () => (
    <section className="py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-2xl font-light text-[#1f1f1f]">
                    Prinsip yang Menjadi Pemandu Kami
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                    Empat pilar ini mendasari setiap baris kode yang kami tulis dan setiap keputusan yang kami ambil.
                </p>
            </div>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center mx-10"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                {principles.map((principle) => (
                    <motion.div
                        key={principle.title}
                        variants={{fadeInUp}}
                        className={`flex flex-col items-center border border-[#6e6b6b] rounded-3xl p-6 transition-transform duration-300 ease-in-out ${principle.hoverClass} hover:bg-[#e6e6e6] hover:shadow-lg`}
                    >
                        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-amber-100 text-amber-600 mb-4">
                            {principle.icon}
                        </div>
                        <h3 className="text-lg font-medium text-[#1f1f1f] mb-2">{principle.title}</h3>
                        <p className="text-sm text-gray-600">
                            {principle.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    </section>
);

export default PrinciplesSection;

