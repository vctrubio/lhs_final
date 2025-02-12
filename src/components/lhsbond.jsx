import Link from 'next/link';

export function LHSBond({ title = 'lhs', concept = 'Concept' }) {
    return (
        <div className='flex-col [&_*]:flex font-ariel py-1 shadow-inner shadow-sm'>
            <div className='h-4/5 justify-center h-[62px] text-[28px]'>
                    <Link href='/'>
                        <div className='justify-center items-center mx-auto 
                        text-center tracking-wide uppercase w-[62px] h-[62px]
                        bg-black rounded-[100%] text-background
                        cursor-pointer
                        '
                        >
                            {title}
                        </div>
                    </Link>
                    <div className='justify-center items-center'
                    >
                        {concept}
                    </div>
            </div>
        </div>
    )
}
