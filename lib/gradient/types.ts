export const BATTERY_COLORS = {
  // Dark industrial blues and purples
  deepNavy: '#0a0e27',
  darkBlue: '#1a1f3a',
  richBlue: '#2d3e6f',
  electricBlue: '#3b82f6',
  deepPurple: '#5b21b6',
  darkPurple: '#4c1d95',
  midnightBlue: '#1e1b4b',
  steelBlue: '#334155',
} as const;

export interface RGB {
  r: number;
  g: number;
  b: number;
}

export interface ColorStop {
  position: number;
  color: RGB;
}

export interface GradientConfig {
  colors: string[];
  cycleSpeed: number;
  fullCycleDuration: number;
  enableBreathing: boolean;
  enableXInversion: boolean;
  enableGrain: boolean;
  grainIntensity: number;
  targetFPS: number;
}

export interface Vertex {
  x: number;
  y: number;
  z: number;
}

export interface NoiseConfig {
  frequency: number;
  amplitude: number;
  octaves: number;
  persistence: number;
}

export interface RendererState {
  gl: WebGLRenderingContext | null;
  canvas: HTMLCanvasElement | null;
  program: WebGLProgram | null;
  animationFrameId: number | null;
  isRunning: boolean;
  startTime: number;
}

export const DEFAULT_CONFIG: GradientConfig = {
  colors: [
    BATTERY_COLORS.deepNavy,
    BATTERY_COLORS.darkBlue,
    BATTERY_COLORS.richBlue,
    BATTERY_COLORS.electricBlue,
    BATTERY_COLORS.deepPurple,
    BATTERY_COLORS.darkPurple,
  ],
  cycleSpeed: 6.0, // Slower, more professional
  fullCycleDuration: 45.0, // Longer cycle
  enableBreathing: true,
  enableXInversion: true,
  enableGrain: true,
  grainIntensity: 0.02, // Less grain, cleaner look
  targetFPS: 60,
};

export type HexColor = `#${string}`;

export function hexToRGB(hex: string): RGB {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error(`Invalid hex color: ${hex}`);
  }
  return {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255,
  };
}

export function interpolateColor(color1: RGB, color2: RGB, t: number): RGB {
  return {
    r: color1.r + (color2.r - color1.r) * t,
    g: color1.g + (color2.g - color1.g) * t,
    b: color1.b + (color2.b - color1.b) * t,
  };
}
