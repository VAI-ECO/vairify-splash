import { useState, useEffect } from 'react';
import { supabase, TierCount, generateCouponCode, getTierDiscount, getTierBadge, getTierDisplayName } from '../lib/supabase';

interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface ConfirmationData {
  tier: string;
  spotNumber: number;
  couponCode: string;
}

interface SignupToast {
  id: number;
  tier: string;
  spotNumber: number;
}

export default function LandingPage() {
  const [tierCounts, setTierCounts] = useState<TierCount[]>([]);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationData, setConfirmationData] = useState<ConfirmationData | null>(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [viewerCount, setViewerCount] = useState(487);
  const [signupToasts, setSignupToasts] = useState<SignupToast[]>([]);
  const [vaiStep, setVaiStep] = useState(0);

  // Countdown to registration opens (December 15, 2024)
  const [registrationCountdown, setRegistrationCountdown] = useState<CountdownTime>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Countdown to deadline (January 2-3, 2025)
  const [deadlineCountdown, setDeadlineCountdown] = useState<CountdownTime>({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  // Video carousel auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % 7);
    }, 20000); // 20 seconds

    return () => clearInterval(interval);
  }, []);

  // Fetch tier counts
  useEffect(() => {
    fetchTierCounts();

    // Subscribe to real-time updates
    const subscription = supabase
      .channel('tier_counts_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'tier_counts' },
        () => fetchTierCounts()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Countdown timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const regDate = new Date('2024-12-15T00:00:00').getTime();
      const deadlineDate = new Date('2025-01-03T23:59:59').getTime();

      setRegistrationCountdown(calculateTimeRemaining(now, regDate));
      setDeadlineCountdown(calculateTimeRemaining(now, deadlineDate));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Viewer count fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate signup toasts
  useEffect(() => {
    const interval = setInterval(() => {
      const tiers = ['founding_council', 'first_movers', 'early_access'];
      const randomTier = tiers[Math.floor(Math.random() * tiers.length)];
      const randomSpot = Math.floor(Math.random() * 1000) + 1;

      const newToast: SignupToast = {
        id: Date.now(),
        tier: randomTier,
        spotNumber: randomSpot
      };

      setSignupToasts(prev => [...prev, newToast]);

      // Remove toast after 5 seconds
      setTimeout(() => {
        setSignupToasts(prev => prev.filter(t => t.id !== newToast.id));
      }, 5000);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const calculateTimeRemaining = (now: number, target: number): CountdownTime => {
    const distance = target - now;

    if (distance < 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };

  const fetchTierCounts = async () => {
    const { data, error } = await supabase
      .from('tier_counts')
      .select('*')
      .order('max_count', { ascending: false });

    if (data && !error) {
      setTierCounts(data);
    }
  };

  const getAvailableSpots = (tier: string): number => {
    const tierData = tierCounts.find(t => t.tier === tier);
    if (!tierData) return 0;
    return tierData.max_count - tierData.current_count;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Check if email already exists
      const { data: existingSignup } = await supabase
        .from('waitlist_signups')
        .select('*')
        .eq('email', email)
        .single();

      if (existingSignup) {
        setError('This email is already registered!');
        setLoading(false);
        return;
      }

      // Get available tier using RPC
      const { data: tierInfo, error: tierError } = await supabase
        .rpc('get_available_tier')
        .single();

      if (tierError || !tierInfo || !tierInfo.tier_name) {
        setError('All spots are filled! Join our waiting list at waitlist@vairify.com');
        setLoading(false);
        return;
      }

      const tier = tierInfo.tier_name;
      const spotNumber = tierInfo.spot_number;
      const couponCode = generateCouponCode(tier, spotNumber);

      // Insert signup
      const { error: insertError } = await supabase
        .from('waitlist_signups')
        .insert({
          email,
          phone: phone || null,
          tier,
          tier_spot_number: spotNumber,
          partner_coupon_code: couponCode
        });

      if (insertError) {
        setError('An error occurred. Please try again.');
        setLoading(false);
        return;
      }

      // Update tier count
      await supabase
        .from('tier_counts')
        .update({ current_count: spotNumber })
        .eq('tier', tier);

      // Show confirmation modal
      setConfirmationData({ tier, spotNumber, couponCode });
      setShowConfirmation(true);
      setEmail('');
      setPhone('');
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const scrollToSignup = () => {
    document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
  };

  const foundingCouncilSpots = getAvailableSpots('founding_council');

  const videos = [
    { title: 'Welcome to Vairify', placeholder: 'Video 1: Platform Overview' },
    { title: 'VAI-CHECK in Action', placeholder: 'Video 2: Identity Verification' },
    { title: 'DateGuard Protection', placeholder: 'Video 3: Real-time Safety' },
    { title: 'TrueRevu Reviews', placeholder: 'Video 4: Verified Reviews' },
    { title: 'Community Power', placeholder: 'Video 5: User Stories' },
    { title: 'Your Safety Matters', placeholder: 'Video 6: Mission Statement' },
    { title: 'Join the Movement', placeholder: 'Video 7: Call to Action' }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Social Proof - Viewing Counter */}
      <div className="fixed top-4 right-4 z-40 px-4 py-2 rounded-full bg-black/80 backdrop-blur-sm border border-purple-500/30 text-sm">
        <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
        {viewerCount} people viewing
      </div>

      {/* Signup Toasts */}
      <div className="fixed bottom-4 left-4 z-40 space-y-2">
        {signupToasts.map(toast => (
          <div
            key={toast.id}
            className="px-4 py-3 rounded-lg bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-sm border border-purple-500/30 shadow-lg animate-slide-in"
          >
            <p className="text-sm">
              {getTierBadge(toast.tier)} <strong>{getTierDisplayName(toast.tier)}</strong> #{toast.spotNumber} claimed!
            </p>
          </div>
        ))}
      </div>

      {/* Video Carousel Hero */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] z-10" />

        {/* Video Placeholders */}
        <div className="relative h-full">
          {videos.map((video, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentVideoIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <div className="h-full w-full bg-gradient-to-br from-purple-900/40 to-pink-900/40 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl mb-4">🎥</div>
                  <p className="text-2xl font-semibold text-gray-300">{video.placeholder}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Hero Content Overlay */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
          <div className="text-center max-w-4xl">
            {/* Logo */}
            <h1 className="text-6xl md:text-9xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#ec4899] bg-clip-text text-transparent mb-6">
              Vairify
            </h1>

            {/* Headline */}
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              A New Era in Safety Begins
            </h2>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              The first platform where safety is FREE. Forever.
            </p>

            {/* Live Counter */}
            <div className="inline-block mb-8 px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 backdrop-blur-sm">
              <p className="text-2xl md:text-3xl font-bold">
                🔥 {foundingCouncilSpots}/500 Founding Council spots remaining
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <button
                onClick={scrollToSignup}
                className="px-12 py-4 text-xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-full hover:scale-105 transition-transform duration-200 shadow-lg shadow-purple-500/50"
              >
                Claim Your Spot
              </button>
            </div>
          </div>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex gap-2">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentVideoIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentVideoIndex
                  ? 'bg-white w-8'
                  : 'bg-white/40 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-12 leading-tight">
            Safety Should Never Be
            <br />
            <span className="text-gradient">Behind a Paywall</span>
          </h2>

          <div className="space-y-8 text-xl md:text-2xl text-gray-300 leading-relaxed">
            <p className="animate-fade-in">
              For too long, dating apps have <strong className="text-white">profited from fear</strong>.
            </p>

            <p className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              They've put basic safety features behind premium subscriptions,
              treating your security as a <strong className="text-white">luxury upgrade</strong>.
            </p>

            <p className="animate-fade-in" style={{ animationDelay: '1s' }}>
              <strong className="text-white">We're done with that.</strong>
            </p>

            <p className="text-3xl md:text-4xl font-bold text-white animate-fade-in mt-12" style={{ animationDelay: '1.5s' }}>
              Vairify makes safety FREE.
              <br />
              <span className="text-gradient">Always.</span>
            </p>
          </div>
        </div>
      </section>

      {/* V.A.I. Explainer Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              V.A.I. Verification
            </h2>
            <p className="text-xl text-gray-400">
              Verified Authentic Identity — Know who you're meeting in 10 seconds
            </p>
          </div>

          {/* Interactive Flow */}
          <div className="grid md:grid-cols-4 gap-6">
            <VAIStep
              number={1}
              title="Upload ID"
              description="Take a photo of your government ID"
              icon="📱"
              active={vaiStep === 0}
              onHover={() => setVaiStep(0)}
            />

            <VAIStep
              number={2}
              title="AI Verification"
              description="Our AI validates authenticity in real-time"
              icon="🤖"
              active={vaiStep === 1}
              onHover={() => setVaiStep(1)}
            />

            <VAIStep
              number={3}
              title="Liveness Check"
              description="Quick selfie confirms you're really you"
              icon="😊"
              active={vaiStep === 2}
              onHover={() => setVaiStep(2)}
            />

            <VAIStep
              number={4}
              title="Verified Badge"
              description="Get your verified checkmark instantly"
              icon="✓"
              active={vaiStep === 3}
              onHover={() => setVaiStep(3)}
            />
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30">
              <p className="text-2xl font-bold text-green-400">
                100% FREE. No Hidden Costs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Pillars of Protection */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              7 Pillars of Protection
            </h2>
            <p className="text-xl text-gray-400">
              Your complete safety ecosystem. All FREE. Forever.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PillarCard
              number={1}
              icon="✓"
              title="Identity Verification"
              description="VAI-CHECK ensures every user is real and verified"
            />

            <PillarCard
              number={2}
              icon="🛡️"
              title="Active Monitoring"
              description="DateGuard watches over every date in real-time"
            />

            <PillarCard
              number={3}
              icon="⭐"
              title="Verified Reviews"
              description="TrueRevu — blockchain-verified, impossible to fake"
            />

            <PillarCard
              number={4}
              icon="📍"
              title="Location Sharing"
              description="Share your live location with trusted contacts"
            />

            <PillarCard
              number={5}
              icon="🚨"
              title="Emergency SOS"
              description="One-tap emergency alerts to contacts and authorities"
            />

            <PillarCard
              number={6}
              icon="📞"
              title="Check-In System"
              description="Automated safety check-ins during your date"
            />

            <PillarCard
              number={7}
              icon="🔐"
              title="Background Checks"
              description="Optional enhanced screening for peace of mind"
            />
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-20 px-4 bg-gradient-to-b from-purple-900/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4">
              The Journey Ahead
            </h2>
            <p className="text-xl text-gray-400">
              Built with the community, for the community
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500" />

            <div className="space-y-12">
              <RoadmapItem
                phase="Phase 1"
                title="Community Foundation"
                date="Dec 2024 - Q1 2025"
                items={[
                  'Waitlist opens (Dec 15, 2024)',
                  'Registration deadline (Jan 2-3, 2025)',
                  'Community voting begins',
                  'Premium features development',
                  'All members get Premium FREE'
                ]}
                side="left"
              />

              <RoadmapItem
                phase="Phase 2"
                title="Platform Launch"
                date="Q2 2025"
                items={[
                  'Last premium feature released',
                  'Free period clocks start',
                  'FC + FM continue voting',
                  'Public beta launch',
                  'Partner integrations go live'
                ]}
                side="right"
              />

              <RoadmapItem
                phase="Phase 3"
                title="Expansion & Scale"
                date="Q3-Q4 2025"
                items={[
                  'International expansion',
                  'Advanced AI features',
                  'Legal fund activation',
                  'Council leadership programs',
                  'Community-driven innovation'
                ]}
                side="left"
              />

              <RoadmapItem
                phase="Future"
                title="You Decide"
                date="2026 and Beyond"
                items={[
                  'Feature roadmap decided by YOU',
                  'Founding Council leads direction',
                  'Community governance in action',
                  'Safety standards for the industry',
                  'A platform truly owned by users'
                ]}
                side="right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section className="py-16 px-4 border-y border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Registration Opens */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-purple-900/20 to-purple-600/10 border border-purple-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-purple-400">Registration Opens</h3>
              <div className="flex gap-4 justify-center">
                <TimeBlock value={registrationCountdown.days} label="Days" />
                <TimeBlock value={registrationCountdown.hours} label="Hours" />
                <TimeBlock value={registrationCountdown.minutes} label="Mins" />
                <TimeBlock value={registrationCountdown.seconds} label="Secs" />
              </div>
              <p className="text-center mt-4 text-gray-400">December 15, 2024</p>
            </div>

            {/* Deadline */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-pink-900/20 to-pink-600/10 border border-pink-500/30 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-4 text-pink-400">Registration Deadline</h3>
              <div className="flex gap-4 justify-center">
                <TimeBlock value={deadlineCountdown.days} label="Days" />
                <TimeBlock value={deadlineCountdown.hours} label="Hours" />
                <TimeBlock value={deadlineCountdown.minutes} label="Mins" />
                <TimeBlock value={deadlineCountdown.seconds} label="Secs" />
              </div>
              <p className="text-center mt-4 text-gray-400">January 2-3, 2025</p>
            </div>
          </div>

          <div className="text-center p-4 rounded-xl bg-red-500/10 border border-red-500/30">
            <p className="text-2xl font-bold text-red-400">⚠️ 10,000 LIMITED SPOTS</p>
          </div>
        </div>
      </section>

      {/* Tier Cards Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Choose Your Tier
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Founding Council */}
            <TierCard
              badge="🔥"
              title="FOUNDING COUNCIL"
              spots={`${tierCounts.find(t => t.tier === 'founding_council')?.current_count || 0}/500`}
              totalSpots="500 spots"
              premium="FREE FOREVER"
              governance="VOTING + TIEBREAKER"
              partnerCoupon="100% OFF"
              isBest={true}
              features={[
                'Vairify Basic: FREE',
                'Premium: FREE FOREVER',
                'Final Say on Votes',
                'Council Leadership',
                'CEO Calls',
                'Feature Input',
                'Legal Fund Access'
              ]}
            />

            {/* First Movers */}
            <TierCard
              badge="⚡"
              title="FIRST MOVERS"
              spots={`${tierCounts.find(t => t.tier === 'first_movers')?.current_count || 0}/2,500`}
              totalSpots="2,500 spots"
              premium="FREE 1 Year, then 50% OFF FOREVER"
              governance="VOTING"
              partnerCoupon="50% OFF"
              features={[
                'Vairify Basic: FREE',
                'Premium Free: 1 Year',
                'Save $125/yr Forever',
                'Phase 1 & 2 Voting',
                'CEO Calls',
                'Feature Input',
                'Legal Fund Access'
              ]}
            />

            {/* Early Access */}
            <TierCard
              badge="🚀"
              title="EARLY ACCESS"
              spots={`${tierCounts.find(t => t.tier === 'early_access')?.current_count || 0}/7,000`}
              totalSpots="7,000 spots"
              premium="FREE 6 Months, then 20% OFF FOREVER"
              governance="Phase 1 only"
              partnerCoupon="20% OFF"
              features={[
                'Vairify Basic: FREE',
                'Premium Free: 6 Months',
                'Save $50/yr Forever',
                'Phase 1 Voting',
                'CEO Calls',
                'Feature Input',
                'Legal Fund Access'
              ]}
            />
          </div>

          <div className="p-6 rounded-xl bg-gray-900/50 border border-gray-700 backdrop-blur-sm">
            <p className="text-center text-gray-300">
              <strong>Phase 1:</strong> Everyone votes on premium features, pricing, policies. ALL get Premium FREE.
              <br />
              <strong>Phase 2:</strong> Begins when last premium feature releases. Free period clocks START. Only FC + FM vote.
              <br />
              <strong>Tiebreaker:</strong> If no super majority, Founding Council casts final deciding vote.
            </p>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section id="signup" className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="p-8 md:p-12 rounded-2xl bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Claim Your Spot
            </h2>
            <p className="text-center text-gray-400 mb-8">
              Join the movement. Lock in your lifetime benefits.
            </p>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-black/50 border border-gray-700 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 text-xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-full hover:scale-105 transition-transform duration-200 shadow-lg shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Processing...' : 'Claim My Spot'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Confirmation Modal */}
      {showConfirmation && confirmationData && (
        <ConfirmationModal
          tier={confirmationData.tier}
          spotNumber={confirmationData.spotNumber}
          couponCode={confirmationData.couponCode}
          onClose={() => setShowConfirmation(false)}
        />
      )}

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center text-gray-500">
          <p>&copy; 2024 Vairify. Safety First. Always Free.</p>
        </div>
      </footer>
    </div>
  );
}

// Time Block Component
function TimeBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-white to-gray-400 bg-clip-text text-transparent">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-sm text-gray-500 mt-1">{label}</div>
    </div>
  );
}

// VAI Step Component
interface VAIStepProps {
  number: number;
  title: string;
  description: string;
  icon: string;
  active: boolean;
  onHover: () => void;
}

function VAIStep({ number, title, description, icon, active, onHover }: VAIStepProps) {
  return (
    <div
      onMouseEnter={onHover}
      className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer ${
        active
          ? 'bg-gradient-to-br from-purple-500/30 to-pink-500/30 border-2 border-purple-500 scale-105'
          : 'bg-gray-900/50 border border-gray-700 hover:border-purple-500/50'
      }`}
    >
      <div className="text-center">
        <div className="text-5xl mb-4">{icon}</div>
        <div className="text-sm text-purple-400 font-semibold mb-2">Step {number}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-sm text-gray-400">{description}</p>
      </div>
    </div>
  );
}

// Pillar Card Component
interface PillarCardProps {
  number: number;
  icon: string;
  title: string;
  description: string;
}

function PillarCard({ number, icon, title, description }: PillarCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700 backdrop-blur-sm hover:border-purple-500/50 transition-all group">
      <div className="text-sm text-purple-400 font-semibold mb-2">Pillar {number}</div>
      <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}

// Roadmap Item Component
interface RoadmapItemProps {
  phase: string;
  title: string;
  date: string;
  items: string[];
  side: 'left' | 'right';
}

function RoadmapItem({ phase, title, date, items, side }: RoadmapItemProps) {
  return (
    <div className={`relative md:flex ${side === 'right' ? 'md:flex-row-reverse' : ''}`}>
      {/* Timeline Dot */}
      <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transform -translate-x-1/2 z-10" />

      {/* Content */}
      <div className={`ml-16 md:ml-0 md:w-1/2 ${side === 'right' ? 'md:pl-12' : 'md:pr-12'}`}>
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-500/30 backdrop-blur-sm">
          <div className="text-sm text-purple-400 font-semibold mb-1">{phase}</div>
          <h3 className="text-2xl font-bold mb-2">{title}</h3>
          <p className="text-sm text-gray-400 mb-4">{date}</p>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-green-400 mt-1">✓</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// Tier Card Component
interface TierCardProps {
  badge: string;
  title: string;
  spots: string;
  totalSpots: string;
  premium: string;
  governance: string;
  partnerCoupon: string;
  isBest?: boolean;
  features: string[];
}

function TierCard({ badge, title, spots, totalSpots, premium, governance, partnerCoupon, isBest, features }: TierCardProps) {
  return (
    <div className={`relative p-8 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105 ${
      isBest
        ? 'bg-gradient-to-br from-orange-500/20 to-red-500/20 border-2 border-orange-500/50'
        : 'bg-gradient-to-br from-purple-900/20 to-purple-600/10 border border-purple-500/30'
    }`}>
      {isBest && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-sm font-bold">
          BEST VALUE
        </div>
      )}

      <div className="text-center mb-6">
        <div className="text-5xl mb-2">{badge}</div>
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <div className="text-3xl font-bold text-purple-400 mb-1">{spots}</div>
        <div className="text-sm text-gray-500">{totalSpots}</div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="p-3 rounded-lg bg-black/30">
          <div className="text-sm text-gray-400">Premium</div>
          <div className="font-semibold text-green-400">{premium}</div>
        </div>

        <div className="p-3 rounded-lg bg-black/30">
          <div className="text-sm text-gray-400">Governance</div>
          <div className="font-semibold">{governance}</div>
        </div>

        <div className="p-3 rounded-lg bg-black/30">
          <div className="text-sm text-gray-400">Partner Coupon</div>
          <div className="font-semibold text-pink-400">{partnerCoupon}</div>
        </div>
      </div>

      <div className="space-y-2">
        {features.map((feature, index) => (
          <div key={index} className="flex items-start gap-2 text-sm">
            <span className="text-green-400 mt-1">✓</span>
            <span className="text-gray-300">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Confirmation Modal Component
interface ConfirmationModalProps {
  tier: string;
  spotNumber: number;
  couponCode: string;
  onClose: () => void;
}

function ConfirmationModal({ tier, spotNumber, couponCode, onClose }: ConfirmationModalProps) {
  const badge = getTierBadge(tier);
  const tierName = getTierDisplayName(tier);
  const discount = getTierDiscount(tier);

  const benefits = {
    founding_council: [
      'Premium: FREE FOREVER',
      'Lifetime voting rights (Phase 1 & 2)',
      'Tiebreaker voting power',
      'Council leadership opportunities',
      'Direct CEO calls',
      'Feature development input',
      'Legal fund access',
      'Partner discount: 100% OFF'
    ],
    first_movers: [
      'Premium: FREE for 1 year',
      'Then 50% OFF FOREVER (Save $125/yr)',
      'Voting rights (Phase 1 & 2)',
      'Direct CEO calls',
      'Feature development input',
      'Legal fund access',
      'Partner discount: 50% OFF'
    ],
    early_access: [
      'Premium: FREE for 6 months',
      'Then 20% OFF FOREVER (Save $50/yr)',
      'Phase 1 voting rights',
      'Direct CEO calls',
      'Feature development input',
      'Legal fund access',
      'Partner discount: 20% OFF'
    ]
  }[tier] || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="max-w-2xl w-full p-8 md:p-12 rounded-2xl bg-gradient-to-br from-purple-900/90 to-pink-900/90 border border-purple-500/50 shadow-2xl shadow-purple-500/50">
        <div className="text-center mb-8">
          <div className="text-7xl mb-4">{badge}</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            {tierName} #{spotNumber} ACTIVATED!
          </h2>
          <p className="text-xl text-purple-300">
            You're officially in. Welcome to the movement.
          </p>
        </div>

        <div className="mb-8 p-6 rounded-xl bg-black/40 border border-purple-400/30">
          <h3 className="text-lg font-semibold mb-4 text-purple-300">Your Benefits:</h3>
          <ul className="space-y-2">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-green-400 mt-1">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/30">
          <h3 className="text-sm font-semibold mb-2 text-pink-300">Your Partner Coupon Code:</h3>
          <div className="text-3xl font-mono font-bold text-center py-3 px-4 rounded-lg bg-black/50 border border-pink-400/50">
            {couponCode}
          </div>
          <p className="text-sm text-center mt-2 text-gray-300">
            {discount}% OFF partner services
          </p>
        </div>

        <div className="text-center mb-6 p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <p className="text-yellow-400 font-semibold">
            📅 Registration opens December 15th, 2024
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Check your email for next steps!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-8 py-4 text-xl font-bold bg-gradient-to-r from-[#7c3aed] to-[#ec4899] rounded-full hover:scale-105 transition-transform duration-200"
        >
          Let's Go! 🚀
        </button>
      </div>
    </div>
  );
}
