import { NextRequest, NextResponse } from 'next/server'
import { sendContactEmail } from '@/lib/mailer'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(req: NextRequest) {
  const { name, email, message } = await req.json()

  if (!name || !email || !message) {
    return NextResponse.json({ error: '모든 필드를 입력해주세요.' }, { status: 400 })
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: '유효한 이메일 주소를 입력해주세요.' }, { status: 400 })
  }

  try {
    await sendContactEmail({ name, email, message })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: '메일 발송에 실패했습니다.' }, { status: 500 })
  }
}
