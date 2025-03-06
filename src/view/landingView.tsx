"use client";
import React, { useState, useEffect } from "react";
import InfoPanel from "../components/InfoPanel";
import Map from "../components/Map";
import PropertySwiper from "@/components/PropertySwiper";
import { Property } from "#/backend/types";
import { fetchProperties } from "#/backend/CRM/fetch";

export default function Home() {
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        fetchProperties().then(({ properties }) => {
            if (properties.length > 0) {
                setProperty(properties[0]);
            }
        });
    }, []);

    return (
        <div className="flex flex-col border border-red-500">
            <div id="landing-page-view" className="flex flex-col gap-2">
                <div className="border min-h-[420px]" id="tmp-foto">
                    {/* {property ? <PropertySwiper images={property.photos_url} /> : "Loading..."} */}
                </div>
                <div className="flex justify-between border border-black">
                    <div className="flex-1 min-h-[420px]" id="tmp-map">
                        <Map />
                    </div>
                    <div className="flex-1 flex flex-col justify-center gap-2 px-4 [&>*]:border [&>*]:rounded-xl [&>*]:p-2">
                        <InfoPanel />
                    </div>
                </div>
            </div>
            <div className="mx-auto border p-6">Footer: Sobre nosotros</div>
        </div>
    );
}
