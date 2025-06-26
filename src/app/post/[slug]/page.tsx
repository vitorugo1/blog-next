type PostSlugPage = {
  params: Promise<{ slug: string }>;
};

export default async function PostSlugPage({ params }: PostSlugPage) {
  const { slug } = await params;
  return <h1 className='text-7xl font-extrabold py-16'>Olá: {slug}</h1>;
}
