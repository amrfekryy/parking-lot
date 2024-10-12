import React, { useState, useEffect } from "react";

export const Timer = ({ iso }: { iso: string }) => {
  const [time, setTime] = useState<number>(() => {
    const initialDate = new Date(iso);
    const now = new Date();
    return Math.floor((now.getTime() - initialDate.getTime()) / 1000);
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSeconds: number): string => {
    const hours = Math.floor(totalSeconds / 3600)
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((totalSeconds % 3600) / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (totalSeconds % 60).toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  return <div>{formatTime(time)}</div>;
};
