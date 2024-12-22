import Heading from "@/components/Heading";
import Tasklist from "@/components/tasks/Tasklist";
import Image from "next/image";



export default async function Home() {
  
  return (
    <>
     <h2 className="text-2xl/7 font-bold text-gray-900 my-2 sm:truncate sm:text-3xl sm:tracking-tight">Blog POC Website</h2>
      
      <p className="py-2">This blog is powered by Next.js on the frontend, Node.js on the backend, PostgreSQL as our reliable database, and Cloudinary for storing and delivering images through CDN.</p>
      <h2 className="text-2xl/7 font-bold text-gray-900 my-2 sm:truncate sm:text-3xl sm:tracking-tight">Key Technologies Behind the Blog</h2>
      <ul className="pl-4 list-inside">
        <li className="py-2"><span className="font-semibold">Built with Next.js: </span> We leverage the latest in React and server-side rendering for blazing-fast page loads.</li>
        <li className="py-2"><span className="font-semibold">Robust Backend with Node.js: </span> Our backend uses Node.js, offering flexibility and high performance for API endpoints.</li>
        <li className="py-2"><span className="font-semibold">Reliable Data Storage with PostgreSQL: </span> We store all our blog data in PostgreSQL, providing robust and reliable database solutions.</li>
        <li className="py-2"><span className="font-semibold">Seamless Image Management: </span> Cloudinary ensures that all images are optimized and served quickly, wherever you are.</li>
      </ul>
    </>
  );
}
