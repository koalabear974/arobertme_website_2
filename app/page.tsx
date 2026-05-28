import { Nav } from '@/components/layout/Nav'
import { StickyLeft } from '@/components/layout/StickyLeft'
import { Hero } from '@/components/sections/Hero'
import { Work } from '@/components/sections/Work'
import { About } from '@/components/sections/About'
import { Skills } from '@/components/sections/Skills'
import { SideProjects } from '@/components/sections/SideProjects'
import { Contact } from '@/components/sections/Contact'
import { MobileCircle } from '@/components/canvas/MobileCircle'

export default function Home() {
  return (
    <>
      <Nav />

      <Hero />

      <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-0">
        <div className="hidden lg:block">
          <StickyLeft />
        </div>

        <main className="lg:pl-12 xl:pl-16">
          <Work />
          <About />
          <Skills />
          <SideProjects />
          <Contact />
        </main>
      </div>

      <MobileCircle />
    </>
  )
}
