import React from 'react'

export default function DownloadPdfPage({ params }: { params: { slug: string } }) {
    return (
        <div>
            <h1>PDF: {params.slug}</h1>
        </div>
    )
}