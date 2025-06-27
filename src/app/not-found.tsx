import DisplayErrorMsg from '@/components/ErrorMessage';

export default function NotFoundPage() {
  return (
    <DisplayErrorMsg
      pageTitle='Página não encontrada'
      contentTitle='404'
      content='Erro 404 - A página que vocês esta tentando acessar não existe neste site.'
    />
  );
}
