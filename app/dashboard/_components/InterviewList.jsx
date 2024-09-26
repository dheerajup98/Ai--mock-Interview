"use client"

import { db } from '@/utils/db';
import { AiMock } from '@/utils/schema';
import { useUser } from '@clerk/nextjs';
import { desc, eq } from 'drizzle-orm';
import React,{useEffect, useState} from 'react'
import InterviewItemCard from './InterviewItemCard';

function InterviewList() {

    const [interviewList, setInterviewList] = useState([])

    const {user} = useUser();

    useEffect(()=>{
       user&&GetInterviewList();
    },[user])

    const GetInterviewList = async()=>{
        const result = await db.select().from(AiMock).where(eq(AiMock.createdBy, user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(AiMock.id))

        console.log(result);
        setInterviewList(result);
    }

  return (
    <div className=" font-medium text-xl">Previous Mock Interview
    
    <div>
        {interviewList&&interviewList.map((interview, index)=>{
          <InterviewItemCard
          interview={interview}
          key={index}/>
        })}
        
    </div>
    
    </div>

    
  )
}

export default InterviewList;