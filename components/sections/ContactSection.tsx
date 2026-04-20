'use client'
import { useState } from 'react'
import { ScrollFade } from '@/components/ScrollFade'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [state, setState] = useState<FormState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setState('submitting')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      const data = await res.json()

      if (!res.ok) {
        setState('error')
        setErrorMessage(data.error ?? '오류가 발생했습니다.')
        return
      }

      setState('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setState('error')
      setErrorMessage('네트워크 오류가 발생했습니다.')
    }
  }

  const inputClass =
    'w-full bg-deep-space border border-white/10 rounded-lg px-4 py-3 text-ax-white font-noto text-sm placeholder:text-silver/30 focus:outline-none focus:border-ax-blue/50 transition-colors'

  return (
    <section id="contact" className="py-32 bg-deep-space">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <ScrollFade>
              <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-4">
                CONTACT
              </p>
            </ScrollFade>
            <ScrollFade delay={0.1}>
              <h2 className="font-sora text-4xl md:text-5xl font-bold text-ax-white mb-6">
                전환을 <span className="gradient-text">시작</span>합시다
              </h2>
            </ScrollFade>
            <ScrollFade delay={0.2}>
              <p className="font-noto text-silver leading-relaxed mb-8">
                제조 현장의 AI 전환, 어디서부터 시작해야 할지 모르겠다면
                먼저 이야기를 나눠보세요.
              </p>
            </ScrollFade>
            <ScrollFade delay={0.25}>
              <a
                href="mailto:contact@axenior.kr"
                className="font-jetbrains text-sm text-ax-blue hover:text-ax-violet transition-colors"
              >
                contact@axenior.kr
              </a>
            </ScrollFade>
          </div>

          <ScrollFade delay={0.15}>
            {state === 'success' ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <p className="font-sora text-2xl text-ax-white font-semibold mb-2">
                  메시지를 보냈습니다.
                </p>
                <p className="font-noto text-silver">
                  빠른 시간 안에 답변드리겠습니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="text"
                  placeholder="이름"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                />
                <input
                  type="email"
                  placeholder="이메일"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                />
                <textarea
                  placeholder="문의 내용"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                />
                {state === 'error' && (
                  <p className="font-noto text-sm text-red-400">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  className="w-full py-3 rounded-lg bg-gradient-to-br from-ax-blue to-ax-violet text-white font-sora text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {state === 'submitting' ? '전송 중...' : '문의 보내기'}
                </button>
              </form>
            )}
          </ScrollFade>
        </div>
      </div>
    </section>
  )
}
