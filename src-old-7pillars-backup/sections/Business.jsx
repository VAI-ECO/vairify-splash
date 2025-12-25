export default function Business() {
  const features = [
    {title: "TEAM DASHBOARD", desc: "Manage all your providers in one place"},
    {title: "COMPLIANCE", desc: "Documentation and verification status at a glance"},
    {title: "COMPOSITE V.A.I.", desc: "Agency-level verification badge"},
    {title: "DIRECTORY LISTING", desc: "Feature your entire roster"},
    {title: "LIABILITY PROTECTION", desc: "Legal framework built in"},
  ]

  return (
    <section id="business" className="section-padding bg-gradient-to-b from-card to-background">
      <div className="container-custom text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          FOR AGENCIES. FOR STUDIOS. FOR HOUSES.
        </h2>
        <p className="text-xl text-textMuted mb-12">
          Your people. One dashboard. Every protection.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
          {features.map((f, idx) => (
            <div key={idx} className="bg-card p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-textMuted">{f.desc}</p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="inline-block bg-accent text-background px-8 py-3 rounded-lg font-bold hover:bg-accent/90 transition-colors"
        >
          JOIN BUSINESS WAITLIST
        </a>
      </div>
    </section>
  )
}
