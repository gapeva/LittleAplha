import { useState, useEffect } from 'react';

export function useTimer(expiryTimestamp) {
  const [secondsLeft, setSecondsLeft] = useState(0);

  useEffect(() => {
    if (!expiryTimestamp) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(expiryTimestamp).getTime() - now;
      
      if (distance < 0) {
        setSecondsLeft(0);
        clearInterval(interval);
      } else {
        setSecondsLeft(Math.floor(distance / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [expiryTimestamp]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  return { 
    minutes, 
    seconds: seconds.toString().padStart(2, '0'), 
    isExpired: secondsLeft <= 0 
  };
}
