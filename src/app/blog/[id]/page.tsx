import Header from "@/app/components/layouts/Header";
import Footer from "@/app/components/layouts/Footer";
import BlogCard from "@/app/components/elements/BlogCard";
import { getAllBlogIds, getBlogById } from "@/app/lib/utils";

export async function generateStaticParams() {
  const ids = await getAllBlogIds();

  return ids.map((id: number) => ({
  //メモ：動的ルーティングではURLパラメータを文字列として扱う必要あり
    id: id.toString(),
  }));
}

const ShowBlogDetails = async ({ params }: { params: { id: number } }) => {
  const { id } = params;


  const post = await getBlogById(Number(id));
  const postarray: any = [post];

  return (
    <>
      <Header />
      <main>
        <BlogCard isDetailPage={true} posts={postarray} />
      </main>
      <Footer />
    </>
  );
};

export default ShowBlogDetails;
