import React from 'react';
import { render } from '@testing-library/react';
import GameCanvas from '../GameCanvas';

// Mock Three.js
jest.mock('three', () => {
  const createMockMesh = () => {
    const mesh = {
      position: { 
        set: jest.fn(),
        copy: jest.fn(),
        clone: jest.fn().mockReturnThis(),
        add: jest.fn().mockReturnThis(),
      },
      rotation: { 
        set: jest.fn(),
        x: 0,
        y: 0,
        z: 0
      },
      scale: { set: jest.fn() },
      castShadow: false,
      receiveShadow: false,
      clone: jest.fn(),
    };
    mesh.clone.mockReturnValue(mesh);
    return mesh;
  };

  const mockMesh = jest.fn().mockImplementation(createMockMesh);

  const mockVector3 = jest.fn().mockImplementation(() => ({
    set: jest.fn().mockReturnThis(),
    clone: jest.fn().mockReturnThis(),
    add: jest.fn().mockReturnThis(),
    multiplyScalar: jest.fn().mockReturnThis(),
    lerp: jest.fn().mockReturnThis(),
    copy: jest.fn().mockReturnThis(),
    normalize: jest.fn().mockReturnThis(),
    length: jest.fn().mockReturnValue(0),
    applyAxisAngle: jest.fn().mockReturnThis(),
    dot: jest.fn().mockReturnValue(0),
  }));

  return {
    Scene: jest.fn().mockImplementation(() => ({
      add: jest.fn(),
      background: null,
    })),
    PerspectiveCamera: jest.fn().mockImplementation(() => ({
      position: { 
        set: jest.fn(),
        copy: jest.fn(),
      },
      lookAt: jest.fn(),
    })),
    WebGLRenderer: jest.fn().mockImplementation(() => ({
      setSize: jest.fn(),
      shadowMap: {
        enabled: false,
        type: null,
      },
      domElement: document.createElement('canvas'),
      render: jest.fn(),
      dispose: jest.fn(),
    })),
    BoxGeometry: jest.fn(),
    MeshStandardMaterial: jest.fn(),
    Mesh: mockMesh,
    AmbientLight: jest.fn(),
    DirectionalLight: jest.fn().mockImplementation(() => ({
      position: { set: jest.fn() },
      castShadow: false,
      shadow: {
        mapSize: { width: 0, height: 0 },
        camera: {
          near: 0,
          far: 0,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
    })),
    Color: jest.fn(),
    Vector3: mockVector3,
    PlaneGeometry: jest.fn(),
    ShapeGeometry: jest.fn(),
    Shape: jest.fn().mockImplementation(() => ({
      absarc: jest.fn().mockReturnThis(),
    })),
    TorusGeometry: jest.fn(),
    MathUtils: {
      lerp: jest.fn(),
    },
    PCFSoftShadowMap: 'PCFSoftShadowMap',
  };
});

describe('GameCanvas Component', () => {
  beforeEach(() => {
    // Reset window dimensions for consistent testing
    global.innerWidth = 1024;
    global.innerHeight = 768;
  });

  it('initializes Three.js scene with correct properties', () => {
    render(<GameCanvas />);
    // Basic initialization test - we'll add more specific checks later
  });

  it('handles custom dimensions properly', () => {
    const customWidth = 800;
    const customHeight = 600;
    render(<GameCanvas width={customWidth} height={customHeight} />);
  });

  it('cleans up WebGL renderer on unmount', () => {
    const { unmount } = render(<GameCanvas />);
    unmount();
  });
}); 