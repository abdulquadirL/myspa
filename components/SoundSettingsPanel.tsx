'use client';

import useNotificationSound from '@/hooks/useNotificationSound';
import { useState } from 'react';

export default function SoundSettingsPanel() {
  const {
    isMuted,
    volume,
    toggleMute,
    changeVolume,
    play,
  } = useNotificationSound();
  const [testSound, setTestSound] = useState('booking');

  return (
    <div className="bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-md w-full max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-amber-300 mb-4">
        🔔 Notification Sound Settings
      </h2>

      <div className="space-y-4">
        {/* Mute Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-gray-700 dark:text-gray-300">Sound</span>
          <button
            onClick={toggleMute}
            className={`px-3 py-1 rounded-md text-sm font-medium transition ${
              isMuted
                ? 'bg-red-500 text-white hover:bg-red-600'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            {isMuted ? '🔇 Muted' : '🔔 Enabled'}
          </button>
        </div>

        {/* Volume Slider */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Volume: {Math.round(volume * 100)}%
          </label>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => changeVolume(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Sound Test */}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 mb-1">
            Test Notification Sound:
          </label>
          <select
            value={testSound}
            onChange={(e) => setTestSound(e.target.value)}
            className="w-full bg-gray-100 dark:bg-zinc-800 dark:text-white p-2 rounded-md mb-2"
          >
            <option value="booking">Booking</option>
            <option value="update">Update</option>
            <option value="error">Error</option>
          </select>
          <button
            onClick={() => play(testSound)}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            🔊 Play Sound
          </button>
        </div>
      </div>
    </div>
  );
}
