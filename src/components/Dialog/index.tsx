import clsx from 'clsx';

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
          <button
            className={clsx(
              'bg-slate-300 text-slate-950 hover:bg-slate-400 transition',
              'flex items-center justify-center',
              'py-2 px-4 rounded-lg cursor-pointer',
              'disabled:bg-slate-200 disabled:text-slate-400 cursor-not-allowed',
            )}
            autoFocus
            onClick={handleCancel}
            disabled={disabled}
          >
            Cancelar
          </button>
          <button
            className={clsx(
              'bg-blue-500 text-blue-50 hover:bg-blue-600 transition',
              'flex items-center justify-center',
              'py-2 px-4 rounded-lg cursor-pointer',
              'disabled:bg-slate-200 disabled:text-slate-400 cursor-not-allowed',
            )}
            onClick={onConfirm}
            disabled={disabled}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
