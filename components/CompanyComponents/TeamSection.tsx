'use client';

import { motion } from 'framer-motion';
import { staggerContainer } from '../../utils/lib/animations';
import TeamCard from './TeamCard';

export const teamMembers = [
    {
        id: 1,
        name: 'Hairi Gunawan',
        title: 'CEO & Co-Founder',
        imageUrl: 'https://placehold.co/400x400/EAB308/333333?text=HG',
        description: 'Memiliki pengalaman lebih dari 10 tahun dalam memimpin tim produk di berbagai startup teknologi. Ia bersemangat membangun produk yang tidak hanya fungsional, tetapi juga disukai pengguna.',
        githubUrl: 'https://github.com/hairigunawan',
        linkedUrl: 'https://www.linkedin.com/in/hairi-gunawan-0b480937b/',
    },
    {
        id: 2,
        name: 'Khatim Hidayatullah',
        title: 'CTO & Co-Founder',
        imageUrl: 'https://placehold.co/400x400/3B82F6/FFFFFF?text=KH',
        description: 'Sebagai arsitek utama di balik teknologi AI kami, ia adalah seorang ahli Machine Learning dengan rekam jejak riset dan implementasi model AI berskala besar.',
        githubUrl: 'https://github.com/khatim18',
        linkedUrl: 'www.linkedin.com/in/khatim-hidayatullah-582a99381',
    }
];


const TeamSection = () => (
    <section className="bg-gray-900 py-16">
        <div className="container mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl lg:text-4xl font-light text-white">
                    Orang-orang di Balik AI Code
                </h2>
                <p className="text-sm max-w-xl mx-auto text-gray-400 mt-4">
                    Kami adalah tim yang terdiri dari para pemimpi, pembuat, dan pemecah masalah yang memiliki hasrat untuk teknologi dan pemberdayaan developer.
                </p>
            </div>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 justify-items-center mx-auto gap-12 max-w-2xl"
                variants={staggerContainer}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
            >
                {teamMembers.map((member) => (
                    <TeamCard key={member.name} {...member} />
                ))}
            </motion.div>
        </div>
    </section>
);

export default TeamSection;

