'use client'
import { useEffect, useState } from 'react'
import { ScrollFade } from '@/components/ScrollFade'
import { CONTACT_TOPICS, SUBJECT_MAX, isContactTopic, type ContactTopic } from '@/lib/contactTopics'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  /** 상세 페이지 버튼으로 들어오면 `?topic=` 으로 정해진다. 제목 앞 머리말로 고정된다. */
  const [topic, setTopic] = useState<ContactTopic | null>(null)

  // ⭐ 주소의 `?topic=` 을 읽는다. 상세 페이지에서 넘어올 때마다 컴포넌트가 새로 마운트되므로 마운트 시 한 번 읽는다.
  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get('topic')
    if (isContactTopic(t)) setTopic(t)
  }, [])
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
        body: JSON.stringify({ name, email, subject, message, topic }),
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
      setSubject('')
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
                <div className="flex items-stretch gap-2">
                  {topic && (
                    <span className="shrink-0 flex items-center gap-2 rounded-lg border border-ax-blue/40 bg-ax-blue/10 px-3 font-noto text-sm text-ax-light">
                      {CONTACT_TOPICS[topic]}
                      <button
                        type="button"
                        onClick={() => setTopic(null)}
                        aria-label="머리말 빼고 일반 문의로 보내기"
                        title="일반 문의로 보내기"
                        className="text-silver hover:text-ax-white"
                      >
                        ✕
                      </button>
                    </span>
                  )}
                  <input
                    type="text"
                    placeholder="제목"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    maxLength={SUBJECT_MAX}
                    className={`${inputClass} min-w-0`}
                  />
                </div>
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
