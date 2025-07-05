'use client';
import { useEffect, useRef } from 'react';

export default function NotificationSound() {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleNewBooking = () => {
      // Reset audio to start if already playing
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    };
    window.addEventListener('new-booking', handleNewBooking);
    return () => window.removeEventListener('new-booking', handleNewBooking);
  }, []);

  return <audio ref={audioRef} src="/notification.mp3" preload="auto" />;
}