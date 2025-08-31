'use client';

const ClientLogos = () => {
    const logos = [
        { name: 'Chatgpt', src: '/img/chatgpt.png' },
        { name: 'Microsoft', src: '/img/microsoft.png' },
        { name: 'Alphabet', src: '/img/alphabet.png' },
        { name: 'Amazon', src: '/img/amazon.png' },
        { name: 'Oracle', src: '/img/orecel.png' },
        { name: 'Meta', src: '/img/meta.png' },
    ];

    return (
        <div className="py-16 overflow-hidden">
            <h2 className="text-center text-lg font-light leading-8 text-gray-800 mb-8">
                Dipercaya oleh perusahaan paling inovatif di dunia
            </h2>
            <div className="marquee">
                <div className="marquee-content flex items-center">
                    {/* Duplicate logos for a seamless scroll effect */}
                    {[...logos, ...logos].map((logo, index) => (
                        <img 
                            key={index} 
                            className="max-h-12 w-auto object-contain mx-12 grayscale hover:grayscale-0 transition-all duration-300" 
                            src={logo.src} 
                            alt={logo.name} 
                            // Add a fallback in case image fails to load
                            onError={(e) => { e.currentTarget.src = `https://placehold.co/120x50/333/FFF?text=${logo.name}`; }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClientLogos;
