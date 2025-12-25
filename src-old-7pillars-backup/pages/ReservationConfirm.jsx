import { useLocation, Link } from 'react-router-dom';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

function ReservationConfirm() {
  const location = useLocation();
  const reservation = location.state?.reservation;

  if (!reservation) {
    return (
      <div className="min-h-screen bg-background text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">No reservation found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />

      <main className="pt-24 pb-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg
                className="w-10 h-10 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              SPOT RESERVED
            </h1>
            <p className="text-xl text-textMuted mb-2">
              You're position #{reservation.position} in the Founding Council
            </p>
          </div>

          <div className="bg-card border border-primary/30 rounded-lg p-8 mb-8 text-left">
            <h2 className="text-2xl font-bold mb-6 text-center">NEXT STEPS</h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-bold mb-2">Check your email</h3>
                  <p className="text-textMuted text-sm">
                    We've sent registration instructions to <span className="text-primary">{reservation.email}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-bold mb-2">Complete registration</h3>
                  <p className="text-textMuted text-sm">
                    You have 24 hours to complete your official registration
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-bold mb-2">Cast your first vote</h3>
                  <p className="text-textMuted text-sm">
                    Vote on your first feature decision to lock in your spot
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-danger/10 border border-danger/30 rounded-lg p-6 mb-8">
            <p className="text-danger font-bold mb-2">⏰ Clock is ticking</p>
            <p className="text-textMuted text-sm">
              Miss the 24-hour window and your spot goes to the next person in line.
            </p>
          </div>

          {reservation.referral_code && (
            <div className="bg-card border border-accent/30 rounded-lg p-6">
              <h3 className="font-bold mb-2">Your Referral Code</h3>
              <p className="text-accent text-2xl font-mono mb-2">{reservation.referral_code}</p>
              <p className="text-textMuted text-sm">
                Share this code with others to help them skip the line
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ReservationConfirm;
