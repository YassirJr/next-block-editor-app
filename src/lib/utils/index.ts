import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export * from '@/lib/utils/css-var'
export * from '@/lib//utils/get-render-container'
export * from '@/lib/utils/is-custom-node-selected'
export * from '@/lib/utils/is-text-selected'
