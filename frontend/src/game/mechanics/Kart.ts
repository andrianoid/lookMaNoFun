import * as THREE from 'three';

export interface KartControls {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

export class Kart {
  mesh: THREE.Object3D;
  private velocity: THREE.Vector3;
  private acceleration: THREE.Vector3;
  private readonly maxSpeed = 20;
  private readonly maxReverseSpeed = 10;
  private readonly accelerationRate = 15;
  private readonly brakeRate = 30;
  private readonly dragCoefficient = 2;
  private readonly turnSpeed = 2.5;
  private readonly gripFactor = 0.95;

  constructor() {
    // Create kart mesh
    const geometry = new THREE.BoxGeometry(1, 0.5, 2);
    const material = new THREE.MeshStandardMaterial({ color: 0x2194ce });
    const kartMesh = new THREE.Mesh(geometry, material);
    kartMesh.castShadow = true;
    this.mesh = kartMesh;

    this.velocity = new THREE.Vector3();
    this.acceleration = new THREE.Vector3();
  }

  update(deltaTime: number, controls: KartControls) {
    // Calculate forward direction
    const forward = new THREE.Vector3(
      Math.sin(this.mesh.rotation.y),
      0,
      Math.cos(this.mesh.rotation.y)
    );

    // Calculate right direction
    const right = new THREE.Vector3(
      Math.sin(this.mesh.rotation.y + Math.PI / 2),
      0,
      Math.cos(this.mesh.rotation.y + Math.PI / 2)
    );

    // Reset acceleration
    this.acceleration.set(0, 0, 0);

    // Apply acceleration based on input
    const currentSpeed = this.velocity.length();
    const forwardVelocity = this.velocity.dot(forward);

    if (controls.forward && forwardVelocity < this.maxSpeed) {
      this.acceleration.add(forward.multiplyScalar(this.accelerationRate));
    }
    if (controls.backward) {
      if (forwardVelocity > 0) {
        // Braking
        this.acceleration.add(forward.multiplyScalar(-this.brakeRate));
      } else if (forwardVelocity > -this.maxReverseSpeed) {
        // Reverse acceleration
        this.acceleration.add(forward.multiplyScalar(-this.accelerationRate * 0.5));
      }
    }

    // Apply turning (only if moving)
    if (currentSpeed > 0.1) {
      const turnMultiplier = Math.min(currentSpeed / 10, 1); // Gradual turn effectiveness
      if (controls.left) {
        this.mesh.rotation.y += this.turnSpeed * turnMultiplier * deltaTime;
      }
      if (controls.right) {
        this.mesh.rotation.y -= this.turnSpeed * turnMultiplier * deltaTime;
      }
    }

    // Apply drag (air resistance and rolling friction)
    const drag = this.velocity.clone().multiplyScalar(-this.dragCoefficient * currentSpeed);
    this.acceleration.add(drag);

    // Apply grip (lateral friction)
    const lateralVelocity = this.velocity.dot(right);
    const gripCorrection = right.multiplyScalar(-lateralVelocity * this.gripFactor);
    this.acceleration.add(gripCorrection);

    // Update velocity
    this.velocity.add(this.acceleration.multiplyScalar(deltaTime));

    // Update position
    this.mesh.position.add(this.velocity.clone().multiplyScalar(deltaTime));
  }

  reset() {
    this.mesh.position.set(0, 0.5, 0);
    this.mesh.rotation.set(0, 0, 0);
    this.velocity.set(0, 0, 0);
    this.acceleration.set(0, 0, 0);
  }

  getVelocity(): THREE.Vector3 {
    return this.velocity.clone();
  }
} 