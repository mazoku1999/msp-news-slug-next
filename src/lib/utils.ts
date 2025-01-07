import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date, format: 'short' | 'long' = 'long') {
  const d = new Date(date)

  if (format === 'short') {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric'
    }).format(d)
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(d)
}

export function generateSlug(title: string, date: string) {
  // Convertir a minúsculas y reemplazar caracteres especiales
  const formattedTitle = title
    .toLowerCase()
    // Reemplazar caracteres especiales y apóstrofes
    .replace(/[''"]/g, '')
    // Reemplazar espacios y caracteres especiales con guiones
    .replace(/[^a-z0-9]+/g, '-')
    // Eliminar guiones al inicio y final
    .replace(/^-+|-+$/g, '');

  // Extraer fecha en formato YYYYMMDD
  const dateObj = new Date(date);
  const dateStr = dateObj.toISOString().slice(0, 10).replace(/-/g, '');

  // Combinar título formateado con fecha
  return `${formattedTitle}-${dateStr}`;
}
