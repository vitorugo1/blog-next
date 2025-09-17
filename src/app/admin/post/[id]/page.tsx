import { ManagePostForm } from '@/components/admin/ManagePostForm';
import { makePublicPostFromDb } from '@/dto/post/dto';
import { findPostByIdCached } from '@/lib/post/queries/admin';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Editar post',
};

type AdminPostIdProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostId({ params }: AdminPostIdProps) {
  const { id } = await params;
  const post = await findPostByIdCached(id).catch();

  if (!post) notFound();

  const publicPost = makePublicPostFromDb(post);
  return (
    <>
      <div className='flex flex-col gap-6'>
        <h1 className='text-xl font-extrabold'>Editar post</h1>
        <ManagePostForm publicPost={publicPost} />
      </div>
    </>
  );
}
