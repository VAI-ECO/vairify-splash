import { useState, useEffect } from 'react';

const CountdownTimer = ({ expiresAt, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiration = new Date(expiresAt).getTime();
      const difference = expiration - now;

      if (difference <= 0) {
        setIsExpired(true);
        if (onExpire) onExpire();
        return { hours: 0, minutes: 0, seconds: 0 };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // Initial calculation
    setTimeLeft(calculateTimeLeft());

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [expiresAt, onExpire]);

  const formatNumber = (num) => String(num).padStart(2, '0');

  const totalHoursLeft = timeLeft.hours + (timeLeft.minutes / 60);
  const isUrgent = totalHoursLeft < 1 && !isExpired;

  if (isExpired) {
    return (
      <div className="text-center">
        <div className="text-4xl md:text-6xl font-mono font-bold text-danger mb-2">
          EXPIRED
        </div>
        <p className="text-textSecondary">Your reservation window has closed</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className={`text-5xl md:text-7xl font-mono font-bold mb-4 transition-colors ${
        isUrgent ? 'text-danger animate-pulse' : 'text-accent'
      }`}>
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </div>

      <div className="flex justify-center gap-8 text-sm text-textSecondary">
        <div>
          <div className="font-mono text-2xl text-textPrimary">{formatNumber(timeLeft.hours)}</div>
          <div>hours</div>
        </div>
        <div>
          <div className="font-mono text-2xl text-textPrimary">{formatNumber(timeLeft.minutes)}</div>
          <div>minutes</div>
        </div>
        <div>
          <div className="font-mono text-2xl text-textPrimary">{formatNumber(timeLeft.seconds)}</div>
          <div>seconds</div>
        </div>
      </div>

      {isUrgent && (
        <div className="mt-4 text-danger font-bold animate-pulse">
          ⚠️ LESS THAN 1 HOUR REMAINING
        </div>
      )}
    </div>
  );
};

export default CountdownTimer;
