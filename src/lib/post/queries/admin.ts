import { postRepository } from '@/repositories/post';
import { cache } from 'react';

export const findPostByIdCached = cache(
  async (id: string) => await postRepository.findById(id),
);

export const findAllPostsAdmin = cache(
  async () => await postRepository.findAll(),
);
