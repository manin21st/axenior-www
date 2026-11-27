import Image from 'next/image'
import Link from 'next/link'
import { ScrollFade } from '@/components/ScrollFade'
import { contactHref } from '@/lib/contactTopics'

// ⭐ 강의 영상은 재생목록으로 embed 한다(`Product.tsx` 와 같은 방식). 새 강의는 재생목록에만 추가하면 이 코드는 그대로 동작한다.
// ⚠️ 재생목록 ID 가 비어 있으면 영상 대신 썸네일과 「영상 준비 중」을 보인다.
const COURSE_PLAYLIST = 'PLU9AQn-6ZTjk'

/** 커리큘럼. `ready` 는 강의 영상이 재생목록에 있는 강의다. */
const LECTURES: { no: string; title: string; desc: string; ready?: boolean }[] = [
  { no: '01', title: '요구사항 정의에서 데이터 설계까지', desc: '요구사항 정의서 · 프로세스 정의 · 화면 설계 · 테이블 정의를 AI와 함께 작성', ready: true },
  { no: '02', title: 'AI로 서버 구축 · HTTPS 공개', desc: '내 PC 안 연습 서버에 AI 를 설치하고, AI 가 만든 페이지를 HTTPS 주소로 공개', ready: true },
  { no: '03', title: '데이터베이스 구축', desc: '연습 서버에 DB 를 설치하고 테이블 정의서대로 생성 — 키 · 관계 · 코드 체계' },
  { no: '04', title: 'API · 로그인', desc: '업무 규칙을 API 검증으로 구현하고 권한을 분리' },
  { no: '05', title: '화면 구현', desc: '화면 설계서대로 조회 · 등록 화면 구현' },
  { no: '06', title: '운영 서버 이전 · 자동 배포', desc: 'VPS · 도메인 · SSH 키 · 방화벽을 갖춘 운영 서버로 옮기고, git 과 배포 파이프라인으로 관리' },
  { no: '07', title: '앱 안 AI', desc: '자연어 질의 → DB 조회 → 화면 연결' },
  { no: '08', title: '운영 · 백업 · 보안', desc: '백업 · 복원, 권한 관리, 보안 점검으로 운영 체계 확립' },
]

const POINTS = [
  { tag: 'Method', title: 'SI 방법론은 그대로', desc: '산출물과 순서는 기존 SI 와 같습니다. AI가 초안을 작성하고 사람은 검증과 의사결정을 맡습니다.' },
  { tag: 'Domain', title: '프레스 MES 를 직접 구축', desc: '기준정보 · 작업지시 · 생산실적 · LOT 추적까지 실제로 배포되는 모듈을 만듭니다.' },
  { tag: 'Case', title: '운영 중인 시스템이 사례', desc: '실제 운영 중인 협력사 SCM do-supply 의 산출물과 코드로 설명합니다.' },
]

export function Course() {
  return (
    <section id="course" className="pt-16 pb-32 bg-deep-space">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollFade>
          <Link href="/#portfolio" className="inline-block font-noto text-sm text-silver hover:text-ax-white transition-colors mb-10">
            ← 포트폴리오
          </Link>
          <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-4">AX ENGINEERING COURSE</p>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <h1 className="font-sora text-4xl md:text-5xl font-bold text-ax-white mb-4 [word-break:keep-all]">
            요구사항 정의에서 <span className="gradient-text">운영까지</span>
          </h1>
        </ScrollFade>

        <ScrollFade delay={0.15}>
          <p className="font-noto text-silver mb-3 max-w-2xl [word-break:keep-all]">
            AI 시대에도 시스템의 품질은 설계 산출물이 결정합니다. AI가 초안을, 사람이 결정을 맡는 방식으로 제조 시스템을 직접 구축합니다.
          </p>
          <p className="font-noto text-sm text-silver/60 mb-12">대상: LLM 사용 경험은 있고 시스템 구축 경험은 없는 실무자 · 바이브 코딩 초보자</p>
        </ScrollFade>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start mb-20">
          <ScrollFade delay={0.2} className="lg:col-span-3">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-navy">
              {COURSE_PLAYLIST ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube-nocookie.com/embed/videoseries?list=${COURSE_PLAYLIST}`}
                  title="AX Engineering 과정 강의 영상"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              ) : (
                <>
                  <Image src="/portfolio/course-thumb.jpg" alt="1강 요구사항 정의에서 데이터 설계까지" fill className="object-cover opacity-60" />
                  <p className="absolute inset-x-0 bottom-4 text-center font-noto text-sm text-ax-light">영상 준비 중</p>
                </>
              )}
            </div>
          </ScrollFade>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {POINTS.map((p, i) => (
              <ScrollFade key={p.tag} delay={0.1 * (i + 2)}>
                <div className="rounded-xl border border-white/5 p-5 bg-navy/60">
                  <p className="font-jetbrains text-xs text-ax-blue tracking-widest mb-2">{p.tag}</p>
                  <h3 className="font-noto text-base font-semibold text-ax-white mb-1">{p.title}</h3>
                  <p className="font-noto text-sm text-silver [word-break:keep-all]">{p.desc}</p>
                </div>
              </ScrollFade>
            ))}
          </div>
        </div>

        <ScrollFade>
          <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-6">CURRICULUM</p>
        </ScrollFade>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 border-t border-white/5">
          {LECTURES.map((l) => (
            <div key={l.no} className="flex gap-5 py-5 border-b border-white/5">
              <p className="font-jetbrains text-sm text-ax-blue pt-0.5">{l.no}</p>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-noto text-base font-semibold text-ax-white">{l.title}</h3>
                  {l.ready ? (
                    <span className="font-noto text-[11px] px-2 py-0.5 rounded bg-ax-blue/15 text-ax-blue">영상</span>
                  ) : (
                    <span className="font-noto text-[11px] px-2 py-0.5 rounded border border-white/10 text-silver/60">준비 중</span>
                  )}
                </div>
                <p className="font-noto text-sm text-silver [word-break:keep-all]">{l.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ScrollFade>
          <div className="mt-12">
            <Link href={contactHref('course')}
              className="inline-block font-noto text-sm px-5 py-3 rounded-lg bg-gradient-to-br from-ax-blue to-ax-violet text-white hover:opacity-90 transition-opacity"
            >
              교육 과정 문의
            </Link>
          </div>
        </ScrollFade>
      </div>
    </section>
  )
}
