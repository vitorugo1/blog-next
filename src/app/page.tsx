import { Container } from '@/components/Container';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <header>
        <h1 className='text-6xl font-bold text-center py-8'>HEADER</h1>
      </header>

      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </Container>
  );
}
