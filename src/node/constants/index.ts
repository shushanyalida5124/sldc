import { join } from 'path';
import { normalizePath } from 'vite';

export const ROOTPATH = normalizePath(join(__dirname, '..'));
export const FILE_SUFFIX_REG = /(\.[jt]s$)/;
