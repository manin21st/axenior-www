import { ScrollFade } from '@/components/ScrollFade'

const PLACEHOLDER_PROJECTS = [
  { tag: 'Manufacturing AX', title: '자동차 부품사 SPC AI 자동화', year: '2025' },
  { tag: 'Quality AX', title: 'IATF 품질 관리 Smart Advisor', year: '2025' },
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
          <p className="font-noto text-silver mb-16">
            상세 케이스스터디는 문의 후 공유됩니다.
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLACEHOLDER_PROJECTS.map((project, i) => (
            <ScrollFade key={project.title} delay={0.1 * (i + 1)}>
              <div className="group rounded-xl border border-white/5 hover:border-ax-blue/30 transition-colors p-6 bg-deep-space/50">
                <div className="flex items-center justify-between mb-4">
                  <p className="font-jetbrains text-xs text-ax-blue tracking-widest">
                    {project.tag}
                  </p>
                  <p className="font-jetbrains text-xs text-silver/30">{project.year}</p>
                </div>
                <h3 className="font-sora text-base font-semibold text-ax-white leading-snug">
                  {project.title}
                </h3>
                <div className="mt-4 w-8 h-px bg-ax-blue/30 group-hover:w-full transition-all duration-500" />
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  )
}
