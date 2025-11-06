export const vertexShaderSource = `
  attribute vec2 a_position;

  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

export const fragmentShaderSource = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;
  uniform float u_cycleSpeed;
  uniform float u_grainIntensity;

  uniform vec3 u_color1;
  uniform vec3 u_color2;
  uniform vec3 u_color3;
  uniform vec3 u_color4;
  uniform vec3 u_color5;
  uniform vec3 u_color6;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 st, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;

    for (int i = 0; i < 8; i++) {
      if (i >= octaves) break;
      value += amplitude * noise(st * frequency);
      frequency *= 2.0;
      amplitude *= 0.5;
    }

    return value;
  }

  vec3 blendColors(float t) {
    float normalizedTime = mod(t, 1.0);
    float colorCount = 6.0;
    float colorIndex = normalizedTime * colorCount;
    float colorT = fract(colorIndex);
    int index = int(floor(colorIndex));

    vec3 color;

    if (index == 0) {
      color = mix(u_color1, u_color2, colorT);
    } else if (index == 1) {
      color = mix(u_color2, u_color3, colorT);
    } else if (index == 2) {
      color = mix(u_color3, u_color4, colorT);
    } else if (index == 3) {
      color = mix(u_color4, u_color5, colorT);
    } else if (index == 4) {
      color = mix(u_color5, u_color6, colorT);
    } else {
      color = mix(u_color6, u_color1, colorT);
    }

    return color;
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    vec2 st = uv;
    st.x *= u_resolution.x / u_resolution.y;

    float slowTime = u_time / u_cycleSpeed;
    float mediumTime = slowTime * 1.3;
    float fastTime = slowTime * 2.5;

    // Slower, more subtle movements for industrial feel
    float pourHeight = (1.0 - st.y) + sin(slowTime * 1.2) * 0.25;
    float pourVariation = sin(st.x * 6.0 + slowTime * 1.5) * 0.12;
    float paintPour = pourHeight + pourVariation;

    float dripLeft = (1.0 - st.y) + sin(slowTime * 1.8 + st.x * 2.0) * 0.3;
    float dripRight = (1.0 - st.y) + cos(slowTime * 1.4 + st.x * 3.0) * 0.28;

    float spread = st.x + sin((1.0 - st.y) * 5.0 + slowTime * 2.0) * 0.35;
    float riseUp = st.y + sin(slowTime * 1.5 + st.x * 4.0) * 0.3;

    vec2 mixCoord = st + vec2(sin(slowTime * 1.6), cos(slowTime * 1.4)) * 0.18;
    float mixing = fbm(mixCoord * 2.5, 3) * 0.4;

    float swirl = atan(st.y - 0.5, st.x - 0.5) + slowTime * 1.0;
    float swirlMix = sin(swirl * 3.5) * 0.2;

    // Subtle breathing effect
    vec2 noiseCoord1 = st * 1.8 + vec2(slowTime * 0.3, slowTime * 0.25);
    float breathing1 = fbm(noiseCoord1, 3) * 0.2;

    vec2 noiseCoord2 = st * 2.2 + vec2(mediumTime * 0.25, mediumTime * 0.3);
    float breathing2 = fbm(noiseCoord2, 2) * 0.12;

    float breathing = breathing1 + breathing2;

    float gradientPosition =
      paintPour * 0.4 +
      dripLeft * 0.12 +
      dripRight * 0.1 +
      spread * 0.1 +
      riseUp * 0.08 +
      mixing * 0.08 +
      swirlMix * 0.05 +
      breathing * 0.17;

    gradientPosition = fract(gradientPosition + slowTime * 0.1);

    vec3 finalColor = blendColors(gradientPosition);

    // Subtle grain
    float grain = random(uv * 100.0 + u_time * 0.01) * u_grainIntensity;
    finalColor += vec3(grain);

    // Softer glows for industrial feel
    vec2 glowCenter1 = vec2(0.5 + sin(slowTime * 0.8) * 0.3, 0.7 + cos(slowTime * 0.6) * 0.2);
    float glow1 = 1.0 - smoothstep(0.0, 1.3, distance(uv, glowCenter1));

    vec2 glowCenter2 = vec2(0.5 + sin(slowTime * 1.1) * 0.25, 0.3 + cos(slowTime * 0.9) * 0.18);
    float glow2 = 1.0 - smoothstep(0.0, 1.5, distance(uv, glowCenter2));

    float radialGlow = (glow1 * 0.08 + glow2 * 0.06);
    finalColor += vec3(radialGlow);

    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export function compileShader(
  gl: WebGLRenderingContext,
  source: string,
  type: number
): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) {
    console.error('Failed to create shader');
    return null;
  }

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const error = gl.getShaderInfoLog(shader);
    const shaderType = type === gl.VERTEX_SHADER ? 'VERTEX' : 'FRAGMENT';
    console.error(`${shaderType} Shader compilation error:`, error || 'Unknown error');
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function createProgram(
  gl: WebGLRenderingContext,
  vertexShader: WebGLShader,
  fragmentShader: WebGLShader
): WebGLProgram | null {
  const program = gl.createProgram();
  if (!program) {
    console.error('Failed to create program');
    return null;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('Program linking error:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }

  return program;
}
