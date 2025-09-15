'use server';

import { IMG_UPLOAD_MAX_SIZE } from '@/lib/post/constants';

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<uploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválidos' });
  }

  if (file.size > IMG_UPLOAD_MAX_SIZE) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }
  // TODO: enviei o arquivo
  return makeResult({ url: 'URL' });
}
