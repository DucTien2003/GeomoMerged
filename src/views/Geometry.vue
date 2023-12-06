<template>
  <div id="geometry" @click="clickSc()"></div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import * as THREE from 'three';
import {
  scene,
  // camera,
  initGeometry,
  drawStraightLine,
} from './geometry/geometry';

onMounted(() => {
  initGeometry();
});

const clickSc = () => {
  for (let i = 0; i < scene.children.length; i++) {
    if (scene.children[i].type === 'Line') {
      scene.remove(scene.children[i]);
    }
  }
  data.links.map((link) => {
    drawStraightLine(data.points[link[0]], data.points[link[1]]);
  });
};

const data = reactive({
  points: [
    [0, 70, 0],
    [50, 0, 20],
    [40, 0, -30],
    [-10, 0, -50],
    [-30, 0, 30],
  ],
  links: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [2, 3],
    [3, 4],
    [4, 1],
  ],
  planes: [
    [0, 1, 2],
    [0, 2, 3],
    [0, 3, 4],
    [0, 4, 1],
    [1, 2, 3, 4],
  ],
});

// Functions
// BufferGeometry
const indices = data.planes
  .map((plane) => {
    if (plane.length === 3) {
      return plane.map((i) => i);
    } else {
      const arr = [];
      for (let ind = 0; ind < plane.length - 2; ind++) {
        arr.push(plane[0], plane[ind + 1], plane[ind + 2]);
      }
      return arr.flat();
    }
  })
  .flat()
  .flat();

const geometry = new THREE.BufferGeometry();
geometry.setIndex(indices);
geometry.setAttribute(
  'position',
  new THREE.BufferAttribute(new Float32Array(data.points.flat()), 3),
);

const mesh = new THREE.Mesh(
  geometry,
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
    opacity: 0.1,
    transparent: true,
  }),
);

// Add mesh to the scene
scene.add(mesh);
data.links.map((link) => {
  drawStraightLine(data.points[link[0]], data.points[link[1]]);
});
</script>

<style lang="scss" scoped></style>
