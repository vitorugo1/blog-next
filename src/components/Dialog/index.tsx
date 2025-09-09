import clsx from 'clsx';
import { Button } from '../Button';

type DialogProps = {
  isVisible?: boolean;
  title: string;
  content: React.ReactNode;
  onConfirm: () => void;
  onCancel: () => void;
  disabled: boolean;
};

export function Dialog({
  isVisible = false,
  title,
  content,
  onCancel,
  onConfirm,
  disabled = false,
}: DialogProps) {
  if (!isVisible) return null; //o null não renderiza na tela
  function handleCancel() {
    if (disabled) return;
    onCancel();
  }
  return (
    <div
      className={clsx(
        'fixed z-50 inset-0 bg-black-50 top-0 left-0 bottom-0 right-0 backdrop-blur-xs',
        'flex items-center justify-center',
      )}
      onClick={handleCancel}
    >
      <div
        className={clsx(
          'bg-slate-100 rounded-lg p-6 max-w-2xl mx-6',
          'flex flex-col gap-6',
          'shadow-lg shadow-black-30',
        )}
        role='dialog'
        aria-modal={true}
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
        onClick={e => e.stopPropagation()}
      >
        <h3 id='dialog-title' className='font-extrabold text-xl text-center'>
          {title}
        </h3>
        <div id='dialog-description'>{content}</div>

        <div className='flex items-center justify-around'>
          <Button
            variant='ghost'
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </Button>
          <Button variant='default' onClick={onConfirm} disabled={disabled}>
            Ok
          </Button>
        </div>
      </div>
    </div>
  );
}
