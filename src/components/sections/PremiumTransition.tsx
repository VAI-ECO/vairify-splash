export default function PremiumTransition() {
  return (
    <section className="
      py-24 px-6
      vai-section-secondary
      border-y border-[var(--vai-border)]
    ">
      <div className="max-w-3xl mx-auto text-center">
        {/* Main headline */}
        <h2 className="
          text-3xl md:text-4xl font-black
          text-[var(--vai-text-primary)]
          mb-6
        ">
          Vairify is the standard of safety and convenience.
        </h2>

        {/* Value proposition block */}
        <div className="space-y-3 text-lg text-[var(--vai-text-secondary)]">
          <p>Safety is the foundation, and it's free.</p>
          <p>Not freemium. Not watered down. Free.</p>
          <p>Because Vairify will never put a price on safety.</p>
          <p className="mt-6">
            Premium? That's our flex.
            <span className="text-[#00d4aa] font-bold"> $29.99/month.</span>
          </p>
          <p>You'll get it because it brings real value and convenience.</p>
          <p>Not because you have to have it to be protected.</p>
        </div>

        {/* Transition/hype block */}
        <p className="
          mt-12
          text-[var(--vai-text-muted)] italic
        ">
          So if you're thinking "How can they top what I just saw?"
        </p>

        <p className="
          mt-4
          text-xl font-bold
          text-[var(--vai-text-primary)]
        ">
          Sit back. Hold our beer.
        </p>

        {/* Big reveal headline */}
        <h3 className="
          mt-6
          text-4xl md:text-5xl font-black
          text-[#00d4aa]
          drop-shadow-lg
        ">
          You ain't seen nothing yet.
        </h3>
      </div>
    </section>
  );
}
