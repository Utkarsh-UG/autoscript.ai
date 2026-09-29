import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
}

export function Input({ label, error, className = '', ...props }: InputProps) {
  return (
    <label className="ui-input-field">
      {label ? <span className="ui-input-label">{label}</span> : null}
      <input className={`ui-input ${className} ${error ? 'is-error' : ''}`.trim()} {...props} />
      {error ? <span className="ui-input-error">{error}</span> : null}
    </label>
  )
}
