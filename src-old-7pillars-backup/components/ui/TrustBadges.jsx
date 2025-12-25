export function TrustBadges() {
  const badges = [
    'Amazon AWS',
    'Microsoft Azure',
    'Supabase',
    'ComplyCube',
    'Stripe',
  ];

  return (
    <div className="py-12">
      <h3 className="text-center text-textMuted text-sm mb-6 uppercase tracking-wider">
        INFRASTRUCTURE POWERED BY
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-8">
        {badges.map((badge, index) => (
          <div
            key={index}
            className="text-textMuted hover:text-primary transition-colors text-lg font-medium"
          >
            {badge}
          </div>
        ))}
      </div>
      <p className="text-center text-textMuted text-sm mt-6">
        Your data protected by the same infrastructure as Fortune 500s
      </p>
    </div>
  );
}
