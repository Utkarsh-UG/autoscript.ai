import type { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  loading?: boolean
  children: ReactNode
}

export function Button({
  variant = 'primary',
  loading = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <button
      className={`ui-button ui-button-${variant} ${className}`.trim()}
      disabled={isDisabled}
      {...props}
    >
      {loading ? <span className="ui-button-spinner" aria-hidden="true" /> : null}
      <span>{children}</span>
    </button>
  )
}
