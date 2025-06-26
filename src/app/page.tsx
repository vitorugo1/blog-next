import { PostFeatured } from '@/components/PostFeatured';

import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';

import { Suspense } from 'react';

export default async function Home() {
  return (
    <>
      <PostFeatured />

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </>
  );
}
