import { X, Twitter, Facebook, Linkedin, Link } from 'lucide-react';

export default function ShareModal({ isOpen, onClose, title, url }) {
    if (!isOpen) return null;

    const message = `Mira lo que encontrado en LHS Concept.\n${title}\nPropiedades de Lujo en Madrid\n${url}`;
    
    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(message);
            alert('¡Enlace copiado!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-2xl font-serif mb-4">Compartir</h2>

                <div className="grid grid-cols-2 gap-4">
                    <a
                        href={shareLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                        <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                        <span>Twitter</span>
                    </a>

                    <a
                        href={shareLinks.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                        <Facebook className="w-5 h-5 text-[#4267B2]" />
                        <span>Facebook</span>
                    </a>

                    <a
                        href={shareLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                        <Linkedin className="w-5 h-5 text-[#0077B5]" />
                        <span>LinkedIn</span>
                    </a>

                    <button
                        onClick={copyToClipboard}
                        className="flex items-center justify-center gap-2 p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                    >
                        <Link className="w-5 h-5 text-gray-600" />
                        <span>Copiar enlace</span>
                    </button>
                </div>
            </div>
        </div>
    );
} 