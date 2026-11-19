import Image from 'next/image'
import Link from 'next/link'
import { ScrollFade } from '@/components/ScrollFade'
import { HScroll } from '@/components/HScroll'

interface Project {
  tag: string
  title: string
  year: string
  /** 상세 페이지 경로. 썸네일을 클릭하면 이 페이지로 이동한다. */
  href?: string
  thumb?: string
}

// ⭐ 한 화면에 세 장을 보이고, 네 번째부터는 가로 스크롤로 본다. Legacy AX 카드는 내용이 준비되면 썸네일·상세 페이지를 채운다.
const PROJECTS: Project[] = [
  {
    tag: 'Do Framework AX',
    title: '현장을 아는 협력사 SCM — 일하기 편한 화면과 AI 도우미',
    year: '2026',
    href: '/do-supply',
    thumb: '/portfolio/do-supply-thumb.jpg',
  },
  {
    tag: 'AX Engineering Course',
    title: '요구사항 정의에서 운영까지 — AI와 함께 구축하는 제조 시스템 실무 과정',
    year: '2026',
    href: '/course',
    thumb: '/portfolio/course-thumb.jpg',
  },
  { tag: 'Manufacturing & Quality AX', title: '자동차 부품사 SPC AI 자동화 · IATF 품질 관리 Smart Advisor', year: '2025' },
  { tag: 'Legacy AX', title: 'PowerBuilder → React 전환 프로젝트', year: '2024' },
]

export function Portfolio() {
  return (
    <section id="portfolio" className="py-32 bg-navy">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollFade>
          <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-4">
            PORTFOLIO
          </p>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-ax-white mb-4">
            실제로 <span className="gradient-text">작동</span>했습니다
          </h2>
        </ScrollFade>

        <ScrollFade delay={0.15}>
          <p className="font-noto text-silver mb-12">
            상세 케이스스터디는 문의 후 공유됩니다.
          </p>
        </ScrollFade>

        <HScroll label="포트폴리오">
          {PROJECTS.map((project, i) => (
            <ScrollFade
              key={project.title}
              delay={0.1 * Math.min(i + 1, 3)}
              className="snap-start shrink-0 w-[85%] md:w-[calc((100%-3rem)/3)]"
            >
              <div className="group h-full flex flex-col rounded-xl border border-white/5 hover:border-ax-blue/30 transition-colors p-6 bg-deep-space/50">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-jetbrains text-xs text-ax-blue tracking-widest">
                    {project.tag}
                  </p>
                  <p className="font-jetbrains text-xs text-silver/30">{project.year}</p>
                </div>
                {project.thumb && project.href && (
                  <Link href={project.href} className="block mb-4 rounded-lg overflow-hidden border border-white/10">
                    <Image
                      src={project.thumb}
                      alt={`${project.title} 소개 영상 — 상세 페이지로 이동`}
                      width={640}
                      height={360}
                      className="w-full h-auto group-hover:opacity-90 transition-opacity"
                    />
                  </Link>
                )}
                <h3 className="font-sora text-base font-semibold text-ax-white leading-snug [word-break:keep-all]">
                  {project.title}
                </h3>
                <div className="mt-4 w-8 h-px bg-ax-blue/30 group-hover:w-full transition-all duration-500" />
              </div>
            </ScrollFade>
          ))}
        </HScroll>
      </div>
    </section>
  )
}
