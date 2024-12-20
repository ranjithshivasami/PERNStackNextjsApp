import Tasklist from "@/components/tasks/Tasklist";
import Image from "next/image";

async function getAllTasks() {
  const API_URL = process.env.API_BASE_URL;
  const response = await fetch(API_URL+'task/get-tasks');
  const result = await response.json();
  console.log(result.tasks)
  return result.tasks;
}
export default async function Home() {
  const tasks = await getAllTasks();  
  return (
    <div className="">
      <Tasklist tasks={tasks} />
    </div>
  );
}
