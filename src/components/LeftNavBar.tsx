'use client'

import { useState } from 'react';
import { Menu, X, Mail, Instagram, MapPin, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import '../css/leftNavBar.css';

interface LeftNavBarProps {
    children: React.ReactNode;
}

// Logo Component
function Logo() {
    return (
        <div className="h-16 flex items-center justify-center">
            <Image
                src="/logo-main.jpeg"
                alt="LHS Concept Logo"
                width={120}
                height={70}
                className="object-contain brightness-110"
            />
        </div>
    );
}

// Search Parameters Component
function SearchParams() {
    return (
        <div className="border border-zinc-300 rounded p-4 text-zinc-800">
            <span>Search Parameters Component</span>
        </div>
    );
}

// Social Icons Component
function SocialIcons() {
    const handleWhatsApp = () => {
        window.open('https://wa.me/YOUR_PHONE_NUMBER', '_blank');
    };

    const handleEmail = () => {
        window.location.href = 'mailto:your@email.com';
    };

    const handleInstagram = () => {
        window.open('https://instagram.com/YOUR_INSTAGRAM', '_blank');
    };

    const handleMaps = () => {
        window.open('https://maps.google.com/?q=YOUR_LOCATION', '_blank');
    };

    return (
        <div className="w-full border-t border-zinc-300 bg-zinc-100/50 backdrop-blur-sm">
            <div className="flex justify-around p-4">
                <button onClick={handleWhatsApp} className="p-2 text-zinc-600 hover:text-green-600 transition-colors">
                    <MessageSquare size={24} />
                </button>
                <button onClick={handleEmail} className="p-2 text-zinc-600 hover:text-blue-600 transition-colors">
                    <Mail size={24} />
                </button>
                <button onClick={handleInstagram} className="p-2 text-zinc-600 hover:text-pink-600 transition-colors">
                    <Instagram size={24} />
                </button>
                <button onClick={handleMaps} className="p-2 text-zinc-600 hover:text-red-600 transition-colors">
                    <MapPin size={24} />
                </button>
            </div>
        </div>
    );
}

// Navigation Content Component
function NavContent({ children, className = '', pt = 'p-4' }: {
    children: React.ReactNode;
    className?: string;
    pt?: string;
}) {
    return (
        <div className={`flex flex-col h-full ${pt} space-y-6 ${className}`}>
            <div className="flex-shrink-0">
                <Logo />
            </div>
            <div className="flex-shrink-0">
                <SearchParams />
            </div>
            <div className="flex-grow overflow-auto text-zinc-800">
                {children}
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <SocialIcons />
            </div>
        </div>
    );
}

// <LeftNavBar>
// <div className="p-4">
//   <h2>Filters will go here</h2>
// </div>
// </LeftNavBar>

export default function LeftNavBar({ children }: LeftNavBarProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Desktop Navigation */}
            <nav className="hidden lg:block lg:w-80 absolute top-0 left-0 h-screen nav-border bg-gradient-to-b from-zinc-100 to-zinc-200">
                <div className="relative h-full">
                    <div className="pb-20">
                        <NavContent>{children}</NavContent>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation */}
            <>
                {/* Burger Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="fixed top-4 left-4 z-[60] lg:hidden text-zinc-800"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Nav Overlay */}
                {isOpen && (
                    <div className="lg:hidden">
                        {/* Backdrop */}
                        <div
                            className="fixed inset-0 bg-black bg-opacity-20 z-40"
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Mobile Nav Content */}
                        <div className={`
                            fixed inset-0 z-50
                            bg-gradient-to-b from-zinc-100 to-zinc-200
                            transform transition-transform duration-300
                            ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                        `}>
                            <div className="pb-20">
                                <NavContent pt="pt-16 p-4">{children}</NavContent>
                            </div>
                        </div>
                    </div>
                )}
            </>
        </>
    );
} 