import { Link } from 'react-router-dom';
import vairifyLogo from '../../assets/vairify-logo.svg';
import chainpassIcon from '../../assets/chainpass-icon.svg';

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-16">
      <div className="max-w-6xl mx-auto px-6">
        {/* Vairify Logo */}
        <div className="mb-12 text-center">
          <img src={vairifyLogo} alt="Vairify" className="h-12 mx-auto mb-2" />
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* VAIRIFY */}
          <div>
            <h3 className="text-text font-bold mb-4">VAIRIFY</h3>
            <ul className="space-y-2">
              <li>
                <p className="text-textMuted text-sm">Your protection.</p>
              </li>
              <li>
                <p className="text-textMuted text-sm">Their accountability.</p>
              </li>
            </ul>
          </div>

          {/* SAFETY */}
          <div>
            <h3 className="text-text font-bold mb-4">SAFETY</h3>
            <ul className="space-y-2">
              <li>
                <a href="#pillars" className="text-textMuted hover:text-primary transition-colors text-sm">
                  7 Pillars
                </a>
              </li>
              <li>
                <a href="#dateguard" className="text-textMuted hover:text-primary transition-colors text-sm">
                  DateGuard
                </a>
              </li>
              <li>
                <a href="#truerevu" className="text-textMuted hover:text-primary transition-colors text-sm">
                  TrueRevu
                </a>
              </li>
              <li>
                <a href="#vai-check" className="text-textMuted hover:text-primary transition-colors text-sm">
                  VAI-CHECK
                </a>
              </li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h3 className="text-text font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-textMuted hover:text-primary transition-colors text-sm">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-textMuted hover:text-primary transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <a href="#forum" className="text-textMuted hover:text-primary transition-colors text-sm">
                  Forum
                </a>
              </li>
            </ul>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-text font-bold mb-4">CONNECT</h3>
            <ul className="space-y-2">
              <li>
                <a href="https://twitter.com" className="text-textMuted hover:text-primary transition-colors text-sm">
                  Twitter
                </a>
              </li>
              <li>
                <a href="https://instagram.com" className="text-textMuted hover:text-primary transition-colors text-sm">
                  Instagram
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="text-textMuted hover:text-primary transition-colors text-sm">
                  Discord
                </a>
              </li>
              <li>
                <a href="https://bsky.app" className="text-textMuted hover:text-primary transition-colors text-sm">
                  Bluesky
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mb-8 pb-8 border-b border-slate-200">
          <p className="text-textMuted text-xs text-center mb-4">
            INFRASTRUCTURE POWERED BY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-6">
            <span className="text-textMuted text-sm">Amazon AWS</span>
            <span className="text-textMuted text-sm">Microsoft Azure</span>
            <span className="text-textMuted text-sm">Supabase</span>
            <span className="text-textMuted text-sm">ComplyCube</span>
            <span className="text-textMuted text-sm">Stripe</span>
          </div>
          <p className="text-textMuted text-xs text-center mt-4">
            Your data protected by the same infrastructure as Fortune 500s
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex items-center gap-2">
            <img src={chainpassIcon} alt="ChainPass" className="h-6 w-6" />
            <p className="text-textMuted text-sm">
              Powered by ChainPass
            </p>
          </div>
          <p className="text-textMuted text-sm">
            © 2024 Vairify
          </p>
          <div className="flex space-x-4">
            <a href="/privacy" className="text-textMuted hover:text-primary transition-colors text-sm">
              Privacy
            </a>
            <a href="/terms" className="text-textMuted hover:text-primary transition-colors text-sm">
              Terms
            </a>
            <a href="/contact" className="text-textMuted hover:text-primary transition-colors text-sm">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
