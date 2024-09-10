"use client"

import { Button } from '@/components/ui/button';
import useSpeechToText from 'react-hook-speech-to-text';
import Image from 'next/image';
import React from 'react'
import Webcam from 'react-webcam';
import { Mic } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAmp } from 'next/amp';
import { toast } from 'sonner';
import { chatSession } from '@/utils/GeminiAiModel';

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex}) {

    const [userAnswer, setUserAnswer] = useState('');

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
      } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
      });

      useEffect(()=>{
        results.map((result)=>{
            setUserAnswer(prevAns=> prevAns+result?.transcript)
        })
      },[results])

      const saveUserAnswer = async ()=>{
        if(isRecording)
        {
          stopSpeechToText();
          if(userAnswer?.length<10)
          {
            toast("Error while saving your answer, Please record again")
            return;
          }
          const feedbackPrompt = "Question:"+  mockInterviewQuestion[activeQuestionIndex]?.question+" ,user answer:"+userAnswer +
          ", Depends on questions and user Answer for give interview question"+ " please give us rating for answer and feebback as area of improvement if any" +
          "in just 3 to 5 lines to improve in JSON format with rating field and feedback field."
   
          const result = await chatSession.sendMessage(feedbackPrompt);

          const mockJsonResp = (result.response.text()).replace('```json','').replace('```','');
          console.log(mockJsonResp);

          const jsonFeedbackResp = JSON.parse(mockJsonResp);


        }else{
          startSpeechToText();
        }
      }

 

  return (
    <div className=" flex-col justify-center items-center">
        
    <div className=" flex flex-col mt-20 justify-center items-center p-5 rounded-lg bg-black">
       <Image src={'/webcam.png'} height={200} width={200} className=" absolute"/>
       <Webcam mirrored={true} style={{height:300,width:'100%',zIndex:10}}/>
    </div>

    <Button onClick={saveUserAnswer} variant="outline" className=" my-10">
        {isRecording ?
        <h2 className="text-red-600 gap-2">
            <Mic/> Stop Recording
        </h2>    
        : 'record answer'}
        </Button>



      

   

    </div>

  )
}

export default RecordAnswerSection;