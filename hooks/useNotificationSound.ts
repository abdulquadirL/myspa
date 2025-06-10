'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

type SoundMap = {
  [key: string]: string;
};

interface UseNotificationSoundOptions {
  sounds?: SoundMap;
  defaultVolume?: number;
  enableVibration?: boolean;
  vibrationPattern?: number | number[];
  accessibilityAlertId?: string;
  persistKey?: string;
}

const DEFAULT_SOUNDS: SoundMap = {
  booking: '/sounds/notification.mp3',
  update: '/sounds/update.mp3',
  error: '/sounds/error.mp3',
};

const useNotificationSound = ({
  sounds = DEFAULT_SOUNDS,
  defaultVolume = 0.8,
  enableVibration = true,
  vibrationPattern = 200,
  accessibilityAlertId = 'sr-notify',
  persistKey = 'notification-sound-preferences',
}: UseNotificationSoundOptions = {}) => {
  const audioMap = useRef<Map<string, HTMLAudioElement>>(new Map());
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(defaultVolume);

  // Load preferences from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(persistKey);
    if (stored) {
      try {
        const prefs = JSON.parse(stored);
        setIsMuted(prefs.muted ?? false);
        setVolume(prefs.volume ?? defaultVolume);
      } catch (e) {
        console.warn('Failed to load notification preferences:', e);
      }
    }
  }, [persistKey]);

  // Preload audio
  useEffect(() => {
    Object.entries(sounds).forEach(([key, path]) => {
      const audio = new Audio(path);
      audio.volume = volume;
      audio.load();
      audioMap.current.set(key, audio);
    });
  }, [sounds, volume]);

  const savePreferences = useCallback(
    (prefs: { muted?: boolean; volume?: number }) => {
      localStorage.setItem(
        persistKey,
        JSON.stringify({ muted: isMuted, volume, ...prefs })
      );
    },
    [isMuted, volume, persistKey]
  );

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    savePreferences({ muted: newMuted });
  };

  const changeVolume = (v: number) => {
    const vol = Math.max(0, Math.min(1, v));
    setVolume(vol);
    savePreferences({ volume: vol });
    audioMap.current.forEach((audio) => (audio.volume = vol));
  };

  const play = useCallback(
    (key: string = 'booking') => {
      if (isMuted) return;

      const audio = audioMap.current.get(key);
      if (audio) {
        audio
          .play()
          .catch((err) => {
            console.error(`Failed to play sound "${key}"`, err);
            const alertElem = document.getElementById(accessibilityAlertId);
            if (alertElem) {
              alertElem.textContent = `Notification: ${key}`;
            }
          });
      }

      if (enableVibration && 'vibrate' in navigator) {
        navigator.vibrate(vibrationPattern);
      }
    },
    [isMuted, enableVibration, vibrationPattern, accessibilityAlertId]
  );

  return {
    play,
    isMuted,
    volume,
    toggleMute,
    changeVolume,
  };
};

export default useNotificationSound;
