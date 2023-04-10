import React from 'react'
import Link from 'next/link'

function Header() {
    return (
        <header className='w-full bg-white border-b p-6'>
            <div className="container mx-auto">
                <nav className='w-full flex justify-between items-center'>
                    <Link href={'/products'} className='text-2xl font-bold'>
                        Products
                    </Link>
                    <ul className='flex items-center'></ul>
                </nav>
            </div>
        </header>
    )
}

export default Header