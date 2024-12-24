'use client';
import { useActionState } from "react";
import { useEffect } from "react";
import { useRouter } from 'next/navigation'

import { saveForm } from "@/actions/saveForm";
const INITIAL_STATE = {
  zodError: null,
  data:{
    full_name:"",
    email:""
  },
  message: null
};
const page = () => {
  const [formState, formAction, isPending] = useActionState(saveForm,INITIAL_STATE);
  const router = useRouter()

 const {full_name, email} = formState?.data || {};
 useEffect(()=>{
  if(formState?.message === 'form saved successfully'){
    router.push('/blog');
  }
 
 },[formState?.message]);
  return (
    <form action={formAction} >
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">name</span>          
        </div>
        <input type="text"
         name="full_name"
         defaultValue={full_name}
         placeholder="Full Name" 
         className="input input-bordered w-full max-w-xs" />
        <div className="label">
        {formState?.zodError?.full_name && (<span className="label-text-alt">{formState?.zodError?.full_name}</span>         )}
           
        </div>
      </label>
      <label className="form-control w-full max-w-xs">
        <div className="label">
          <span className="label-text">Email</span>          
        </div>
        <input type="text" 
        name="email" 
        defaultValue={email}
        placeholder="Email" 
        className="input input-bordered w-full max-w-xs" />
        <div className="label">
        {formState?.zodError?.email && (<span className="label-text-alt">{formState?.zodError?.email}</span>         )}       
        </div>
      </label>
      <button type="submit" disabled={isPending} className="btn btn-info">{isPending ? 'Saving...' : 'Save'}</button>
    </form>
  )
}

export default page