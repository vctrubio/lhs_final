"use client";
import { X, Mail, Link } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ShareModal({ isOpen, onClose, title, url }) {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            window.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const pdfUrl = `${url}/pdf`;

    const shareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
    };

    const pdfShareLinks = {
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(pdfUrl)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(pdfUrl)}`,
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // alert('¡Enlace copiado!');
            onClose();
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    const handleButtonClick = (link) => {
        window.open(link, '_blank');
        onClose();
    };

    const renderShareButtons = (links, copyText) => (
        <div className="flex justify-around gap-4">
            <button
                onClick={() => handleButtonClick(links.whatsapp)}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-greener hover:bg-greenish transition-colors"
            >
                <svg className="w-5 h-5 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span>WhatsApp</span>
            </button>
            <button
                onClick={() => handleButtonClick(links.email)}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-greener hover:bg-greenish transition-colors"
            >
                <Mail className="w-5 h-5 text-gray-600" />
                <span>Email</span>
            </button>
            <button
                onClick={() => copyToClipboard(copyText)}
                className="flex items-center justify-center gap-2 p-3 rounded-lg border border-greener hover:bg-greenish transition-colors"
            >
                <Link className="w-5 h-5 text-gray-600" />
                <span>Copiar</span>
            </button>
        </div>
    );

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div ref={modalRef} className="bg-background rounded-lg max-w-md w-full p-6 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>

                <div className='flex-col justify-around divide-y divide-greener'>
                    <div className='my-4'>
                        <h2 className="font-serif mb-4">Compartir • {title} </h2>
                        {renderShareButtons(shareLinks, url)}
                    </div>

                    <div>
                        <h2 className="font-serif mt-2 mb-4">Compartir Ficha</h2>
                        {renderShareButtons(pdfShareLinks, pdfUrl)}
                    </div>
                </div>
            </div>
        </div>
    );
}