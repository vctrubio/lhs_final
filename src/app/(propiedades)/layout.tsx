import React from "react";
import SearchBar from "@/components/SearchBar";

export default function PLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            {/* <SearchBar /> */}
            {children}
        </div>
    );
}


/*
If SearchBar fetches data on the client but PLayout is server-rendered, you might run into hydration errors. Ensure that SearchBar properly handles any async operations.
*/