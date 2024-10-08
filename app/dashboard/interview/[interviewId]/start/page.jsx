"use client"

import React,{useEffect, useState} from 'react'
import { eq } from 'drizzle-orm';
import { db } from '@/utils/db';
import { AiMock } from '@/utils/schema';
import QuestionSection from './_component/QuestionSection';
import RecordAnswerSection from './_component/RecordAnswerSection';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            <QuestionSection mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex = {activeQuestionIndex}
            />

            <RecordAnswerSection
            mockInterviewQuestion={mockInterviewQuestion}
            activeQuestionIndex = {activeQuestionIndex}
            interviewData = {interviewData}
            />


        </div>
        <div className=" flex justify-end gap-6">
                 {activeQuestionIndex>0&& <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Button</Button>}
                {activeQuestionIndex!=mockInterviewQuestion?.length-1&& <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Button</Button>}
                {activeQuestionIndex==mockInterviewQuestion?.length-1&&
                <Link href={'/dashboard/interview/'+interviewData?.mockId+'/feedback'}>
                <Button>End Button</Button>
                </Link>}
        </div>
    </div>

    
  )
}

export default startInterview;