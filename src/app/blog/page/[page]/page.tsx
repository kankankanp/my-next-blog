import Pagination from "@/app/components/elements/pagination/page";
import { fetchAllBlogs } from "../../page";
import Header from "@/app/components/layouts/header/page";
import AddBlogModal from "@/app/components/elements/add-blog-modal/page";
import BlogCard from "@/app/components/elements/blog-card/page";
import Footer from "@/app/components/layouts/footer/page";
import { PrismaClient } from "@prisma/client";

export const countAllBlogs = async () => {
  const prisma = new PrismaClient();
  const countData = await prisma.post.count();
  return countData;
};

export const generateStaticParams = async () => {
  const count = await countAllBlogs();
  // console.log(count);
  const range = (start: number, end: number) =>
    [...Array(end - start + 1)].map((_, i) => start + i);

  const paths = range(2, Math.ceil(count / 2)).map((num) => ({
    page: `${num}`,
  }));
  // console.log(paths);
  return paths;
};

export default async function Index({ params }: { params: { page: number } }) {
  const count = await countAllBlogs();
  const posts = await fetchAllBlogs();
  // console.log(posts);
  const PER_PAGE = 4;
  const pageIndex = params.page;
  const postPerPage = posts.slice(
    PER_PAGE * pageIndex - PER_PAGE,
    PER_PAGE * pageIndex
  );
  console.log(postPerPage);

  return (
    <>
      <Header />
      <main>
        <AddBlogModal />
        <BlogCard isDetailPage={false} posts={postPerPage} />
      </main>
      <Pagination totalCount={count} />
      <Footer />
    </>
  );
}