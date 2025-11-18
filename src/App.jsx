import React, { useState, useEffect, useRef } from 'react'
import Weather from './components/Wether'

export default function App() {
  const [redirect, setRedirect] = useState(false);
  const [ready, setReady] = useState(false);
  const audioRef = useRef(null);
  const [audioError, setAudioError] = useState('');

  useEffect(() => {
    if (!ready) return; 

    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.8;

    const timer = setTimeout(() => {
      setRedirect(true);
      audio.pause();
    }, 3000);

    return () => {
      clearTimeout(timer);
      audio.pause();
    };
  }, [ready]);

  if (redirect) return <Weather />;

  if (!ready) {
    const handleStart = () => {

      try {
            const audio = new Audio(import.meta.env.BASE_URL + 'sounds/thunder.mp3');
            audioRef.current = audio;
            audio.volume = 0.8;

            try {
              const canPlay = audio.canPlayType ? audio.canPlayType('audio/mpeg') : '';
              if (!canPlay) {
                setAudioError('Browser cannot play MP3 files (reported no support).');
              }
            } catch (e) {
              console.warn('canPlayType check failed', e);
            }

            const playPromise = audio.play();
            if (playPromise !== undefined) {
              playPromise.catch((err) => {
                console.warn('Audio play was blocked or failed:', err);
                if (err && err.name === 'NotSupportedError') {
                  setAudioError('Audio format not supported by the browser (NotSupportedError).');
                } else if (err && err.name === 'NotAllowedError') {
                  setAudioError('Audio playback not allowed (user gesture required).');
                } else {
                  setAudioError(err?.message || 'Audio playback failed');
                }
              });
            }
      } catch (err) {
        console.error('Error creating/playing audio:', err);
      }

      setReady(true);
    };

    return (
      <div
        className="h-screen w-full flex items-center justify-center bg-black text-white text-2xl cursor-pointer"
        onClick={handleStart}
      >
        🔥Weather App →
      </div>
    );
  }

  return (
    <div
      className="h-screen w-full bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage:
          "url('https://photoatelier.org/wp-content/uploads/2019/08/lightening-animated-gif-2.gif')",
      }}
    >
    </div>
  );
}
