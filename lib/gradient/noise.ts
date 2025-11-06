import type { NoiseConfig } from './types';

export const DEFAULT_NOISE_CONFIG: NoiseConfig = {
  frequency: 2.0,
  amplitude: 0.4,
  octaves: 4,
  persistence: 0.5,
};

function fade(t: number): number {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function lerp(a: number, b: number, t: number): number {
  return a + t * (b - a);
}

function grad2D(x: number, y: number): { x: number; y: number } {
  const hash = (x * 374761393 + y * 668265263) % 2147483648;
  const angle = (hash / 2147483648) * Math.PI * 2;

  return {
    x: Math.cos(angle),
    y: Math.sin(angle),
  };
}

function dotGridGradient(ix: number, iy: number, x: number, y: number): number {
  const gradient = grad2D(ix, iy);
  const dx = x - ix;
  const dy = y - iy;

  return dx * gradient.x + dy * gradient.y;
}

export function perlinNoise2D(x: number, y: number): number {
  const x0 = Math.floor(x);
  const x1 = x0 + 1;
  const y0 = Math.floor(y);
  const y1 = y0 + 1;

  const sx = fade(x - x0);
  const sy = fade(y - y0);

  const n0 = dotGridGradient(x0, y0, x, y);
  const n1 = dotGridGradient(x1, y0, x, y);
  const ix0 = lerp(n0, n1, sx);

  const n2 = dotGridGradient(x0, y1, x, y);
  const n3 = dotGridGradient(x1, y1, x, y);
  const ix1 = lerp(n2, n3, sx);

  return lerp(ix0, ix1, sy);
}

export function fbm(
  x: number,
  y: number,
  config: NoiseConfig = DEFAULT_NOISE_CONFIG
): number {
  let value = 0.0;
  let amplitude = config.amplitude;
  let frequency = config.frequency;

  for (let i = 0; i < config.octaves; i++) {
    const noiseValue = perlinNoise2D(x * frequency, y * frequency);
    value += noiseValue * amplitude;
    frequency *= 2.0;
    amplitude *= config.persistence;
  }

  return value;
}

export function animatedNoise(
  x: number,
  y: number,
  time: number,
  speed: number = 1.0
): number {
  const timeOffset = time * speed * 0.1;
  return perlinNoise2D(x + timeOffset, y + timeOffset * 0.7);
}

export function animatedFBM(
  x: number,
  y: number,
  time: number,
  config: NoiseConfig = DEFAULT_NOISE_CONFIG
): number {
  let value = 0.0;
  let amplitude = config.amplitude;
  let frequency = config.frequency;
  const timeOffset = time * 0.05;

  for (let i = 0; i < config.octaves; i++) {
    const octaveTimeOffset = timeOffset * (1.0 + i * 0.1);
    const noiseValue = perlinNoise2D(
      (x + octaveTimeOffset) * frequency,
      (y + octaveTimeOffset * 0.7) * frequency
    );
    value += noiseValue * amplitude;
    frequency *= 2.0;
    amplitude *= config.persistence;
  }

  return value;
}

export function normalizeNoise(value: number): number {
  return (value + 1.0) * 0.5;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}
