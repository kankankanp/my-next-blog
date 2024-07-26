import { PostType } from "@/types";
import styles from "@/scss/blog-layout.module.scss";
import Link from "next/link";

const fetchAllBlogs = async () => {
  const res = await fetch("http://localhost:3000/api/blog", {
    cache: "no-store",
  });

  const data = await res.json();

  return data.posts;
};

const BlogCard = async ({ isDetailPage = false }) => {
  const posts = await fetchAllBlogs();

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) {
      return text;
    }
    return text.substring(0, length) + "...";
  };

  return (
    <div className={!isDetailPage ? styles.blog : styles.blog__detail}>
      {posts.map((post: PostType) => {
        const date = new Date(post.date);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayOfWeek = daysOfWeek[date.getDay()];

        return (
          <div key={post.id} className={styles.blog__item}>
            <h3 className={styles.blog__date}>
              {`${year}/${month}/${day}(${dayOfWeek})`}
            </h3>
            <h3 className={styles.blog__title}>{post.title}</h3>
            <p className={styles.blog__text}>
              {isDetailPage
                ? post.description
                : truncateText(post.description, 80)}
            </p>
            {!isDetailPage && (
              <Link href={`/blog/${post.id}`} className={styles.blog__btn}>
                <span></span>show more
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default BlogCard;
