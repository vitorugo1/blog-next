import clsx from 'clsx';

type InputTypes = 'email' | 'password';

type InputTextProps = {
  labelText?: string;
} & React.ComponentProps<'input'>;

export function InputText({ labelText = '', ...props }: InputTextProps) {
  return (
    <div>
      <input aria-label={labelText} {...props} />
    </div>
  );
}
