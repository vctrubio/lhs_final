import React from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'

export default async function PropertyLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NuqsAdapter>
            {children}
        </NuqsAdapter>
    );
}

