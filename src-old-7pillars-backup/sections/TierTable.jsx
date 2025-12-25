export default function TierTable() {
  const tiers = [
    {
      name: "FOUNDING COUNCIL",
      spots: 500,
      price: "$0/month",
      discount: "FREE FOREVER",
      features: ["All safety", "All premium", "Founding badge", "10% rev share", "10 days early", "Founding vote"],
      highlighted: true
    },
    {
      name: "FIRST MOVERS",
      spots: 2500,
      price: "$14.99/month",
      discount: "50% OFF FOREVER",
      features: ["All safety", "All premium", "First badge", "10% rev share", "5 days early"]
    },
    {
      name: "EARLY ACCESS",
      spots: 7000,
      price: "$23.99/month",
      discount: "20% OFF FOREVER",
      features: ["All safety", "All premium", "Early badge"]
    }
  ]

  return (
    <section id="pricing" className="section-padding bg-background">
      <div className="container-custom">
        <h2 className="text-4xl md:text-6xl font-bold text-center mb-16">CHOOSE YOUR TIER</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={"bg-card p-8 rounded-lg " + (tier.highlighted ? "ring-4 ring-primary scale-105" : "")}
            >
              <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
              <p className="text-sm text-textMuted mb-4">{tier.spots} spots</p>
              <p className="text-primary font-bold text-lg mb-2">{tier.discount}</p>
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              
              <ul className="space-y-3 mb-8">
                {tier.features.map((f, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">✓</span>
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#reserve"
                className={"w-full block text-center px-6 py-3 rounded-lg font-bold transition-colors " + (
                  tier.highlighted ? "bg-primary text-background hover:bg-primary/90" : "bg-background hover:bg-background/80"
                )}
              >
                RESERVE NOW
              </a>
            </div>
          ))}
        </div>

        <div className="text-center bg-danger/20 border-2 border-danger rounded-lg p-6 max-w-2xl mx-auto">
          <p className="text-lg font-bold mb-2">⚠️ Founding Council closes in:</p>
          <p className="text-3xl font-mono font-bold">12 hours 34 minutes</p>
          <p className="text-sm text-textMuted mt-2">or when 500 spots fill — whichever comes first.</p>
        </div>
      </div>
    </section>
  )
}
