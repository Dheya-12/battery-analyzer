export interface Mesh {
  vertices: Float32Array;
  indices: Uint16Array;
  vertexCount: number;
  indexCount: number;
}

export function createFullScreenQuad(): Mesh {
  const vertices = new Float32Array([
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0,  1.0,
  ]);

  const indices = new Uint16Array([
    0, 1, 2,
    1, 3, 2,
  ]);

  return {
    vertices,
    indices,
    vertexCount: 4,
    indexCount: 6,
  };
}

export interface MeshBuffers {
  vertexBuffer: WebGLBuffer;
  indexBuffer: WebGLBuffer;
  indexCount: number;
}

export function createMeshBuffers(
  gl: WebGLRenderingContext,
  mesh: Mesh
): MeshBuffers | null {
  const vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.error('Failed to create vertex buffer');
    return null;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, mesh.vertices, gl.STATIC_DRAW);

  const indexBuffer = gl.createBuffer();
  if (!indexBuffer) {
    console.error('Failed to create index buffer');
    return null;
  }

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, mesh.indices, gl.STATIC_DRAW);

  return {
    vertexBuffer,
    indexBuffer,
    indexCount: mesh.indexCount,
  };
}

export function bindMeshBuffers(
  gl: WebGLRenderingContext,
  program: WebGLProgram,
  buffers: MeshBuffers
): void {
  gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexBuffer);

  const positionLocation = gl.getAttribLocation(program, 'a_position');

  if (positionLocation === -1) {
    console.warn('Could not find a_position attribute');
    return;
  }

  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indexBuffer);
}

export function renderMesh(
  gl: WebGLRenderingContext,
  indexCount: number
): void {
  gl.drawElements(gl.TRIANGLES, indexCount, gl.UNSIGNED_SHORT, 0);
}

export function getGradientMesh(): Mesh {
  return createFullScreenQuad();
}

export function deleteMeshBuffers(
  gl: WebGLRenderingContext,
  buffers: MeshBuffers
): void {
  gl.deleteBuffer(buffers.vertexBuffer);
  gl.deleteBuffer(buffers.indexBuffer);
}
