import { KartControls } from './Kart';

export class KartController {
  private controls: KartControls = {
    forward: false,
    backward: false,
    left: false,
    right: false
  };

  private keyMap: { [key: string]: keyof KartControls } = {
    'ArrowUp': 'forward',
    'ArrowDown': 'backward',
    'ArrowLeft': 'left',
    'ArrowRight': 'right',
    'w': 'forward',
    's': 'backward',
    'a': 'left',
    'd': 'right'
  };

  constructor() {
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const control = this.keyMap[event.key];
    if (control) {
      this.controls[control] = true;
    }
  };

  private handleKeyUp = (event: KeyboardEvent) => {
    const control = this.keyMap[event.key];
    if (control) {
      this.controls[control] = false;
    }
  };

  getControls(): KartControls {
    return { ...this.controls };
  }

  dispose() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
} 