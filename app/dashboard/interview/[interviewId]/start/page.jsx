"use client"

import React,{useEffect, useState} from 'react'
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { AiMock } from '@/utils/schema';
import QuestionSection from './_component/QuestionSection';

function startInterview({params}) {

    const [interviewData, setInterviewData] = useState();
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState();
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);

    useEffect(()=>{
        getInterviewDetails(params.interviewId);
    },[]);

    const getInterviewDetails = async()=>{
        const result = await db.select().from(AiMock).where(eq(AiMock.mockId,params.interviewId));

        const jsonMockResp = JSON.parse(result[0].jsonMockResp);
        setMockInterviewQuestion(jsonMockResp);
        console.log(jsonMockResp);
        setInterviewData(result[0]);
    }



  return (
    <div>
        <div className="grid grid-cols-1 md:grid-cols-2">

            <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex = {activeQuestionIndex}
            />


        </div>

    </div>
  )
}

export default startInterview;