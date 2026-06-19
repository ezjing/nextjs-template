export function formatDate(date: string | number | Date, locale = 'ko-KR'): string {
  return new Date(date).toLocaleDateString(locale);
}
