"use client"

import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq} from 'drizzle-orm';
import React,{useEffect, useState} from 'react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';




function feedback({params}) {

  const[feedbackList, setFeedbackList] = useState();
  const router = useRouter();

  useEffect(()=>{
    GetFeedback();
  },[]);

  const GetFeedback = async()=>{
    const result = await db.select().from(UserAnswer).where(eq(UserAnswer.mockIdRef, params.interviewId)).orderBy(UserAnswer.id);
    console.log(result);
    setFeedbackList(result);
  }


  return (
    <div className="p-10">
       <h2 className="text-3xl font-bold text-green-500">Congratulation!</h2>
       <h2 className=" font-bold text-2xl">Here is your interview feedback</h2>
        <h2 className=" text-lg text-primary my-3">Your overall interview rating: <strong>7/10</strong></h2>
        <h2 className=" text-sm text-gray-500">Find below interview question with correct answer, Your answer and feedback for improvement. </h2>
        {feedbackList&&feedbackList.map((item,index)=>{
         <Collapsible key={index}>
         <CollapsibleTrigger className=" p-2 bg-secondary rounded-lg">{item.question}</CollapsibleTrigger>
         <CollapsibleContent>
           Yes. Free to use for personal and commercial projects. No attribution
           required.
         </CollapsibleContent>
       </Collapsible>
       
        })}
        <Button onClick={()=>router.replace('/')}>Go Home</Button>
    </div>
  )
}

export default feedback;