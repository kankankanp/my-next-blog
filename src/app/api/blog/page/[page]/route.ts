import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

// ページごとのブログ記事取得API
export const GET = async (
  req: Request,
  { params }: { params: { page: number } }
) => {
  try {
    const PER_PAGE = 4;
    const page = params.page;
    const skip = (page - 1) * PER_PAGE;

    // ページごとのブログデータを取得
    const posts = await prisma.post.findMany({
      skip,
      take: PER_PAGE,
    });
    // 全体のブログ数を取得して、ページネーションに使えるように返す
    const totalCount = await prisma.post.count();

    return NextResponse.json(
      { message: "Success", posts, totalCount },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: "Error", error }, { status: 500 });
  }
};
