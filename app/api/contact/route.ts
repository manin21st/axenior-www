import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/mailer'
import { SUBJECT_MAX, fullSubject, isContactTopic } from '@/lib/contactTopics'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const { name, email, subject, message, topic } = await req.json()

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: '유효한 이메일 주소를 입력해주세요.' }, { status: 400 })
  }

  // 메일 제목 헤더에 들어가므로 줄바꿈은 공백으로 바꾼다.
  const title = typeof subject === 'string' ? subject.replace(/[\r\n]+/g, ' ').trim() : ''
  if (!title || title.length > SUBJECT_MAX) {
    return NextResponse.json({ error: `제목을 ${SUBJECT_MAX}자 이내로 입력해주세요.` }, { status: 400 })
  }

  // ⭐ 머리말은 클라이언트가 보낸 문자열이 아니라 topic 키로 서버가 붙인다 — 목록에 없는 키는 일반 문의로 처리한다.
  const fullTitle = fullSubject(isContactTopic(topic) ? topic : null, title)

  try {
    await sendContactEmail({ name, email, subject: fullTitle, message })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '메일 발송에 실패했습니다.' }, { status: 500 })
  }
}
