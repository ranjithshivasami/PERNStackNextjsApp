'use client';
import { useFormState } from "react-dom";
import { saveBlog } from "@/actions/newBlog";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const INITIAL_STSATE = {
  zozError: null,
  data: {
    title: null,
    content: null,
    file: null
  },
  message: null
};

const NewBlogPage = () => {  
  const [formState, formAction, isPending] = useFormState(saveBlog, INITIAL_STSATE);
  const { title, content, file } = formState?.data || {};
  const router = useRouter();

  useEffect(() => {
    if (formState?.success === true) {
      router.push('/blog');
    }
  }, [formState?.success])
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <form action={formAction}>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Title</span>
          </div>
          <input type="text"
            placeholder="Title"
            defaultValue={formState?.data.title}
            name="title"
            className="input input-bordered w-full" />
          {formState?.zozError?.title && (
            <div className="label">
              <span className="label-text-alt text-error">{formState?.zozError?.title}</span>
            </div>
          )}

        </label>
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text">Content</span>
          </div>
          <textarea name="content" defaultValue={formState?.data?.content}
            className='textarea textarea-bordered w-full'>

          </textarea>
          {formState?.zozError?.content && (
            <div className="label">
              <span className="label-text-alt text-error">{formState?.zozError?.content}</span>
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

          {formState?.zozError?.file && (
            <div className="label">
              <span className="label-text-alt text-error">{formState?.zozError?.file}</span>
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

export default NewBlogPage