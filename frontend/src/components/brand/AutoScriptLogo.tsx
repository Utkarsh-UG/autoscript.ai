import logoAsset from '../../assets/autoscript-logo.png'

type AutoScriptLogoProps = {
  variant?: 'full' | 'mark' | 'small'
  className?: string
}

export function AutoScriptLogo({ variant = 'full', className = '' }: AutoScriptLogoProps) {
  return (
    <span className={`autoscript-logo autoscript-logo-${variant} ${className}`.trim()}>
      <img src={logoAsset} alt={variant === 'mark' ? 'AutoScript AI' : ''} />
      {variant === 'full' ? <span className="autoscript-logo-wordmark">AutoScript <strong>AI</strong></span> : null}
    </span>
  )
}
