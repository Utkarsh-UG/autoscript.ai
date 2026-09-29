import { useEffect, useState } from 'react'

type AIStreamingTextProps = {
  text: string
  speed?: number
}

export function AIStreamingText({ text, speed = 18 }: AIStreamingTextProps) {
  const [visibleText, setVisibleText] = useState('')

  useEffect(() => {
    let index = 0
    setVisibleText('')
    const timer = window.setInterval(() => {
      index += 1
      setVisibleText(text.slice(0, index))
      if (index >= text.length) window.clearInterval(timer)
    }, speed)

    return () => window.clearInterval(timer)
  }, [speed, text])

  return (
    <span className={visibleText.length < text.length ? 'streaming-text is-streaming' : 'streaming-text'}>
      {visibleText}
    </span>
  )
}
