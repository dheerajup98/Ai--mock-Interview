"use client"

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { AiMock } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React,{useEffect,useState} from 'react'
import Webcam from 'react-webcam';


 function interview({params}) {

  const [interviewData, setInterviewData] = useState();
  const [webcamEnabled,  setWebcamEnabled] = useState(false);

    useEffect(()=>{
        console.log(params.interviewId);
        getInterviewDetails();
    },[]);

    const getInterviewDetails = async()=>{
        const result = await db.select().from(AiMock).where(eq(AiMock.mockId,params.interviewId));
        setInterviewData(result[0]);
    }
  return (
    <div className="my-10 ">
        
        <h2 className=" font-bold text-2xl">Let's Get Started</h2>

        <div className="grid grid-cols-1 md:grid-cols-2">

          
          <div className=" flex flex-col my-5 gap-5 p-5">
            <div className=" flex flex-col gap-5 rounded-lg border">
            <h2 className=" text-lg"><strong>Job Role/Job Position:</strong>Full stack Developer</h2>
            <h2 className=" text-lg"><strong>Job Description/Tech Stack:</strong>Reactjs, Nodejs</h2>
            <h2 className=" text-lg"><strong>Year Of Experience:</strong>4</h2>
            </div>

            <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
              <h2  className=" gap-2 items-center text-yellow-500"><Lightbulb/><strong>information</strong></h2>
              <h2 className=" text-yellow-500 mt-3">Enable video webcam and microphone to start your AI Generation Mock Interview. It has 5 question which you can answer
                and at the last you will get the report on the basis of your answer. NOTE: we never record your video, web cam access
                you disabled at any time of you want.
              </h2>
            </div>
     
          </div>
          
        <div>
            {
              webcamEnabled ? <Webcam 
               onUserMedia={()=>setWebcamEnabled(true)}
               onUserMediaError={()=>setWebcamEnabled(false)}
               mirrored={true}
              style={{height:300, width:300}} /> :
              <>
             <WebcamIcon className=" h-72 w-full my-7 bg-secondary p-20 rounded-lg border"/>
             <Button variant="ghost" className="w-full" onClick={()=>setWebcamEnabled(true)}>Enable Webcam and Microphone</Button>
             </>
            }
          </div>
        </div>

          <div className=" flex justify-end items-end">
    
           <Link href={'/dashboard/interview/'+params.interviewId+'/start'}>
              <Button>Start Interview</Button>
           </Link>
             
          
          
          </div>

    </div>
  )
}

export default interview;