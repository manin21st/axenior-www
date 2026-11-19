'use client'
import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * 가로 스크롤 줄 — 카드가 한 화면 폭보다 많을 때 좌우로 넘겨 본다.
 * ⭐ 이전/다음 버튼은 항상 보인다(마우스를 올려야만 나타나는 버튼을 두지 않는다). 끝에 닿으면 그쪽 버튼만 흐려진다.
 * ⭐ 한 번 누르면 카드 한 장 폭만큼 이동한다. 첫 자식의 폭 + 간격(`gap`)으로 계산한다.
 */
export function HScroll({ children, label }: { children: React.ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [edge, setEdge] = useState({ start: true, end: true })

  const update = useCallback(() => {
    const el = ref.current
    if (!el) return
    setEdge({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 })
  }, [])

  useEffect(() => {
    update()
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [update])

  const step = (dir: 1 | -1) => {
    const el = ref.current
    const first = el?.firstElementChild as HTMLElement | null
    if (!el || !first) return
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    el.scrollBy({ left: dir * (first.offsetWidth + gap), behavior: 'smooth' })
  }

  const btn =
    'w-9 h-9 rounded-full border border-white/10 text-ax-light hover:border-ax-blue/50 disabled:opacity-25 disabled:hover:border-white/10 transition-colors'

  return (
    <div>
      <div className="flex justify-end gap-2 mb-4">
        <button type="button" className={btn} onClick={() => step(-1)} disabled={edge.start} aria-label={`${label} 이전`}>
          ‹
        </button>
        <button type="button" className={btn} onClick={() => step(1)} disabled={edge.end} aria-label={`${label} 다음`}>
          ›
        </button>
      </div>
      <div
        ref={ref}
        onScroll={update}
        className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  )
}
