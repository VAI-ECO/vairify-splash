export default function Pain() {
  return (
    <section className="section-padding bg-gradient-to-b from-card to-white">
      <div className="container-custom max-w-4xl text-center space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold mb-12 text-textPrimary fade-in">
          You know the feeling.
        </h2>

        <div className="space-y-6 text-xl md:text-2xl text-textMuted">
          <p className="fade-in italic">
            "The reference that checked out — until he didn't."
          </p>
          <p className="fade-in italic">
            "The deposit that vanished with her."
          </p>
          <p className="fade-in italic">
            "The cash in your bag that made you a target."
          </p>
          <p className="fade-in italic">
            "The review that destroyed you — from someone you never met."
          </p>
        </div>

        <div className="pt-12 space-y-4">
          <p className="text-2xl md:text-3xl text-textPrimary fade-in">
            You've been screening with hope.
          </p>
          <p className="text-3xl md:text-4xl font-bold text-danger fade-in">
            Hope isn't protection.
          </p>
        </div>
      </div>
    </section>
  )
}
