'use server';

import { drizzleDb } from '@/db/drizzle';
import { postsTable } from '@/db/drizzle/schemas';
import { postRepository } from '@/repositories/post';
import { eq } from 'drizzle-orm/sql';
import { revalidateTag } from 'next/cache';

export async function deletePostAction(id: string) {
  //TODO: checar login do user

  //TODO: remover abaixo
  console.log(id);

  if (!id || typeof id !== 'string') {
    return {
      error: 'Dados inválidos',
    };
  }

  const post = await postRepository.findById(id).catch(() => undefined);

  if (!post) {
    return {
      error: 'Post não existe',
    };
  }

  //TODO: Mover este metódo para repository
  await drizzleDb.delete(postsTable).where(eq(postsTable.id, id));

  //TODO: revalidateTag ou revalidatePath
  revalidateTag('posts');
  revalidateTag(`post-${post.slug}`);
  return {
    error: '',
  };
}
