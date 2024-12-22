import Link from "next/link";

const Tasklist = ({ tasks }) => {
  return (
    <>
      {tasks.map(task => (
        <div key={task.id} className="bg-white shadow rounded-lg p-4 mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row sm:space-x-4">
            <div className="space-y-1">
              <h4 className="text-lg font-semibold">{task.title}</h4>
              <p className="text-sm text-gray-600">
                {task.description}
              </p>
              <div className="text-sm text-gray-600">
                <div className={`badge gap-2 ${(task.status === 'pending') ? 'badge-warning' : 'badge-success'}`}>
                  {task.status}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-64 sm:flex-row sm:w-auto sm:space-x-2 mt-2 sm:mt-0">
            <Link href={``} className="btn btn-sm text-white text-sm font-medium btn-info">Edit</Link>
            <Link href="room.html" className="btn btn-sm text-white text-sm font-medium btn-error">Delete</Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default Tasklist;