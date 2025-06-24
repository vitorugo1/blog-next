import { Container } from '@/components/Container';
import { Header } from '@/components/Header';
import { PostsList } from '@/components/PostsList';
import { SpinLoader } from '@/components/SpinLoader';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home() {
  return (
    <Container>
      <Header />

      <section className='grid grid-cols-1 gap-8 mb-16 sm:grid-cols-2 group'>
        <Link className='w-full h-full overflow-hidden rounded-xl' href='#'>
          <Image
            className='w-full h-full object-cover object-center group-hover:scale-105 transition'
            src='/images/bryen_0.png'
            width={1200}
            height={720}
            alt='Título do post'
            priority //faz sumir o aviso de imagem grande warning
          />
        </Link>
        <div className='flex flex-col gap-4 sm:justify-center'>
          <time className='text-slate-600 text-sm' dateTime='2025-04-20'>
            20/04/2025 10:04
          </time>

          <h1 className='text-2xl/tight font-extrabold sm:text-4xl'>
            <Link href=''>Lorem ipsum dolor sit amet.</Link>
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores a
            reprehenderit, magni nostrum, illum ab aliquam libero quam et enim,
            veritatis eius adipisci. Quaerat harum perferendis facilis. Veniam
            pariatur repellendus ullam iste deleniti, aperiam suscipit.
            Praesentium, dignissimos, aliquid maiores laboriosam sunt
            consectetur qui porro ad iste dolorum enim ex velit.
          </p>
        </div>
      </section>
      <Suspense fallback={<SpinLoader />}>
        <PostsList />
      </Suspense>
    </Container>
  );
}
