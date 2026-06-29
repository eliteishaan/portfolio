/**
 * Accessibility helpers
 */
export const a11y = {
  srOnly:
    'absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0 [clip:rect(0,0,0,0)]',
  focusVisible:
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
  disabled: 'disabled:opacity-50 disabled:pointer-events-none',
}

export function getAriaDisabled(disabled?: boolean, loading?: boolean) {
  if (disabled || loading) return true
  return undefined
}
