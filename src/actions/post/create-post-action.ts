'use server';

import { PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { postRepository } from '@/repositories/post';
import { formatSlug } from '@/utils/format-slug';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidV4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
  success?: string;
};
//toda vez que a action acontecer ele irá rodar essa função, alterando o estado inicial
//nesse caso o initial state por exemplo é zero, na primeira vez q a action rodar ela retornará zero
//a partir da segunda será 1, 2, 3, 4 e assim por diante, sempre adicionando uma camada
export async function createPostAction(
  prevState: CreatePostActionState,
  formData: FormData,
): Promise<CreatePostActionState> {
  //TODO: verificar se o usuário ta logado

  if (!(formData instanceof FormData)) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }
  const formDataToObj = Object.fromEntries(formData.entries()); //['title', aqui vem o titulo]
  const zodParsedObj = PostCreateSchema.safeParse(formDataToObj);

  if (!zodParsedObj.success) {
    return {
      formState: prevState.formState,
      errors: ['Dados inválidos'],
    };
  }

  const validPostData = zodParsedObj.data;
  const newPost: PostModel = {
    ...validPostData,
    id: uuidV4(),
    slug: formatSlug(validPostData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // TODO: mover este metódo para o repositório
  try {
    await postRepository.create(newPost);
  } catch (e: unknown) {
    if (e instanceof Error) {
      return {
        formState: newPost,
        errors: [e.message],
      };
    }

    return {
      formState: newPost,
      errors: ['Erro desconhecido'],
    };
  }

  revalidateTag('posts');
  redirect(`/admin/post/${newPost.id}?created=1`);
}
