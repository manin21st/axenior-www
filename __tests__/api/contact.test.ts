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

  it('sends email and returns 200 on valid input', async () => {
    mockSend.mockResolvedValueOnce(undefined)
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', message: 'Hello' }))
    expect(res.status).toBe(200)
    expect(mockSend).toHaveBeenCalledWith({ name: 'Test', email: 'a@b.com', message: 'Hello' })
  })

  it('returns 500 when mailer throws', async () => {
    mockSend.mockRejectedValueOnce(new Error('SMTP error'))
    const res = await POST(makeRequest({ name: 'Test', email: 'a@b.com', message: 'Hello' }))
    expect(res.status).toBe(500)
  })
})
