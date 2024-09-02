"use client"

import { UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react'

function Header() {

    const path = usePathname();
    console.log(path);

  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-sm">
        <Image src={'/logo.svg'} width="100" height="100" alt="logo" />

        <ul className=" hidden md:flex gap-6 cursor-pointer">
           <li className={`hover:text-primary hover:font-bold transition ${path == '/dashboard' && 'text-primary font-bold'}`}>Dashboard</li>
           <li className={`hover:text-primary hover:font-bold transition ${path == '/dashboard/questions' && 'text-primary font-bold'}`}>Questions</li>
           <li className={`hover:text-primary hover:font-bold transition ${path == '/dashboard/upgrade' && 'text-primary font-bold'}`}>Upgrade</li>
           <li className={`hover:text-primary hover:font-bold transition ${path == '/how' && 'text-primary font-bold'}`}>How it Works?</li>
        </ul>
        <UserButton/>
    </div>
  )
}

export default Header;