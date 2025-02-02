import Link from 'next/link';

export function LHSBond({ title='lhs', concept='Concept'}) {
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

        </div>
    )
}
