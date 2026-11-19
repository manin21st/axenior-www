import { POST } from '@/app/api/contact/route'
import { NextRequest } from 'next/server'
import * as mailer from '@/lib/mailer'

jest.mock('@/lib/mailer')
const mockSend = mailer.sendContactEmail as jest.MockedFunction<typeof mailer.sendContactEmail>

function makeRequest(body: unknown) {
  return new NextRequest('http://localhost/api/contact', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' },
  })
}

describe('POST /api/contact', () => {
  beforeEach(() => jest.clearAllMocks())

  it('returns 400 when name is missing', async () => {
    const res = await POST(makeRequest({ email: 'a@b.com', message: 'hi' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when email is missing', async () => {
    const res = await POST(makeRequest({ name: 'Test', message: 'hi' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when message is missing', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when email format is invalid', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'not-email', message: 'hi' }))
    expect(res.status).toBe(400)
  })

  it('returns 400 when subject is missing or blank', async () => {
    expect((await POST(makeRequest({ name: 'Test', email: 'a@b.com', message: 'hi' }))).status).toBe(400)
    expect((await POST(makeRequest({ name: 'Test', email: 'a@b.com', subject: '  ', message: 'hi' }))).status).toBe(400)
  })

  it('returns 400 when subject is too long', async () => {
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', subject: 'x'.repeat(101), message: 'hi' }))
    expect(res.status).toBe(400)
  })

  it('sends email and returns 200 on valid input', async () => {
    mockSend.mockResolvedValueOnce(undefined)
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', subject: '도입 상담', message: 'Hello' }))
    expect(res.status).toBe(200)
    expect(mockSend).toHaveBeenCalledWith({ name: 'Test', email: 'a@b.com', subject: '도입 상담', message: 'Hello' })
  })

  it('prefixes the subject by topic key, and ignores unknown keys', async () => {
    mockSend.mockResolvedValue(undefined)
    await POST(makeRequest({ name: 'T', email: 'a@b.com', subject: '체험 부탁드립니다', message: 'm', topic: 'trial' }))
    expect(mockSend).toHaveBeenLastCalledWith(expect.objectContaining({ subject: '[체험 계정 요청] 체험 부탁드립니다' }))
    await POST(makeRequest({ name: 'T', email: 'a@b.com', subject: '일정', message: 'm', topic: 'course' }))
    expect(mockSend).toHaveBeenLastCalledWith(expect.objectContaining({ subject: '[교육 과정 문의] 일정' }))
    await POST(makeRequest({ name: 'T', email: 'a@b.com', subject: '일반', message: 'm', topic: '[관리자]' }))
    expect(mockSend).toHaveBeenLastCalledWith(expect.objectContaining({ subject: '일반' }))
  })

  it('replaces line breaks in the subject', async () => {
    mockSend.mockResolvedValueOnce(undefined)
    await POST(makeRequest({ name: 'T', email: 'a@b.com', subject: 'a\r\nBcc: x@y.z', message: 'm' }))
    expect(mockSend).toHaveBeenLastCalledWith(expect.objectContaining({ subject: 'a Bcc: x@y.z' }))
  })

  it('returns 500 when mailer throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('SMTP error'))
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', subject: 's', message: 'Hello' }))
    expect(res.status).toBe(500)
  })
})
