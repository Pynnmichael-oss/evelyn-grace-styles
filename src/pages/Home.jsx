import Hero from '../sections/Hero'

// Home has no persistent Header/off-canvas nav and no Footer — the hero
// photos run flush to the very top and bottom of the viewport with
// nothing above or below them, and InlineNavStrip (rendered inside
// Hero, between the two photos) is the only navigation this page
// needs. Every other route still renders both Header and Footer
// normally; these suppressions are Home-specific, not global — see
// Hero.jsx for Header.
export default function Home() {
  return (
    <div className="bg-sand">
      <main>
        <Hero />
      </main>
    </div>
  )
}
