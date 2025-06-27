import { SinglePost } from '@/components/SinglePost';
import { findPostBySlugCached } from '@/lib/post/queries';
import { Metadata } from 'next';

type PostSlugPage = {
  params: { slug: string };
};

export async function GenerateMetadata({
  params,
}: PostSlugPage): Promise<Metadata> {
  const { slug } = await params;

  const post = await findPostBySlugCached(slug);
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function PostSlugPage({ params }: PostSlugPage) {
  const { slug } = params;

  return <SinglePost slug={slug} />;
}
