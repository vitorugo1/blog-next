import clsx from 'clsx';
import { useId } from 'react';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  const id = useId();
  return (
    <div className='flex flex-col gap-2'>
      {labelText && <label htmlFor={id}>{labelText}</label>}
      <input
        {...props}
        className={clsx(
          'bg-white outline-0',
          'ring-1 ring-slate-400 rounded',
          'py-2 px-2 transition focus:ring-blue-600',
          'placeholder-slate-300',
          'disabled:bg-slate-300',
          props.className,
        )}
        id={id}
      />
    </div>
  );
}
