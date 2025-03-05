import React from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import SearchBar  from "@/components/SearchBar";

export default async function PropertyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NuqsAdapter>
            <SearchBar />
            {children}
        </NuqsAdapter>
    );
}

