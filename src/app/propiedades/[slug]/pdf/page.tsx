import React from 'react';

const PdfPageOne = () => {
    return (
        <>
            <div className="bg-white mx-auto shadow-md border border-gray-300 w-a4 h-a4 p-10">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-center">Document Title</h1>
                    <p className="text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Add additional content to fill out your A4-styled page. Tailwind makes it easy to maintain consistent spacing and layout.
                    </p>
                </div>
            </div>
        </>
    )
}

const PdfPageTwo = () => {
    return (
        <>
            <div className="bg-white mx-auto shadow-md border border-gray-300 w-a4 h-a4 p-10">
                <div className="space-y-6">
                    <h1 className="text-3xl font-bold text-center">Document Title</h1>
                    <p className="text-lg leading-relaxed">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.
                    </p>
                    <p className="text-lg leading-relaxed">
                        Add additional content to fill out your A4-styled page. Tailwind makes it easy to maintain consistent spacing and layout.
                    </p>
                </div>
            </div>
        </>
    )
}


export default function PdfView() {
    return (
        <div className="bg-gray-100 p-4">
            <PdfPageOne />
            <PdfPageTwo />
        </div>
    );
};