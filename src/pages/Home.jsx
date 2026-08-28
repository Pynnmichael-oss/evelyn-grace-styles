import Hero from '../sections/Hero'

// Home has no Footer — the hero photos run flush to the very top and
// bottom of the viewport with nothing above or below them, and Nav
// (rendered inside Hero, between the two photos) is the only
// navigation this page needs. Every other route also renders Nav, now
// at the top of the page instead of between two photos — see Hero.jsx.
export default function Home() {
  return (
    <div className="bg-sand">
      <main>
        <Hero />
      </main>
    </div>
  )
}
