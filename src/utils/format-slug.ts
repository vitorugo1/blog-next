import slugify from 'slugify';
import { makeRandomString } from './makeRandomString';

export function formatSlug(string: string) {
  const formatSlug = slugify(string, {
    replacement: '-',
    remove: undefined,
    lower: true,
    strict: true,
    locale: 'br',
    trim: true,
  });

  return `${formatSlug}-${makeRandomString()}`;
}
