"use client";
import React, { useState } from "react";

export default function DownloadPdfButton({ slug }: { slug: string }) {
    const [loading, setLoading] = useState(false);

    const handleDownloadPdf = async () => {
        setLoading(true);
        try {
            console.log("Downloading PDF for slug:", slug);

            const response = await fetch(`/api/generate-pdf?slug=${slug}`);

            if (!response.ok) {
                const errorText = await response.text();
                console.error("PDF API Error:", errorText);
                throw new Error("Failed to generate PDF");
            }

            console.log("PDF Download Success");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${slug}.pdf`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
        setLoading(false);
    };

    return (
        <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mb-4"
            disabled={loading}
        >
            {loading ? "Generating PDF..." : "Download PDF"}
        </button>
    );
}
