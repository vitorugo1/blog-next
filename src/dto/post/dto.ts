import { PostModel } from '@/models/post/post-model';
//para retirar dados sensiveis ou desnecessarios do tipo principal, criando um subtipo basedo nele
export type PublicPost = Omit<PostModel, 'updatedAt'>;

export const makePublicPost = (post: PostModel): PublicPost => {
  return {
    id: post.id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    author: post.author,
    content: post.content,
    coverImageUrl: post.coverImageUrl,
    createdAt: post.createdAt,
    published: post.published,
  };
};
