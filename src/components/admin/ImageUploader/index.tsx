'use client';

import { uploadImageAction } from '@/actions/upload/upload-image-action';
import { Button } from '@/components/Button';
import { ImageUp } from 'lucide-react';
import { useRef, useState, useTransition } from 'react';
import { toast } from 'react-toastify';

const maxSizeUpload =
  Number(process.env.NEXT_PUBLIC_IMG_UPLOAD_MAX_SIZE) || 921600;
type ImageUploaderProps = {
  disabled?: boolean;
};
export function ImageUploader({ disabled = false }: ImageUploaderProps) {
  //hook q pega a referencia
  const fileInputRef = useRef<HTMLInputElement>(null);
  //useTransition para executar a action
  const [isUploading, startTransition] = useTransition();
  const [imgUrl, setImgUrl] = useState(''); //state para mostrar o preview da imagem upload

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
    if (file.size > maxSizeUpload) {
      const readableMaxSize = maxSizeUpload / 1024;
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
        setImgUrl('');
        return;
      }

      setImgUrl(result.url);
      toast.success('Imagem enviada');
    });

    fileInput.value = '';
  }

  return (
    <div className='flex flex-col gap-2 py-4'>
      <Button
        onClick={handleChooseFile}
        type='button'
        className='self-start'
        disabled={isUploading || disabled} //caso esteja carregando o upload o botão fica desativado
      >
        <ImageUp />
        Enviar uma imagem
      </Button>

      {!!imgUrl && (
        <div className='flex flex-col gap-4'>
          <p>
            <b>URL:</b> {imgUrl}
          </p>
          {/* eslint-disable-next-line*/}
          <img className='rounded-lg' src={imgUrl} />
        </div>
      )}

      <input
        onChange={handleChange}
        //joga no current do useRef
        ref={fileInputRef}
        className='hidden'
        accept='image/*'
        name='file'
        type='file'
        disabled={isUploading || disabled}
      />
    </div>
  );
}
