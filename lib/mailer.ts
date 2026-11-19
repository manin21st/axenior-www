import nodemailer from 'nodemailer'

interface ContactEmailParams {
  name: string
  email: string
  /** 머리말까지 붙은 제목 */
  subject: string
  message: string
}

/** 메일 본문 HTML 에 넣기 전에 입력값을 이스케이프한다 — 문의 양식 입력이 그대로 HTML 로 해석되지 않게 한다. */
const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export async function sendContactEmail({ name, email, subject, message }: ContactEmailParams) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT ?? 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  await transporter.sendMail({
    from: `"AXENIOR 홈페이지" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `[AXENIOR 문의] ${subject} — ${name}`,
    html: `
      <p><strong>제목:</strong> ${esc(subject)}</p>
      <p><strong>이름:</strong> ${esc(name)}</p>
      <p><strong>이메일:</strong> ${esc(email)}</p>
      <p><strong>메시지:</strong></p>
      <p style="white-space: pre-wrap;">${esc(message)}</p>
    `,
  })
}
