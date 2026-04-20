import { ScrollFade } from '@/components/ScrollFade'

const PILLARS = [
  {
    label: 'Precise',
    en: '핵심만 말합니다',
    ko: '군더더기 없이 작동하는 것만 제안합니다.',
  },
  {
    label: 'Grounded',
    en: '현장을 압니다',
    ko: '이론이 아닌 실제 제조 현장의 경험에서 나온 솔루션입니다.',
  },
  {
    label: 'Senior',
    en: '해본 적 있습니다',
    ko: '경험에서 나오는 판단으로 빠르고 정확하게 전환합니다.',
  },
]

export function About() {
  return (
    <section id="about" className="py-32 bg-navy">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollFade>
          <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-4">
            AX = AI TRANSFORMATION
          </p>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-ax-white mb-6">
            DX 다음,{' '}
            <span className="gradient-text">AX 시대</span>
          </h2>
        </ScrollFade>

        <ScrollFade delay={0.2}>
          <p className="font-noto text-silver text-lg max-w-2xl leading-relaxed mb-16">
            디지털 전환(DX)이 인프라를 바꿨다면, AI 전환(AX)은 일하는 방식을 바꿉니다.
            AXENIOR는 제조 현장의 실제 데이터와 프로세스를 이해하고,
            그 위에 AI를 올바르게 얹는 방법을 압니다.
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PILLARS.map((pillar, i) => (
            <ScrollFade key={pillar.label} delay={0.1 * (i + 1)}>
              <div className="border-t border-ax-blue/30 pt-6">
                <p className="font-jetbrains text-ax-blue text-sm tracking-widest mb-2">
                  {pillar.label}
                </p>
                <p className="font-sora text-ax-white font-semibold mb-2">
                  {pillar.en}
                </p>
                <p className="font-noto text-silver text-sm leading-relaxed">
                  {pillar.ko}
                </p>
              </div>
            </ScrollFade>
          ))}
        </div>
      </div>
    </section>
  )
}
