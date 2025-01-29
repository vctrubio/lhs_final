import Link from 'next/link';

export function LHSBond({ title='lhs', concept='Concept', tag='propiedades selectas', flag=true }) {
    return (
        <div className='flex flex-col [&_*]:flex font-sarif mx-auto'>
            <div className='h-4/5 flex-col sm:flex-row justify-center '>
                <Link href='/'>
                    <div className='justify-center items-center mx-auto 
                        text-center tracking-wide uppercase w-[242px] h-[242px]
                        bg-black rounded-[100%] text-background
                        sm:m-1 p-8 cursor-pointer
                        text-[102px]'
                        style={{
                            fontFamily: 'Times New Roman !important',
                            fontWeight: 'bold',
                        }}
                    >
                        {title}
                    </div>
                </Link>
                <div className='justify-center sm:justify-start items-center 
                    text-[48px] sm:text-[102px] pb-1'
                >
                    {concept}
                </div>
            </div>
            {flag && 
                <div className='flex justify-center w-full
                    text-[28px] sm:text-[40px] text-center tracking-[8px]
                    rounded-xl px-4
                    bg-gold text-background'
                >
                    {tag}
                </div>
            }
        </div>
    )
}
