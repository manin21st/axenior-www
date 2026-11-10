import type { Metadata } from 'next'
import { Product } from '@/components/sections/Product'

export const metadata: Metadata = {
  title: 'do-supply — 협력사 SCM | AXENIOR',
  description: '발주 확인부터 출발·납입카드·입고 확인까지, 발주사와 협력사가 같은 화면에서 일하는 협력사 SCM.',
}

export default function DoSupplyPage() {
  return (
    <main className="pt-16">
      <Product />
    </main>
  )
}
