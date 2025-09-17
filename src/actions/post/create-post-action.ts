'use server';

import { PublicPost } from '@/dto/post/dto';

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
  return {
    formState: prevState.formState,
    errors: [],
  };
}
