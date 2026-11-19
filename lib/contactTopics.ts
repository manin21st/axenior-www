/**
 * 포트폴리오 상세 페이지 버튼에서 문의 양식으로 넘어올 때 제목 앞에 붙이는 머리말.
 * ⭐ 버튼은 `/?topic=<키>#contact` 로 이동한다. 양식은 키를 읽어 머리말을 고정하고, 제목 본문만 입력받는다.
 * ⚠️ 서버도 이 목록으로 검증한다 — 목록에 없는 키는 머리말 없이 일반 문의로 처리한다.
 */
export const CONTACT_TOPICS = {
  trial: '[체험 계정 요청]',
  course: '[교육 과정 문의]',
} as const

export type ContactTopic = keyof typeof CONTACT_TOPICS

export const isContactTopic = (v: unknown): v is ContactTopic =>
  typeof v === 'string' && Object.prototype.hasOwnProperty.call(CONTACT_TOPICS, v)

/** 제목 최대 길이(머리말 제외). */
export const SUBJECT_MAX = 100

/** 머리말 + 제목. 머리말이 없으면 제목만. */
export const fullSubject = (topic: ContactTopic | null, subject: string): string =>
  topic ? `${CONTACT_TOPICS[topic]} ${subject}` : subject

/** 문의 페이지 주소. 상세 페이지 버튼이 쓴다. */
export const contactHref = (topic: ContactTopic) => `/?topic=${topic}#contact`
