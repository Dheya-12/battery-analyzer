'use client';

import { useEffect, useRef } from 'react';
import { createBatteryGradient } from '@/lib/gradient/renderer';

export default function GradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<ReturnType<typeof createBatteryGradient> | null>(null);

  useEffect(() => {
    if (!canvasRef.current) {
      console.error('Canvas ref is null');
      return;
    }

    console.log('Initializing gradient...');
    const canvas = canvasRef.current;

    // Set canvas size immediately
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const renderer = createBatteryGradient(canvas);

    if (renderer.initialize()) {
      console.log('✅ Gradient initialized successfully');
      renderer.start();
      rendererRef.current = renderer;
    } else {
      console.error('❌ Failed to initialize gradient');
    }

    const handleResize = () => {
      if (rendererRef.current) {
        rendererRef.current.resize();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: -10,
        pointerEvents: 'none'
      }}
    />
  );
}
