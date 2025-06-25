import Image from 'next/image';
import Link from 'next/link';

type PostCoverImgProps = {
  imageProps: React.ComponentProps<typeof Image>;
  linkProps: React.ComponentProps<typeof Link>;
};
export function PostCoverImage({ imageProps, linkProps }: PostCoverImgProps) {
  return (
    <Link {...linkProps} className='w-full h-full overflow-hidden rounded-xl'>
      <Image
        {...imageProps}
        className='w-full h-full object-cover object-center group-hover:scale-105 transition'
        alt={imageProps.alt}
      />
    </Link>
  );
}
