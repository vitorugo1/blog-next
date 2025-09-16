'use server';

import {
  IMAGE_SERVER_URL,
  IMAGE_UPLOAD_DIRECTORY,
  IMG_UPLOAD_MAX_SIZE,
} from '@/lib/post/constants';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

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

  const imageExtension = extname(file.name); //retorna a extensão do arquivo
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(
    process.cwd(),
    'public',
    IMAGE_UPLOAD_DIRECTORY,
  );
  await mkdir(uploadFullPath, { recursive: true }); //cria a pasta uploads caso ela não exista

  // js <- bytes -> Node -> Salvar bytes que o node consegue entender como arquivo
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${IMAGE_SERVER_URL}/${uniqueImageName}`;
  console.log(url);

  // TODO: enviei o arquivo
  return makeResult({ url: `${url}` });
}
