declare module "vanta/dist/vanta.waves.min" {
  import type { Object3D, Mesh, Material } from "three";

  export interface VantaWavesInstance {
    destroy: () => void;
    resize: () => void;
    setOptions: (options: Record<string, unknown>) => void;
    plane?: Mesh & { material: Material };
    scene?: Object3D;
  }

  type VantaWavesFactory = (options: Record<string, unknown>) => VantaWavesInstance;

  const WAVES: VantaWavesFactory;
  export default WAVES;
}
