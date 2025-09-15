'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { IMG_UPLOAD_MAX_SIZE } from '@/lib/post/constants';
import { ImageUp } from 'lucide-react';
import { useRef, useTransition } from 'react';
import { toast } from 'react-toastify';

export function ImageUploader() {
  //hook q pega a referencia
  const fileInputRef = useRef<HTMLInputElement>(null);
  //useTransition para executar a action
  const [isUploading, startTransition] = useTransition();

  function handleChooseFile() {
    //se não houver nada no current do useRef ele retorna nulo
    if (!fileInputRef.current) return;

    fileInputRef.current.click();
  }

  //responsável por conferir o tamanho do arquivo, checa quando a o input muda
  function handleChange() {
    if (!fileInputRef.current) return;

    const fileInput = fileInputRef.current;
    const file = fileInput?.files?.[0]; //para o caso de serem varios uploads de arquivo

    if (!file) return; //caso não tenha nada no file ele retorna
    if (file.size > IMG_UPLOAD_MAX_SIZE) {
      const readableMaxSize = IMG_UPLOAD_MAX_SIZE / 1024;
      toast.error(`imagem muito grande. Máx.: ${readableMaxSize}KB`);
      fileInput.value = '';
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    startTransition(async () => {
      const result = await uploadImageAction(formData);
      if (result.error) {
        toast.error(result.error);
        fileInput.value = '';
        return;
      }

      toast.success(result.url);
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button onClick={handleChooseFile} type='button' className='self-start'>
        <ImageUp />
        Enviar uma imagem
      </Button>
      <input
        onChange={handleChange}
        //joga no current do useRef
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        name='file'
        type='file'
      />
    </div>
  );
}
