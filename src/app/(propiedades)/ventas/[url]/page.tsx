"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function PropertyDetails() {
    const { url } = useParams();

    return (
        <div>
            <h1>Property Details</h1>
            <p>You are at the right space: {url}</p>
        </div>
    );
}