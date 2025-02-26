export default function Home() {
    return (
        <div className="flex flex-col border border-red-500">
            <div id="landing-page-view" className="flex flex-col gap-2">
                <div className="border min-h-[420px]" id="tmp-foto">
                    Cover
                </div>
                <div className="flex justify-between border border-black">
                    <div className="w-3/4 min-h-[420px]" id="tmp-foto">
                        MAP
                    </div>
                    <div className="flex flex-col justify-center gap-2 mx-auto [&>*]:border [&>*]:rounded-xl [&>*]:p-2">
                        <div>Guia de Barrios</div>
                        <div>Servicios</div>
                        <div>Contacta con Nosotros</div>
                    </div>
                </div>
            </div>
            <div className="mx-auto border p-6">Footer: Sobre nosotros</div>
        </div>
    );
}
