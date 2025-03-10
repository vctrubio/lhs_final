'use client';
import Image from 'next/image';
import React from 'react';
import { Globe } from 'lucide-react';

const TextContent = () => {
    return (
        <div>
            <h2 className="font-montserrat text-sm uppercase tracking-widest text-madrid-accent mb-8">Descubre Madrid</h2>
            <h3 className="font-cormorant text-3xl md:text-4xl lg:text-5xl font-light text-neutral-800 mb-8">Vive La Autenticidad Que Ofrece Nuestra Cuidad</h3>
            <div className='mt-4'>
                <p className="font-montserrat text-neutral-600 mb-6 leading-relaxed">
                    Madrid combina una rica historia con una sofisticación moderna. Como la vibrante capital de España, ofrece una calidad de vida inigualable, con instituciones culturales de primer nivel, una gastronomía exquisita y una arquitectura impresionante.
                </p>
                <p className="font-montserrat text-neutral-600 mb-8 leading-relaxed">
                    Desde los elegantes bulevares de Salamanca hasta la energía artística de Malasaña,
                    cada barrio tiene su propio carácter y encanto. Nuestra experiencia te ayuda a navegar
                    por estas zonas únicas para encontrar la propiedad perfecta que se adapte a tu estilo de vida.
                </p>
            </div>
            <button className="px-6 py-3 bg-neutral-800/90 hover:bg-neutral-800 text-white border border-madrid-accent/20 hover:border-madrid-accent/40 rounded-none transition-all duration-300 font-montserrat uppercase tracking-wider font-light flex items-center">
                <Globe className="mr-2 text-madrid-accent" size={20} />
                Nuestro Blog
            </button>
        </div>
    );
};

const ImageGrid = () => {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
                <ImageCard src="https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Madrid Royal Palace" />
                <ImageCard src="https://images.unsplash.com/photo-1570698473651-b2de99bae12f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Madrid Street" />
            </div>
            <div className="space-y-2">
                <ImageCard src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Plaza Mayor" />
                <ImageCard src="https://images.unsplash.com/photo-1573455494060-c5595004fb6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Plaza Mayor" />
                <ImageCard src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Madrid Cuisine" />
            </div>
        </div>
    );
};

const ImageCard = ({ src, alt }) => {
    return (
        <div className="overflow-hidden rounded-sm shadow-md">
            <Image
                src={src}
                alt={alt}
                width={800}
                height={600}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
            />
        </div>
    );
};

const DiscoverMadrid = () => {
    return (
        <section className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <TextContent />
                    <ImageGrid />
                </div>
            </div>
        </section>
    );
};

export default DiscoverMadrid;