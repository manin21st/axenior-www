import { ScrollFade } from '@/components/ScrollFade'

// ⭐ 영상은 개별 영상 ID 가 아니라 공개 재생목록으로 embed 한다. 영상을 다시 올려 ID 가 바뀌어도 재생목록만 갱신하면 이 코드는 그대로 동작한다.
// ⛔ 2편(AI 도우미)과 AI 기능 영상은 일부 공개(메일 수신자 전용)이므로 이 페이지에 넣지 않는다. 공개 재생목록에는 공개 영상만 들어 있다.
const INTRO_PLAYLIST = 'PLIOdJugK8Ocs'
const CLIPS_PLAYLIST = 'PLLvI5VDpt2ik'
const CHANNEL_URL = 'https://www.youtube.com/@axenior-kr'
const TRIAL_MAILTO =
  'mailto:contact@axenior.kr?subject=' + encodeURIComponent('[체험 계정 요청] do-supply')

const POINTS = [
  { tag: 'Workspace', title: '일하기 편한 화면', desc: '화면 분할·새 창, 그리드 정렬·필터·엑셀, 화면 연동' },
  { tag: 'Field', title: '현장 업무', desc: '출발 처리, QR 납입카드·LOT라벨 발행, 입고 확인' },
  { tag: 'AI', title: 'AI 도우미', desc: '질문하면 그래프로 답변, 일괄처리, 아침 브리핑' },
]

export function Product() {
  return (
    <section id="product" className="py-32 bg-deep-space border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollFade>
          <p className="font-jetbrains text-xs text-ax-blue tracking-[0.3em] mb-4">
            PRODUCT · DO-SUPPLY
          </p>
        </ScrollFade>

        <ScrollFade delay={0.1}>
          <h2 className="font-sora text-4xl md:text-5xl font-bold text-ax-white mb-4">
            협력사 SCM, <span className="gradient-text whitespace-nowrap">do-supply</span>
          </h2>
        </ScrollFade>

        <ScrollFade delay={0.15}>
          <p className="font-noto text-silver mb-12 max-w-2xl">
            발주 확인부터 출발·납입카드·입고 확인까지, 발주사와 협력사가 같은 화면에서 일합니다.
          </p>
        </ScrollFade>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <ScrollFade delay={0.2} className="lg:col-span-3">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 bg-navy">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/videoseries?list=${INTRO_PLAYLIST}`}
                title="do-supply 제품 소개 영상"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </ScrollFade>

          <div className="lg:col-span-2 flex flex-col gap-4">
            {POINTS.map((p, i) => (
              <ScrollFade key={p.tag} delay={0.1 * (i + 2)}>
                <div className="rounded-xl border border-white/5 p-5 bg-navy/60">
                  <p className="font-jetbrains text-xs text-ax-blue tracking-widest mb-2">{p.tag}</p>
                  <h3 className="font-noto text-base font-semibold text-ax-white mb-1">{p.title}</h3>
                  <p className="font-noto text-sm text-silver">{p.desc}</p>
                </div>
              </ScrollFade>
            ))}

            <ScrollFade delay={0.5}>
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={TRIAL_MAILTO}
                  className="font-noto text-sm px-5 py-3 rounded-lg bg-gradient-to-br from-ax-blue to-ax-violet text-white hover:opacity-90 transition-opacity"
                >
                  체험 계정 요청
                </a>
                <a
                  href={`https://www.youtube.com/playlist?list=${CLIPS_PLAYLIST}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-noto text-sm px-5 py-3 rounded-lg border border-white/10 text-ax-light hover:border-ax-blue/50 transition-colors"
                >
                  기능별 영상 보기
                </a>
                <a
                  href={CHANNEL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-noto text-sm px-5 py-3 rounded-lg border border-white/10 text-ax-light hover:border-ax-blue/50 transition-colors"
                >
                  유튜브 채널
                </a>
              </div>
            </ScrollFade>
          </div>
        </div>
      </div>
    </section>
  )
}
