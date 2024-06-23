export function classes(...classNames: (string | undefined)[]): string {
  return classNames.filter(Boolean).join(' ')
}
