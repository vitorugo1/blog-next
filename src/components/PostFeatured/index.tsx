import { PostCoverImage } from '../PostCoverImage';
import { PostSummary } from '../PostSummary';

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
      <PostSummary
        title='Teste para novos testes aprovado'
        excerpt='"Muitas empresas e desenvolvedores individuais escolhem o Next.js justamente porque ele consegue unir simplicidade com recursos avançados."'
        createdAt='2025-04-06T00:24:38.616Z'
        postHeading='h1'
        postLink={postLink}
      />
    </section>
  );
}
