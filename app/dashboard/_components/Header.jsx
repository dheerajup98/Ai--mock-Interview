"use client"

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'

function Header() {

  const router = useRouter();

    const path = usePathname();
    console.log(path);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm cursor-pointer">
        <Image  onClick={()=>router.push('/')} src={'/logo.svg'} width="100" height="100" alt="logo" />

        <ul className=" hidden md:flex gap-6 cursor-pointer">
         <li onClick={()=>router.push('/dashboard')} className={`hover:text-primary hover:font-bold transition ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
          <li onClick={()=>router.push('/dashboard/questions')} className={`hover:text-primary hover:font-bold transition ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
           <li onClick={()=>router.push('/dashboard/upgrade')}  className={`hover:text-primary hover:font-bold transition ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
           
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header;