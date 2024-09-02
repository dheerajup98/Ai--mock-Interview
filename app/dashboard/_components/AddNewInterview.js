"use client"

import React,{useState} from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle, 
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/GeminiAiModel'
import { LoaderCircle } from 'lucide-react'
import { db } from '@/utils/db'
import { AiMock } from '@/utils/schema'
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs'
import moment from 'moment'
import { useRouter } from 'next/navigation'



function AddNewInterview() {

  const [openDialog, setOpenDialog] = useState(false);
  const [jobDescription, setJobDescription] = useState();
  const [jobPosition, setJobPosition] = useState();
  const [jobExperience, setJobExperience] = useState();
  const [loading, setLoading] = useState(false);
  const [jsonResp, setJsonResp] = useState([]);
  const {user} = useUser();
  const router = useRouter();

  const onSubmit = async(e)=>{
    setLoading(true);
   e.preventDefault();
   console.log(jobPosition,jobDescription,jobExperience);

   const InputPrompt = "job position : "+jobPosition+",+ job description: "+jobDescription+", year of experience: "+jobExperience+"according to giving information please give me 5 question and answer in json format";
   
   const result = await chatSession.sendMessage(InputPrompt);
   const MockJsonResponse = (result.response.text()).replace('```json','').replace('```','')

   console.log(JSON.parse(MockJsonResponse));
   setJsonResp(MockJsonResponse);

   if(MockJsonResponse){
  const resp = await db.insert(AiMock)
  .values({
    mockId : uuidv4(),
    jsonMockResp : MockJsonResponse,
    jobPosition : jobPosition,
    jobDesc : jobDescription,
    jobExperience : jobExperience,
    createdBy : user?.primaryEmailAddress?.emailAddress,
    createdAt : moment().format('dd-mm-yyyy'),
  }).returning({mockId:AiMock.mockId});

  console.log("inserted id:",resp);
  if(resp){
    setOpenDialog(false);
    router.push('/dashboard/interview/'+resp[0]?.mockId)
  }
}
else{
  console.log('error');
}
   setLoading(false);
  }

  return (
    <div>
        <div className="p-10 rounded-lg border bg-secondary hover:scale-105 hover:shadow-md transition-all cursor-pointer" onClick={()=>setOpenDialog(true)}>
            <h2 className = "text-lg text-center">+ Add New</h2>
        </div>

        <Dialog open={openDialog}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle className="text-2xl">Tell Us More About your Job Interviewing</DialogTitle>
      <DialogDescription>
        <form onSubmit={onSubmit}>
        <div>
          <h2>Add Details about your job position/role, job description and years of experience</h2>
          <div className="mt-7 my-2">
            <label>Job role/Job position</label>
             <Input placeholder="EX. Front-End Developer" required onChange={(e)=>setJobPosition(e.target.value)}  />
          </div>
          <div className=" my-3">
            <label>Job Description/ Tech stack (In Short)</label>
             <Textarea placeholder="EX. React js, Node js, Next js, Javascript, C++" required onChange={(e)=>setJobDescription(e.target.value)} />
          </div>
          <div className=" my-3">
            <label>Year of experience</label>
             <Input placeholder="Ex. 1" type="number" max="20" required onChange={(e)=>setJobExperience(e.target.value)}/>
          </div>
        </div>
        <div className=" flex gap-5 justify-end">
          <Button type="button" variant="ghost" onClick={()=>setOpenDialog(false)}>cancel</Button>
          <Button type="submit" disabled={loading}>
             {loading ? <>
             <LoaderCircle className=" animate-spin"/>
             generating from AI
             </> : 'Start Interview'}
            </Button>
        </div>
        </form>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

    </div>
  )
}

export default AddNewInterview;