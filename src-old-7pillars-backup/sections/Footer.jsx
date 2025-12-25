import { footerBadges } from '../data/trustBadges'
import chainpassLogo from '../assets/logos/chainpass-logo-full.svg'
import vairifyLogo from '../assets/logos/vairify-logo.svg'

export default function Footer() {
  const sections = {
    Product: ["Features", "Pricing", "For Business", "API Docs"],
    Company: ["About", "Blog", "Careers", "Contact"],
    Legal: ["Terms of Service", "Privacy Policy", "Cookie Policy", "DMCA"]
  }

  return (
    <footer className="bg-card border-t border-textMuted/20 pt-20 pb-8">
      <div className="container-custom">
        {/* Final CTA */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready?</h2>
          <a
            href="#pricing"
            className="inline-block bg-primary text-background px-12 py-4 rounded-lg text-xl font-bold hover:bg-primary/90 transition-all"
          >
            RESERVE YOUR SPOT — $0
          </a>
        </div>

        {/* Expanded Trust Badges */}
        <div className="mb-16">
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 max-w-6xl mx-auto">
            {footerBadges.map((badge, idx) => (
              <div
                key={idx}
                className={"bg-background p-4 rounded-lg flex items-center justify-center h-20 " + (
                  badge.featured ? "col-span-2 ring-2 ring-primary" : ""
                )}
              >
                <img
                  src={badge.logo}
                  alt={badge.name}
                  className="max-h-12 max-w-full object-contain filter brightness-90"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img src={vairifyLogo} alt="Vairify" className="h-10 mb-4" />
            <p className="text-sm text-textMuted">
              Never have another unverified encounter.
            </p>
          </div>

          {Object.entries(sections).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-bold mb-4">{title}</h4>
              <ul className="space-y-2 text-sm text-textMuted">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="hover:text-primary transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Powered By */}
        <div className="text-center border-t border-textMuted/20 pt-8">
          <p className="text-sm text-textMuted mb-4">Powered by</p>
          <img src={chainpassLogo} alt="ChainPass" className="h-8 mx-auto mb-6" />
          
          <p className="text-xs text-textMuted">
            © 2024 Vairify. All rights reserved.
          </p>
          <p className="text-xs text-primary mt-2">
            Safety features are FREE forever.
          </p>
        </div>
      </div>
    </footer>
  )
}
