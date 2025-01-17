import Image from 'next/image';

export default function ImageLogo() {
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