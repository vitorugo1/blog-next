import { postRepository } from '@/repositories/post';
import { PostCoverImage } from '../PostCoverImage';
import { PostHeading } from '../PostHeading';
//carrega a lista de posts
export async function PostsList() {
  const posts = await postRepository.findAll();

  return (
    <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
      {posts.map(post => {
        const postLink = `/post/${post.slug}`;
        return (
          <div className='flex flex-col gap-4 group' key={post.id}>
            <PostCoverImage
              imageProps={{
                width: 1200,
                height: 720,
                src: post.coverImageUrl,
                alt: post.title,
              }}
              linkProps={{ href: postLink }}
            />
            <div className='flex flex-col gap-4 sm:justify-center'>
              <time
                className='text-slate-600 text-sm'
                dateTime={post.createdAt}
              >
                {post.createdAt}
              </time>
              <PostHeading as='h2' url={postLink}>
                {post.title}
              </PostHeading>
              <p>{post.excerpt}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
