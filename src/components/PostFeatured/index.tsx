import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';

export function PostFeatured() {
  const slug = 'qualquer';
  const postLink = `/post/${slug}`;
  return (
    <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
      <PostCoverImage
        imageProps={{
          width: 1200,
          height: 720,
          src: '/images/bryen_9.png',
          alt: 'Título do post',
          priority: true,
        }}
        linkProps={{ href: postLink }}
      />
      <div className='flex flex-col gap-4 sm:justify-center'>
        <time className='text-slate-600 text-sm' dateTime='2025-04-20'>
          20/04/2025 10:04
        </time>

        <PostHeading as='h1' url={postLink}>
          Aperiam suscipit
        </PostHeading>

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores a
          reprehenderit, magni nostrum, illum ab aliquam libero quam et enim,
          veritatis eius adipisci. Quaerat harum perferendis facilis. Veniam
          pariatur repellendus ullam iste deleniti, aperiam suscipit.
          Praesentium, dignissimos, aliquid maiores laboriosam sunt consectetur
          qui porro ad iste dolorum enim ex velit.
        </p>
      </div>
    </section>
  );
}
