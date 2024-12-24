import CardPost from '@/components/CardPost';
import PaginationBtn from '@/components/PaginationBtn';
import Link from 'next/link';



// Fetch posts function
const getPosts = async (pageNo) => {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL; // Move API_URL definition here
  const response = await fetch(`${API_URL}blog/posts?page=${pageNo}`);
  const result = await response.json();  
  return result || [];
};

const BlogPage = async ({searchParams}) => {
  
  let param = await searchParams; // Replace 'paramName' with your query parameter key   
  let pageNo = param?.page || 1;
  const data = await getPosts(pageNo);
  const posts = await data.posts;
  return (
    <>
    
    <div>
      {posts.length > 0 ? (
        posts.map((post) => <CardPost key={post.id} post={post} />)
      ) : (
        <p>No posts found.</p>
      )}
    </div>
    <PaginationBtn totalPages={data?.pagination?.totalPages} currentPage={data?.pagination?.currentPage} basePath='blog' />
    
    </>
  );
};



export default BlogPage;
