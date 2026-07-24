/**
 * Утилита склейки class names
 * clsx — условные классы; twMerge — снимает конфликты Tailwind (p-2 vs p-4)
 */
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}
