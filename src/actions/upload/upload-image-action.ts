'use server';

import { verifyLoginSession } from '@/lib/login/manage-login';
import { mkdir, writeFile } from 'fs/promises';
import { extname, resolve } from 'path';

const maxSizeUpload =
  Number(process.env.NEXT_PUBLIC_IMG_UPLOAD_MAX_SIZE) || 921600;

const uploadDir = process.env.IMAGE_UPLOAD_DIRECTORY || 'uploads';

const serverUrl =
  process.env.IMAGE_SERVER_URL || 'http://localhost:3000/uploads';

type uploadImageActionResult = {
  url: string;
  error: string;
};

export async function uploadImageAction(
  formData: FormData,
): Promise<uploadImageActionResult> {
  const makeResult = ({ url = '', error = '' }) => ({ url, error });

  const isAuthenticated = await verifyLoginSession();

  if (!isAuthenticated) {
    return makeResult({ error: 'Faça login novamente' });
  }

  if (!(formData instanceof FormData)) {
    return makeResult({ error: 'Dados inválidos' });
  }
  const file = formData.get('file');
  if (!(file instanceof File)) {
    return makeResult({ error: 'Arquivo inválidos' });
  }

  if (file.size > maxSizeUpload) {
    return makeResult({ error: 'Arquivo muito grande' });
  }

  if (!file.type.startsWith('image/')) {
    return makeResult({ error: 'Imagem inválida' });
  }

  const imageExtension = extname(file.name); //retorna a extensão do arquivo
  const uniqueImageName = `${Date.now()}${imageExtension}`;

  const uploadFullPath = resolve(process.cwd(), 'public', uploadDir);
  await mkdir(uploadFullPath, { recursive: true }); //cria a pasta uploads caso ela não exista

  // js <- bytes -> Node -> Salvar bytes que o node consegue entender como arquivo
  const fileArrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(fileArrayBuffer);

  const fileFullPath = resolve(uploadFullPath, uniqueImageName);

  await writeFile(fileFullPath, buffer);

  const url = `${serverUrl}/${uniqueImageName}`;
  console.log(url);

  // TODO: enviei o arquivo
  return makeResult({ url: `${url}` });
}
