'use client';

import { useEffect, useState } from 'react';

interface CountdownTimerProps {
  initialSeconds: number;
  onComplete?: () => void;
  className?: string;
}

export default function CountdownTimer({
  initialSeconds,
  onComplete,
  className = '',
}: CountdownTimerProps) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds <= 1) {
            setIsActive(false);
            onComplete?.();
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds, onComplete]);

  // 시간을 mm:ss 형식으로 변환
  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // 타이머 일시정지/재개 함수
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className={'text-body-2-normal text-label-alternative'}>
        {formatTime(seconds)}
      </span>
    </div>
  );
}
