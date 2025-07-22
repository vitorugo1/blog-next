export const dynamic = 'force-dynamic';

type AdminPostIdProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function AdminPostId({ params }: AdminPostIdProps) {
  const { id } = await params;
  return <div className='py-16 text-6xl'>AdminPostId {id}</div>;
}
