import * as THREE from 'three';

export const midpoint = ([x1, y1, z1]: number[], [x2, y2, z2]: number[]) => {
  return [(x1 + x2) / 2, (y1 + y2) / 2, (z1 + z2) / 2];
};

export const roundingVector = (
  vector: THREE.Vector3,
  fractionDigits: number = 0,
) => {
  return new THREE.Vector3(
    Number(vector.x.toFixed(fractionDigits)),
    Number(vector.y.toFixed(fractionDigits)),
    Number(vector.z.toFixed(fractionDigits)),
  );
};

export const areVectorsEqual = (
  vector1: THREE.Vector3,
  vector2: THREE.Vector3,
) => {
  if (
    Math.abs(vector1.x - vector2.x) > 2 ||
    Math.abs(vector1.y - vector2.y) > 2 ||
    Math.abs(vector1.z - vector2.z) > 2
  ) {
    return false;
  }
  return true;
};
