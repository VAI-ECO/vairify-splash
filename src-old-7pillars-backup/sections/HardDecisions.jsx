import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

export default function HardDecisions() {
  const [openIdx, setOpenIdx] = useState(null)

  const decisions = [
    {q: "Why require government ID?", a: "Zero-knowledge verification requires a trusted source. We never see your ID—only ComplyCube does. We get proof you're verified, not your identity."},
    {q: "Why not anonymous?", a: "Accountability requires verification. But verification doesn't require exposure. That's the whole point of zero-knowledge architecture."},
    {q: "Who can see my info?", a: "Nobody. Ever. ComplyCube sees your ID to verify you. We see only that you passed. Platforms see only your V.A.I. number. Your identity stays with ComplyCube in the UK."},
    {q: "What if subpoenaed?", a: "Three jurisdictions. Three entities. Three court orders required. ComplyCube (UK), ChainPass (US), and your platform. No single entity has your complete data."},
    {q: "Why trust you?", a: "Our architecture is open and auditable. We literally cannot access your identity data because we never receive it. Trust the math, not us."},
  ]

  return (
    <section className="section-padding bg-card">
      <div className="container-custom max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            WE MADE THE HARD CALLS
          </h2>
          <p className="text-xl text-textMuted">So you don't have to wonder.</p>
        </div>

        <div className="space-y-4">
          {decisions.map((d, idx) => (
            <div key={idx} className="bg-background rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-background/80 transition-colors"
              >
                <span className="text-left font-bold">{d.q}</span>
                {openIdx === idx ? <ChevronUp /> : <ChevronDown />}
              </button>
              {openIdx === idx && (
                <div className="px-6 pb-4 text-textMuted">{d.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
