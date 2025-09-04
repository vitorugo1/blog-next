import { Button } from '@/components/Button';

export const dynamic = 'force-dynamic';

export default async function AdminNewPage() {
  return (
    <div className='py-16 flex gap-4 flex-wrap'>
      <Button variant='default'>Confirma</Button>
      <Button variant='ghost'>Confirma</Button>
      <Button variant='danger'>Confirma</Button>
    </div>
  );
}
