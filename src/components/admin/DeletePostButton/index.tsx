'use client';

import { deletePostAction } from '@/actions/post/delete-post-action';
import { Dialog } from '@/components/Dialog';
import clsx from 'clsx';
import { Trash2Icon } from 'lucide-react';
import { useState, useTransition } from 'react';

type DeletePostProps = {
  id: string;
  title: string;
};

export function DeletePostButton({ id, title }: DeletePostProps) {
  const [isPending, startTransition] = useTransition(); //o bolean fica True quando a ação está executando e False quando ela termina de executar. usado para que uma ação não seja realizada duas vezes enquanto o server carrega. por exemplo no deletar o post, o usuario impaciente clica novamente no botão, isso enviaria duas requisições para o server
  //O isPending vai para o botão, irá desativa-lo enquanto for verdadeiro. O startTransition vai para o handleClick
  const [showDialog, setShowDialog] = useState(false);

  function handleConfirm() {
    startTransition(async () => {
      const result = await deletePostAction(id);
      alert(`O result é : ${result}`);
      setShowDialog(false);
    });
  }

  function handleClick() {
    setShowDialog(true);
  }

  return (
    <>
      <button
        className={clsx(
          'text-red-500 cursor-pointer transition',
          '[&_svg]:w-4 [&_svg]:h-4',
          'hover:scale-120 hover:text-red-700',
          'disabled:text-slate-600 disabled:cursor-not-allowed',
        )}
        aria-label={`Apagar post: ${title}`}
        title={`Apagar post: ${title}`}
        onClick={handleClick}
        disabled={isPending}
      >
        <Trash2Icon />
      </button>
      {showDialog && (
        <Dialog
          isVisible={showDialog}
          title='Apagar post?'
          content={`Tem certeza que deseja apagar o post ${title}`}
          onCancel={() => setShowDialog(false)}
          onConfirm={() => handleConfirm()}
          disabled={isPending}
        />
      )}
    </>
  );
}
