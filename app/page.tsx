import { Hero } from '@/components/sections/Hero'
import { About } from '@/components/sections/About'
import { Services } from '@/components/sections/Services'
import { Product } from '@/components/sections/Product'
import { Portfolio } from '@/components/sections/Portfolio'
import { ContactSection } from '@/components/sections/ContactSection'

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Product />
      <Portfolio />
      <ContactSection />
    </main>
  )
}
