import React from "react";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import NavBar from "@/components/NavBar";

export default async function MainLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <NuqsAdapter>
            <body className="flex flex-col">
                <NavBar />
                <main className="pb-8 mt-16 mx-auto">
                    {children}
                </main>
            </body>
        </NuqsAdapter>
    );
}

