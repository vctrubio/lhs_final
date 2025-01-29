import Link from 'next/link';

export function LHSBond({ title='lhs', concept='Concept', tag='propiedades selectas', flag=true }) {
    return (
        <div className='flex flex-col [&_*]:flex w-[600px] font-sarif mx-auto'>
            <div className='h-4/5 flex-col sm:flex-row justify-center text-[102px]'>
                <div className='justify-center items-center mx-auto 
                    text-center tracking-wide uppercase w-[242px] h-[242px]
                    bg-black rounded-[100%] text-background
                    m-1 p-8 cursor-pointer'
                    style={{
                        fontFamily: 'Times New Roman !important',
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </div>
                <div className='justify-center sm:justify-start items-center pb-1'
                >
                    {concept}
                </div>
            </div>
            {flag && 
                <div className='flex justify-center w-full
                    text-[42px] text-center tracking-[8px]
                    rounded-xl
                    bg-gold text-background'
                >
                    {tag}
                </div>
            }
        </div>
    )
}
