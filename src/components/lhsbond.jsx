export function LHSBond({ title='lhs', concept='Concept', tag='propiedades selectas' }) {
    return (
        <div className='flex flex-col [&_*]:flex w-[600px] font-sarif'>
            <div className='h-4/5 flex-col md:flex-row justify-center text-[102px]'>
                <div className='justify-center items-center mx-auto 
                    text-center tracking-wide uppercase w-[242px] h-[242px]
                    border rounded-[100%]
                    m-1 p-8'
                    style={{
                        fontFamily: 'Times New Roman !important',
                        fontWeight: 'bold',
                    }}
                >
                    {title}
                </div>
                <div className='justify-center md:justify-start items-center pb-3'
                >
                    {concept}
                </div>
            </div>
            <div className='px-5 py-2 flex justify-center w-full
                text-[42px] text-center tracking-[8px]
                rounded-xl
                bg-blue-400'>
                {tag}
            </div>
        </div>
    )
}
