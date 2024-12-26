'use client';
import { useActionState } from "react";

import { saveBlog } from "@/actions/newBlog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const TaskForm = ({initalFormState}) => {  
  const [formState, formAction, isPending] = useActionState(saveBlog, initalFormState);
  const { title, content, file } = formState?.data || {};
  const router = useRouter();

  useEffect(() => {
    if (formState?.success === true) {
      router.push('/blog');
    }
    
  }, [formState?.success]);
    console.log('formState', formState);
  return (
    
    <div className="max-w-2xl mx-auto mt-10">
      <form action={formAction}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input type="text"
            placeholder="Title"
            defaultValue={title}
            name="title"
            className="input input-bordered w-full" />
          {formState?.zodError?.title && (
            <div className="label">
              <span className="label-text-alt text-error">{formState?.zodError?.title[0]}</span>
            </div>
          )}

        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Content</span>
          </div>
          <textarea name="content" defaultValue={content}
            className='textarea textarea-bordered w-full'>

          </textarea>
          {formState?.zodError?.content && (
            <div className="label">
              <span className="label-text-alt text-error">{formState?.zodError?.content[0]}</span>
            </div>
          )}

        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Image</span>
          </div>
          <input type="file"
            name="file"
            placeholder="Title"
            className="file-input w-full" />

          {formState?.zodError?.file && (
            <div className="label">
              <span className="label-text-alt text-error">{formState?.zodError?.file[0]}</span>
            </div>
          )}

        </label>
        <div className="mt-6">
          <button type="submit"
            disabled={isPending}
            className="btn btn-info w-full">
            {isPending ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm