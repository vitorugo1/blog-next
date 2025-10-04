import { PostModel } from '@/models/post/post-model';
//para retirar dados sensiveis ou desnecessarios do tipo principal, criando um subtipo basedo nele
export type PublicPost = Omit<PostModel, 'updatedAt'>;

//caso passe um postr ele vai puxar os valores do post, caso não ai será um post
// no mesmo formato mas com todas as chaves vazias
export const makePartialPublicPost = (
  post?: Partial<PostModel>,
): PublicPost => {
  return {
    id: post?.id || '',
    slug: post?.slug || '',
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    author: post?.author || '',
    content: post?.content || '',
    coverImageUrl: post?.coverImageUrl || '',
    createdAt: post?.createdAt || '',
    published: post?.published || false,
  };
};

export const makePublicPostFromDb = (post: PostModel): PublicPost => {
  return makePartialPublicPost(post);
};
