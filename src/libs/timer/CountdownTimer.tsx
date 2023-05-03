/* eslint-disable jsx-a11y/media-has-caption */
import { useState, useEffect, useRef } from 'react';
import tick from '../../../assets/sounds/tick.mp3';
import ding from '../../../assets/sounds/ding.mp3';

function CountdownTimer() {
  const TIMEOUT = 25 * 60;
  const [seconds, setSeconds] = useState<number>(TIMEOUT);
  const [isActive, setIsActive] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  function playAudio(source: string) {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.src = source;
      audioElement.play();
    }
  }

  useEffect(() => {
    let intervalId: ReturnType<typeof setTimeout>;

    if (isActive && seconds > 0) {
      intervalId = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (isActive && seconds < 1) {
      setIsActive(false);
      playAudio(ding);
    }

    return () => clearInterval(intervalId);
  }, [isActive, seconds]);

  useEffect(() => {
    if (isActive && seconds % 60 === 0) {
      playAudio(tick);
    }
  }, [seconds, isActive]);

  function toggleIsActive() {
    setIsActive(!isActive);
    playAudio(tick);
  }

  function formatTime() {
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${
      secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
    }`;
  }

  const progress = 100 - (seconds / TIMEOUT) * 100;

  return (
    <div className="relative w-48 h-48">
      <audio ref={audioRef} />
      <svg viewBox="0 0 36 36" className="absolute w-full h-full">
        <path
          className="text-gray-300 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="100px, 200px"
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        <path
          className="text-blue-500 fill-none stroke-current"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray={`${progress}px, 200px`}
          d="M18 2.0845
             a 15.9155 15.9155 0 0 1 0 31.831
             a 15.9155 15.9155 0 0 1 0 -31.831"
        />
      </svg>
      <h1 className="absolute inset-0 flex items-center justify-center text-4xl font-bold">
        {formatTime()}
      </h1>
      <button
        type="button"
        className="absolute bottom-0 right-0"
        onClick={toggleIsActive}
      >
        Start
      </button>
    </div>
  );
}

export default CountdownTimer;
