import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

import { midpoint, roundingVector, areVectorsEqual } from '@/utils';

// Init
// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#eeeeee');

// Camera
const camera = new THREE.OrthographicCamera(
  window.innerWidth / -7,
  window.innerWidth / 7,
  window.innerHeight / 7,
  window.innerHeight / -7,
  1,
  1000,
);
camera.position.set(100, 100, 100);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize((window.innerWidth / window.innerHeight) * 600, 600);

const initGeometry = () => {
  const geometryElement = document.querySelector('#geometry');

  if (geometryElement) {
    geometryElement.appendChild(renderer.domElement);
  }
};

// Re-render
const animate = () => {
  requestAnimationFrame(animate);

  camera.updateProjectionMatrix();
  scene.updateMatrixWorld();
  renderer.render(scene, camera);
};
animate();

// Control
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI; // giới hạn góc nghiêng của camera

// Light
const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

const spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.position.set(1000, 1000, 1000);
spotLight.castShadow = true;
scene.add(spotLight);
//------------------------------------- End init -------------------------------------

// Axis
const axisPoints = [
  [
    [-100, 0, 0],
    [100, 0, 0],
  ],
  [
    [0, -100, 0],
    [0, 100, 0],
  ],
  [
    [0, 0, -100],
    [0, 0, 100],
  ],
];
const drawAxis = (
  [x1, y1, z1]: number[],
  [x2, y2, z2]: number[],
  Color: THREE.ColorRepresentation = 0x000000,
  type: 'standard' | 'dashed' = 'standard',
) => {
  const point1 = new THREE.Vector3(x1, y1, z1);
  const point2 = new THREE.Vector3(x2, y2, z2);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    point1,
    point2,
  ]);
  const lineStandardMaterial = new THREE.MeshStandardMaterial({
    color: Color,
    depthWrite: false,
  });
  const lineDashedMaterial = new THREE.LineDashedMaterial({
    color: Color,
    dashSize: 3,
    gapSize: 2,
  });
  const lineStandard = new THREE.Line(lineGeometry, lineStandardMaterial);
  const lineDashed = new THREE.Line(lineGeometry, lineDashedMaterial);
  lineDashed.computeLineDistances();
  if (type === 'standard') {
    scene.add(lineStandard);
  } else {
    scene.add(lineDashed);
  }
};
// drawAxis(axisPoints[0][0], axisPoints[0][1], 0xff0000);
// drawAxis(axisPoints[1][0], axisPoints[1][1], 0x00ff00);
// drawAxis(axisPoints[2][0], axisPoints[2][1], 0x0000ff);
// ------------------------------------- End axis -------------------------------------

// Draw
const isDashedLine = (arr1: number[], arr2: number[]) => {
  // Raycaster
  const targetPoint = new THREE.Vector3(...midpoint(arr1, arr2));

  const raycaster = new THREE.Raycaster();
  raycaster.set(
    roundingVector(targetPoint, 5),
    roundingVector(camera.position),
  );

  const intersects = raycaster.intersectObjects(scene.children);
  const intersectFiltered = intersects.filter(
    (intersect) =>
      (intersect.object.type === 'Mesh' &&
        !areVectorsEqual(roundingVector(intersect.point), targetPoint)) ||
      (intersect.object.type === 'Line' &&
        areVectorsEqual(roundingVector(intersect.point), targetPoint)),
  );
  if (intersectFiltered[intersectFiltered.length - 1].object.type === 'Mesh') {
    return true;
  }
  return false;
};

const drawPoint = (
  [x, y, z]: number[],
  radius: number = 2,
  Color: THREE.ColorRepresentation = 0x000000,
) => {
  const geometry = new THREE.SphereGeometry(radius, 32, 16);
  const material = new THREE.MeshStandardMaterial({ color: Color });
  const sphere = new THREE.Mesh(geometry, material);
  sphere.position.copy(new THREE.Vector3(x, y, z));
  scene.add(sphere);
};

const drawStraightLine = (
  arr1: number[],
  arr2: number[],
  Color: THREE.ColorRepresentation = 0x000000,
) => {
  const point1 = new THREE.Vector3(...arr1);
  const point2 = new THREE.Vector3(...arr2);

  const lineGeometry = new THREE.BufferGeometry().setFromPoints([
    point1,
    point2,
  ]);
  const lineStandardMaterial = new THREE.LineBasicMaterial({
    color: Color,
    depthWrite: false,
  });
  const lineDashedMaterial = new THREE.LineDashedMaterial({
    color: Color,
    dashSize: 3,
    gapSize: 3,
  });
  const lineStandard = new THREE.Line(lineGeometry, lineStandardMaterial);
  const lineDashed = new THREE.Line(lineGeometry, lineDashedMaterial);
  lineDashed.computeLineDistances();
  scene.add(lineDashed);
  if (!isDashedLine(arr1, arr2)) {
    scene.add(lineStandard);
  } else {
    lineStandard.geometry.dispose();
    lineStandard.material.dispose();
  }
  drawPoint(arr1);
  drawPoint(arr2);
};
// ------------------------------------- End draw -------------------------------------

export {
  scene,
  camera,
  renderer,
  controls,
  initGeometry,
  drawPoint,
  drawStraightLine,
};
