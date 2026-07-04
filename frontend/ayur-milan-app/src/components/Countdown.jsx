import React, { useState, useEffect } from 'react';

export default function Countdown() {
  const targetDate = new Date('2026-10-01T08:00:00').getTime();
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let time = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      time = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return time;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format with leading zero if single digit
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  const units = [
    { value: formatNumber(timeLeft.days), label: 'Days' },
    { value: formatNumber(timeLeft.hours), label: 'Hours' },
    { value: formatNumber(timeLeft.minutes), label: 'Mins' },
    { value: formatNumber(timeLeft.seconds), label: 'Secs' },
  ];

  return (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', margin: '0 auto' }}>
      {units.map((unit, i) => (
        <div key={i} className="countdown-unit" style={{
          background: 'rgba(20, 2, 12, 0.65)',
          border: '1px solid rgba(255, 224, 75, 0.25)',
          borderRadius: '20px',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          padding: '22px 26px',
          minWidth: '100px',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px)';
          e.currentTarget.style.borderColor = 'rgba(255, 224, 75, 0.6)';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(255, 224, 75, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'none';
          e.currentTarget.style.borderColor = 'rgba(255, 224, 75, 0.25)';
          e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        }}
        >
          {/* gold top accent line */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0,
            height: '3px',
            background: 'linear-gradient(90deg, #FFE04B 0%, #D78633 100%)',
          }} />
          <div style={{
            fontSize: '52px', fontWeight: '900', lineHeight: 1.1,
            background: 'linear-gradient(135deg, #FFE04B 0%, #D78633 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            letterSpacing: '-1px', marginBottom: '8px',
            textShadow: '0 0 20px rgba(255, 224, 75, 0.2)',
          }}>{unit.value}</div>
          <div className="countdown-label" style={{
            fontSize: '11px', fontWeight: '800', letterSpacing: '2px',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)',
          }}>{unit.label}</div>
        </div>
      ))}
    </div>
  );
}
