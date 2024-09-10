import { Lightbulb, Volume2 } from 'lucide-react';
import React from 'react'

function QuestionSection({mockInterviewQuestion,activeQuestionIndex}) {

   const textToSpeech = (text)=>{
     if('speechSynthesis' in window)
     {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
     } else{
      alert('sorry your browser does not support text to speech');
      
     }

   }

  return mockInterviewQuestion&&(
    <div className="p-5 border rounded-lg">
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 cursor-pointer">
              {mockInterviewQuestion&&mockInterviewQuestion.map((question,index)=>{
                 return <h2 className={`'bg-secondary p-2 rounded-full text-xs md:text-sm text-center cursor-pointer'
                 ${activeQuestionIndex==index&&'bg-primary text-white'}`}>
                    Question #{index+1}</h2>
              })}
           </div>

        <h2 className="my-5 text-md md:text-lg">{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2 className="cursor-pointer" onClick={()=>textToSpeech(mockInterviewQuestion[activeQuestionIndex]?.question)}/>

         <div className="border rounded-lg p-5 bg-blue-100 mt-20">
            <h2 className=" flex gap-2 item-center text-primary">
                <Lightbulb/>
                <strong>Note:</strong>
            </h2>
            <h2 className="text-primary my-2 text-sm">Click on record answer when you want to answer the question. At the end of interview
                we will give you the feedback along with your correct answer for each of question and your to compare it.
            </h2>
         </div>
    </div>
  )
}

export default QuestionSection;