import { ScrollFade } from '@/components/ScrollFade'

const SERVICES = [
  {
    tag: 'Manufacturing AX',
    title: '제조 현장 AI 통합',
    description:
      'SPC, SCADA, PLC 기반 제조 공정에 AI를 통합합니다. 품질 예측, 이상 감지, 공정 최적화를 현장에서 바로 작동하는 방식으로 구현합니다.',
    keywords: ['SPC', 'SCADA', 'PLC', '이상감지', '공정최적화'],
  },
  {
    tag: 'Quality AX',
    title: '품질 관리 시스템 전환',
    description:
      'IATF 16949 기반 품질 관리 체계에 AI를 더합니다. Smart Advisor와 관리도 자동 분석으로 품질 담당자의 판단을 보조합니다.',
    keywords: ['IATF 16949', '관리도', 'Smart Advisor', 'SQC'],
  },
  {
    tag: 'Legacy AX',
    title: '레거시 시스템 현대화',
    description:
      'PowerBuilder 등 레거시 시스템을 React 기반으로 전환하고 AI 기능을 내장합니다. 데이터는 유지하면서 인터페이스와 로직을 현대화합니다.',
    keywords: ['PowerBuilder', 'React', '현대화', 'AI 내장'],
  },
]

export function Services() {
  return (
    <section id="services" className="py-32 bg-deep-space">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollFade>
          <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-4">
            SERVICES
          </p>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-ax-white mb-16">
            무엇을 <span className="gradient-text">전환</span>합니까
          </h2>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollFade key={service.tag} delay={0.1 * (i + 1)}>
              <div className="group relative rounded-xl p-px h-full">
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-ax-blue to-ax-violet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative rounded-xl bg-navy p-6 h-full flex flex-col" style={{ backgroundColor: 'rgba(15,22,40,0.9)' }}>
                  <p className="font-jetbrains text-xs text-ax-blue tracking-widest mb-3">
                    {service.tag}
                  </p>
                  <h3 className="font-sora text-lg font-semibold text-ax-white mb-3">
                    {service.title}
                  </h3>
                  <p className="font-noto text-silver text-sm leading-relaxed flex-1">
                    {service.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {service.keywords.map((kw) => (
                      <span
                        key={kw}
                        className="font-jetbrains text-xs text-silver/50 border border-white/10 rounded px-2 py-0.5"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  )
}
