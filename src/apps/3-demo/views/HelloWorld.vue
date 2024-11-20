<script setup>
import * as THREE from 'three';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { onMounted, useTemplateRef } from 'vue';
import AxisGridHelper from '../../../utils/AxisGridHelper';

const canvasRef = useTemplateRef('canvasRef');

const resizeRendererToDisaplaySize = (renderer) => {
  // clientWidth 和 clientHeight 为显示尺寸
  // width 和 height 为缓冲区尺寸
  const canvasDom = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  const width = Math.floor(canvasDom.clientWidth * pixelRatio);
  const height = Math.floor(canvasDom.clientHeight * pixelRatio);
  const needResize = width !== canvasDom.width || height !== canvasDom.height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

const initThree = () => {
  const gui = new GUI();

  const makeAxisGrid = (node, label, unit) => {
    const helper = new AxisGridHelper(node, unit);
    gui.add(helper, 'visible').name(label);
  };

  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
  });

  // 相机
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 50, 0);
  camera.up.set(0, 0, 1);
  camera.lookAt(0, 0, 0);

  // 场景
  const scene = new THREE.Scene();

  // 灯光
  const light = new THREE.PointLight(0xffffff, 500);
  scene.add(light);

  // 对象数组
  const objects = [];

  // 球体
  const radius = 1;
  const widthSegments = 6;
  const heightSegments = 6;
  const sphereGeometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);

  // 太阳轨道
  const solarSystem = new THREE.Object3D();
  scene.add(solarSystem);
  objects.push(solarSystem);

  // 太阳
  const sunMaterial = new THREE.MeshPhongMaterial({
    emissive: 0xffff00,
  });
  const sunMesh = new THREE.Mesh(sphereGeometry, sunMaterial);
  sunMesh.scale.set(5, 5, 5);
  // scene.add(sunMesh);
  solarSystem.add(sunMesh);
  objects.push(sunMesh);

  // 地球轨道
  const earthOrbit = new THREE.Object3D();
  earthOrbit.position.x = 10;
  solarSystem.add(earthOrbit);
  objects.push(earthOrbit);

  // 地球
  const earthMaterial = new THREE.MeshPhongMaterial({
    color: 0x2233ff,
    emissive: 0x112244,
  });
  const earthMesh = new THREE.Mesh(sphereGeometry, earthMaterial);
  earthMesh.scale.set(1, 1, 1);
  earthOrbit.add(earthMesh);
  objects.push(earthMesh);

  // 月球轨道
  const moonOrbit = new THREE.Object3D();
  moonOrbit.position.x = 2;
  earthOrbit.add(moonOrbit);
  objects.push(moonOrbit);

  // 月球
  const moonMaterial = new THREE.MeshPhongMaterial({
    color: 0x888888,
    emissive: 0x222222,
  });
  const moonMesh = new THREE.Mesh(sphereGeometry, moonMaterial);
  moonMesh.scale.set(0.5, 0.5, 0.5);
  moonOrbit.add(moonMesh);

  makeAxisGrid(solarSystem, 'solarSystem', 25);
  makeAxisGrid(sunMesh, 'sunMesh');
  makeAxisGrid(earthOrbit, 'earthOrbit');
  makeAxisGrid(earthMesh, 'earthMesh');
  makeAxisGrid(moonOrbit, 'moonOrbit');
  makeAxisGrid(moonMesh, 'moonMesh');

  // 渲染
  renderer.render(scene, camera);

  const render = (time) => {
    // 窗口变化,调整比例，否则会变形
    if (resizeRendererToDisaplaySize(renderer)) {
      const canvasDom = renderer.domElement;
      camera.aspect = canvasDom.clientWidth / canvasDom.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((obj) => {
      obj.rotation.y = time * 0.0004;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  };
  requestAnimationFrame(render);
};

onMounted(() => {
  initThree();
});
</script>

<template>
  <canvas class="canvas" ref="canvasRef"></canvas>
</template>

<style scoped>
html,
body {
  margin: 0;
  height: 100%;
}

.canvas {
  width: 100%;
  height: 100%;
}
</style>
