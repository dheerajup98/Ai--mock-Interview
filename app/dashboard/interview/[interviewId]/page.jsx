"use client"

import { db } from '@/utils/db';
import { AiMock } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React,{useEffect} from 'react'


function interview({params}) {

    useEffect(()=>{
        console.log(params);
        getInterviewDetails();
    },[]);

    const getInterviewDetails = async()=>{
        const result = await db.select().from(AiMock).where(eq(AiMock.mockId,params.interviewId));
        console.log(result);
    }
  return (
    <div>
        
        interview


    </div>
  )
}

export default interview;