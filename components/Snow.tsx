// components/Snow.tsx
"use client"

import React, { useEffect, useRef, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
  shape: string;
  drift: number;
  driftDuration: number;
}

export default function Snow() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);
  const shapes = ['❅', '❆', '❄', '✻', '✼', '❉'];
  const intervalRef = useRef<NodeJS.Timeout>();

  const createSnowflake = (id: number): Snowflake => ({
    id,
    left: Math.random() * 100,
    animationDuration: 5 + Math.random() * 10,
    opacity: 0.3 + Math.random() * 0.7,
    size: 8 + Math.random() * 12,
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    drift: -20 + Math.random() * 40,
    driftDuration: 3 + Math.random() * 4
  });

  useEffect(() => {
    // Create initial snowflakes
    const initialSnowflakes = Array.from({ length: 150 }, (_, i) =>
      createSnowflake(i)
    );
    setSnowflakes(initialSnowflakes);

    // Set up interval for adding new snowflakes
    intervalRef.current = setInterval(() => {
      const timestamp = Date.now();
      setSnowflakes(current => {
        const newFlake1 = createSnowflake(timestamp);
        const newFlake2 = createSnowflake(timestamp + 1);
        const newFlake3 = createSnowflake(timestamp + 2);
        return [...current.slice(-147), newFlake1, newFlake2, newFlake3];
      });
    }, 200);

    // Cleanup interval on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); // Empty dependency array

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="absolute text-white select-none animate-fall"
          style={{
            left: `${flake.left}%`,
            fontSize: `${flake.size}px`,
            opacity: flake.opacity,
            animation: `snowfall ${flake.animationDuration}s linear infinite`,
            transform: `translateX(${flake.drift}px)`,
            transition: `transform ${flake.driftDuration}s ease-in-out`,
            willChange: 'transform',
          }}
        >
          {flake.shape}
        </div>
      ))}
    </div>
  );
}