'use server';

import { PublicPost } from '@/dto/post/dto';
import { PostCreateSchema } from '@/lib/post/validations';
import { PostModel } from '@/models/post/post-model';
import { formatSlug } from '@/utils/format-slug';
import { v4 as uuidV4 } from 'uuid';

type CreatePostActionState = {
  formState: PublicPost;
  errors: string[];
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

  return {
    formState: newPost,
    errors: [],
  };
}
