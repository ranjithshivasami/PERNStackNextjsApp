
import { getPost } from '@/actions/blog';
import TaskForm from '@/components/tasks/TaskForm';

const EditBlogPage = async ({params}) => {
  const {id} = await params
  const respose = await getPost(id);
  const post =  respose.post;
  
  const INITIAL_STSATE = {
    zodError: null,
    data: post,
    message: null
  };

  return (
    <TaskForm initalFormState={INITIAL_STSATE} />
  )
}

export default EditBlogPage