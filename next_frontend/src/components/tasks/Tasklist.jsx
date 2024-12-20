import React from 'react'

const Tasklist = ({tasks}) => {
  console.log(tasks)
  return (
    <div className="overflow-x-auto">
  
      <h1>Task List</h1>
      {tasks.map(task => (
        <div key={task.id}>
          <p><strong>ID:</strong> {task.id}</p>
          <p><strong>Title:</strong> {task.title}</p>
          <p><strong>Description:</strong> {task.description}</p>
          <p><strong>Status:</strong> {task.status}</p>
        </div>
      ))}
    
</div>
  )
}

export default Tasklist