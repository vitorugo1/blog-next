'use client';

import { clsx } from 'clsx';

type DisplayErrorMsgProps = {
  pageTitle: string;
  contentTitle: string;
  content: React.ReactNode;
};

export default function DisplayErrorMsg({
  pageTitle,
  contentTitle,
  content,
}: DisplayErrorMsgProps) {
  return (
    <>
      <title>{pageTitle}</title>
      <div
        className={clsx(
          'min-h-[320px] bg-slate-900 text-slate-100',
          'mb-16 py-8 rounded-xl',
          'flex items-center justify-center',
          'text-center',
        )}
      >
        <div>
          <h1 className='text-7xl/tight mb-4 font-extrabold'>{contentTitle}</h1>
          <div>{content}</div>
        </div>
      </div>
    </>
  );
}
