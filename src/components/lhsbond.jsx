import Link from 'next/link';

export function LHSBond({ title='lhs', concept='Concept', tag='propiedades selectas', flag=true }) {
    return (
        <div className='flex flex-col [&_*]:flex font-sarif py-1'>
            <div className='h-4/5 justify-center h-[62px] '>
                <Link href='/'>
                    <div className='justify-center items-center mx-auto 
                        text-center tracking-wide uppercase w-[62px] h-[62px]
                        bg-black rounded-[100%] text-background
                        cursor-pointer
                        text-[26px]
                        '
                        style={{
                            fontFamily: 'Times New Roman !important',
                            fontWeight: 'bold',
                        }}
                    >
                        {title}
                    </div>
                </Link>
                <div className='justify-center items-center 
                    text-[26px]' 
                >
                    {concept}
                </div>
            </div>
            {/* {flag && 
                <div className='flex justify-center w-full
                    text-[28px] sm:text-[40px] text-center tracking-[8px]
                    rounded-xl px-4
                    bg-gold text-background'
                >
                    {tag}
                </div>
            } */}
        </div>
    )
}
