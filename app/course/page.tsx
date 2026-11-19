import type { Metadata } from 'next'
import { Course } from '@/components/sections/Course'

export const metadata: Metadata = {
  title: 'AX Engineering 과정 — 요구사항 정의에서 운영까지 | AXENIOR',
  description: 'AI가 초안을 작성하고 사람이 결정하는 방식으로, 요구사항 정의부터 배포·운영까지 제조 시스템을 직접 구축하는 실무 과정.',
}

export default function CoursePage() {
  return (
    <main className="pt-16">
      <Course />
    </main>
  )
}
