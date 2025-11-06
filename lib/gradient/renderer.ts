import type { GradientConfig, RendererState } from './types';
import { DEFAULT_CONFIG, hexToRGB } from './types';
import {
  vertexShaderSource,
  fragmentShaderSource,
  compileShader,
  createProgram,
} from './shaders';
import {
  getGradientMesh,
  createMeshBuffers,
  bindMeshBuffers,
  renderMesh,
  deleteMeshBuffers,
  type MeshBuffers,
} from './mesh';

export class GradientRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private meshBuffers: MeshBuffers | null = null;
  private config: GradientConfig;
  private state: RendererState;

  private uniforms: {
    time: WebGLUniformLocation | null;
    resolution: WebGLUniformLocation | null;
    cycleSpeed: WebGLUniformLocation | null;
    grainIntensity: WebGLUniformLocation | null;
    color1: WebGLUniformLocation | null;
    color2: WebGLUniformLocation | null;
    color3: WebGLUniformLocation | null;
    color4: WebGLUniformLocation | null;
    color5: WebGLUniformLocation | null;
    color6: WebGLUniformLocation | null;
  } = {
    time: null,
    resolution: null,
    cycleSpeed: null,
    grainIntensity: null,
    color1: null,
    color2: null,
    color3: null,
    color4: null,
    color5: null,
    color6: null,
  };

  constructor(canvas: HTMLCanvasElement, config: Partial<GradientConfig> = {}) {
    this.canvas = canvas;
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.state = {
      gl: null,
      canvas: null,
      program: null,
      animationFrameId: null,
      isRunning: false,
      startTime: 0,
    };
  }

  public initialize(): boolean {
    if (!this.canvas) {
      console.error('❌ Canvas element not found');
      return false;
    }

    this.gl = this.canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });

    if (!this.gl) {
      console.error('❌ WebGL not supported');
      return false;
    }

    const vertexShader = compileShader(
      this.gl,
      vertexShaderSource,
      this.gl.VERTEX_SHADER
    );

    const fragmentShader = compileShader(
      this.gl,
      fragmentShaderSource,
      this.gl.FRAGMENT_SHADER
    );

    if (!vertexShader || !fragmentShader) {
      console.error('❌ Failed to compile shaders');
      return false;
    }

    this.program = createProgram(this.gl, vertexShader, fragmentShader);

    if (!this.program) {
      console.error('❌ Failed to create shader program');
      return false;
    }

    this.gl.useProgram(this.program);
    this.cacheUniformLocations();

    const mesh = getGradientMesh();
    this.meshBuffers = createMeshBuffers(this.gl, mesh);

    if (!this.meshBuffers) {
      console.error('❌ Failed to create mesh buffers');
      return false;
    }

    bindMeshBuffers(this.gl, this.program, this.meshBuffers);
    this.resize();
    this.updateUniforms(0);

    return true;
  }

  private cacheUniformLocations(): void {
    if (!this.gl || !this.program) return;

    this.uniforms.time = this.gl.getUniformLocation(this.program, 'u_time');
    this.uniforms.resolution = this.gl.getUniformLocation(this.program, 'u_resolution');
    this.uniforms.cycleSpeed = this.gl.getUniformLocation(this.program, 'u_cycleSpeed');
    this.uniforms.grainIntensity = this.gl.getUniformLocation(this.program, 'u_grainIntensity');
    this.uniforms.color1 = this.gl.getUniformLocation(this.program, 'u_color1');
    this.uniforms.color2 = this.gl.getUniformLocation(this.program, 'u_color2');
    this.uniforms.color3 = this.gl.getUniformLocation(this.program, 'u_color3');
    this.uniforms.color4 = this.gl.getUniformLocation(this.program, 'u_color4');
    this.uniforms.color5 = this.gl.getUniformLocation(this.program, 'u_color5');
    this.uniforms.color6 = this.gl.getUniformLocation(this.program, 'u_color6');
  }

  private updateUniforms(time: number): void {
    if (!this.gl) return;

    if (this.uniforms.time) {
      this.gl.uniform1f(this.uniforms.time, time);
    }

    if (this.uniforms.resolution) {
      this.gl.uniform2f(
        this.uniforms.resolution,
        this.canvas.width,
        this.canvas.height
      );
    }

    if (this.uniforms.cycleSpeed) {
      this.gl.uniform1f(this.uniforms.cycleSpeed, this.config.cycleSpeed);
    }

    if (this.uniforms.grainIntensity) {
      this.gl.uniform1f(this.uniforms.grainIntensity, this.config.grainIntensity);
    }

    const colors = this.config.colors.map(hexToRGB);

    if (this.uniforms.color1 && colors[0]) {
      this.gl.uniform3f(this.uniforms.color1, colors[0].r, colors[0].g, colors[0].b);
    }
    if (this.uniforms.color2 && colors[1]) {
      this.gl.uniform3f(this.uniforms.color2, colors[1].r, colors[1].g, colors[1].b);
    }
    if (this.uniforms.color3 && colors[2]) {
      this.gl.uniform3f(this.uniforms.color3, colors[2].r, colors[2].g, colors[2].b);
    }
    if (this.uniforms.color4 && colors[3]) {
      this.gl.uniform3f(this.uniforms.color4, colors[3].r, colors[3].g, colors[3].b);
    }
    if (this.uniforms.color5 && colors[4]) {
      this.gl.uniform3f(this.uniforms.color5, colors[4].r, colors[4].g, colors[4].b);
    }
    if (this.uniforms.color6 && colors[5]) {
      this.gl.uniform3f(this.uniforms.color6, colors[5].r, colors[5].g, colors[5].b);
    }
  }

  public resize(): void {
    if (!this.gl) return;

    const displayWidth = this.canvas.clientWidth;
    const displayHeight = this.canvas.clientHeight;

    if (this.canvas.width !== displayWidth || this.canvas.height !== displayHeight) {
      this.canvas.width = displayWidth;
      this.canvas.height = displayHeight;
      this.gl.viewport(0, 0, displayWidth, displayHeight);
    }
  }

  private render = (time: number): void => {
    if (!this.gl || !this.meshBuffers || !this.state.isRunning) return;

    const currentTime = (time - this.state.startTime) * 0.001;

    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);

    this.updateUniforms(currentTime);
    renderMesh(this.gl, this.meshBuffers.indexCount);

    this.state.animationFrameId = requestAnimationFrame(this.render);
  };

  public start(): void {
    if (this.state.isRunning) return;

    this.state.isRunning = true;
    this.state.startTime = performance.now();
    this.state.animationFrameId = requestAnimationFrame(this.render);
  }

  public stop(): void {
    if (!this.state.isRunning) return;

    this.state.isRunning = false;

    if (this.state.animationFrameId !== null) {
      cancelAnimationFrame(this.state.animationFrameId);
      this.state.animationFrameId = null;
    }
  }

  public dispose(): void {
    this.stop();

    if (this.gl && this.meshBuffers) {
      deleteMeshBuffers(this.gl, this.meshBuffers);
      this.meshBuffers = null;
    }

    if (this.gl && this.program) {
      this.gl.deleteProgram(this.program);
      this.program = null;
    }

    const loseContext = this.gl?.getExtension('WEBGL_lose_context');
    if (loseContext) {
      loseContext.loseContext();
    }

    this.gl = null;
  }

  public isRunning(): boolean {
    return this.state.isRunning;
  }
}

export function createBatteryGradient(canvas: HTMLCanvasElement): GradientRenderer {
  return new GradientRenderer(canvas, DEFAULT_CONFIG);
}
