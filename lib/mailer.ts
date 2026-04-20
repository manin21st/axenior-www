import nodemailer from 'nodemailer'

interface ContactEmailParams {
  name: string
  email: string
  message: string
}

export async function sendContactEmail({ name, email, message }: ContactEmailParams) {
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
    subject: `[AXENIOR 문의] ${name}`,
    html: `
      <p><strong>이름:</strong> ${name}</p>
      <p><strong>이메일:</strong> ${email}</p>
      <p><strong>메시지:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    `,
  })
}
