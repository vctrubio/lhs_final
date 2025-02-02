"use client";
import { usePathname, useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function BackButton() {
    const router = useRouter();
    const pathname = usePathname();

    const goBackOneLevel = () => {
        const segments = pathname.split("/").filter(Boolean); // Remove empty segments
        if (segments.length > 1) {
            const newPath = "/" + segments.slice(0, -1).join("/");
            router.push(newPath); // Navigate to the new path
        } else {
            router.push("/"); // Go to home if there's nowhere else to go
        }
    };

    return (
        <button className="burger-button" onClick={goBackOneLevel}>
            <ChevronLeft size={44} />
        </button>
    );
}