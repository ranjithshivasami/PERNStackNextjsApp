
export const getPost = async (id) =>{
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Move API_URL definition here
  const response = await fetch(`${API_URL}blog/post/${id}`);
  const result = await response.json();  
  return result || [];
}