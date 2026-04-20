import { ScrollFade } from '@/components/ScrollFade'

const PULSE_NODES = [
  { top: '20%', left: '15%', delay: '0s', size: 8 },
  { top: '60%', left: '8%', delay: '0.5s', size: 6 },
  { top: '75%', left: '70%', delay: '1s', size: 10 },
  { top: '25%', left: '80%', delay: '1.5s', size: 7 },
  { top: '50%', left: '50%', delay: '0.8s', size: 5 },
  { top: '85%', left: '35%', delay: '0.3s', size: 9 },
]

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center grid-bg overflow-hidden"
    >
      {/* 라디얼 그라디언트 오버레이 */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08)_0%,transparent_70%)]" />

      {/* 맥박 노드 */}
      {PULSE_NODES.map((node, i) => (
        <span
          key={i}
          className="pulse-node absolute rounded-full bg-ax-blue/40"
          style={{
            top: node.top,
            left: node.left,
            width: node.size,
            height: node.size,
            animationDelay: node.delay,
          }}
        />
      ))}

      {/* 콘텐츠 */}
      <div className="relative z-10 text-center px-6">
        <ScrollFade delay={0}>
          <h1 className="font-bebas text-[80px] md:text-[120px] lg:text-[160px] tracking-[0.12em] leading-none select-none">
            <span className="gradient-text">AX</span>
            <span className="text-silver">ENIOR</span>
          </h1>
        </ScrollFade>

        <ScrollFade delay={0.15}>
          <p className="font-sora text-lg md:text-xl text-silver mt-4 tracking-wide">
            AI Transformation, Senior Expertise
          </p>
        </ScrollFade>

        <ScrollFade delay={0.25}>
          <p className="font-noto text-base text-silver/70 mt-2">
            AI 전환의 시니어 파트너
          </p>
        </ScrollFade>

        <ScrollFade delay={0.35}>
          <div className="flex items-center justify-center gap-4 mt-10">
            <a
              href="#services"
              className="font-sora text-sm px-6 py-3 rounded-lg border border-ax-blue/50 text-ax-blue hover:bg-ax-blue/10 transition-colors"
            >
              서비스 보기
            </a>
            <a
              href="#contact"
              className="font-sora text-sm px-6 py-3 rounded-lg bg-gradient-to-br from-ax-blue to-ax-violet text-white hover:opacity-90 transition-opacity"
            >
              문의하기
            </a>
          </div>
        </ScrollFade>

        <ScrollFade delay={0.5}>
          <p className="font-jetbrains text-xs text-silver/30 mt-16 animate-bounce tracking-[0.3em]">
            ↓ SCROLL
          </p>
        </ScrollFade>
      </div>
    </section>
  )
}
