import LoaderList from "@/components/UI/blog/LoaderList";

export default function Loading() {
  // Render LoaderList 5 times
  return (
    <>
      {[...Array(5)].map((_, index) => (
        <LoaderList key={index} />
      ))}
    </>
  );
}
