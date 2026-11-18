'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

export function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Optimized Lightweight Stars array (45 stars, low CPU footprint)
    const starsCount = 45;
    const stars: {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      delta: number;
      gold: boolean;
    }[] = [];

    for (let i = 0; i < starsCount; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        delta: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        gold: Math.random() > 0.65,
      });
    }

    let lastTime = 0;
    const frameInterval = 1000 / 25; // Throttled to 25 FPS for maximum main-thread responsiveness

    const render = (time: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (time - lastTime < frameInterval) return;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.alpha += star.delta;
        if (star.alpha <= 0.1 || star.alpha >= 0.9) {
          star.delta = -star.delta;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.gold
          ? `rgba(214, 181, 109, ${star.alpha})`
          : `rgba(245, 240, 230, ${star.alpha * 0.8})`;
        ctx.fill();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* High-Resolution Deep Space Cosmic Galaxy & Universe Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/cosmic-galaxy-universe.jpg"
          alt="Deep Space Cosmic Galaxy Universe"
          fill
          priority
          className="object-cover object-center opacity-15 mix-blend-screen scale-105"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#080D24]/96 via-[#080D24]/92 to-[#080D24]/97" />
      </div>

      {/* Floating Stardust Galaxy Layer */}
      <div className="absolute inset-0 bg-astro-midnight/40 bg-cosmic-radial opacity-60" />

      {/* Animated Canvas Stars */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />

      {/* Celestial Golden & Royal Navy Cosmic Auroras */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-astro-gold/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[700px] h-[450px] bg-astro-navy/80 blur-[130px] rounded-full pointer-events-none" />
    </div>
  );
}
