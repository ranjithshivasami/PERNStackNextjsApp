
export const getPost = async (id) =>{
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Move API_URL definition here
  const response = await fetch(`${API_URL}posts/${id}`);
  const result = await response.json();  
  return result || [];
}