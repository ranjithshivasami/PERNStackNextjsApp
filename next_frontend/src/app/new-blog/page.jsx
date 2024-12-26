import TaskForm from '@/components/tasks/TaskForm';
import React from 'react'

const INITIAL_STSATE = {
  zodError: null,
  data: {
    title: null,
    content: null,
    file: null
  },
  message: null
};

const NewBlogPage = async () => {
  return (  
    <TaskForm initalFormState={INITIAL_STSATE} />    
  )
}

export default NewBlogPage