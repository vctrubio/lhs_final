import Link from "next/link";

export default function LHSBond({ title = "lhs", concept = "Concept" }) {
    return (
        <div className="flex-col [&_*]:flex">
            <div className="h-4/5 justify-center text-[28px]">
                <Link href="/">
                    <div
                        className="justify-center items-center mx-auto 
                        text-center tracking-wide uppercase w-[62px] h-[62px]
                        bg-black dark:bg-white rounded-[100%] text-white
                        cursor-pointer dark:text-black transition-colors duration-300
                        "
                    >
                        {title}
                    </div>
                    <div className="justify-center items-center">{concept}</div>
                </Link>
            </div>
        </div>
    );
}
