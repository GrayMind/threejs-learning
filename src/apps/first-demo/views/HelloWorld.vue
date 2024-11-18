<script setup>
import * as THREE from 'three';
import { onMounted, useTemplateRef } from 'vue';

const canvasRef = useTemplateRef('canvasRef');
// const cube = ref(null);

const initThree = () => {
  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
  });

  // 相机
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 5);
  camera.position.z = 2;

  // 场景
  const scene = new THREE.Scene();

  // 几何体
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // 材质
  const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  // 网格对象
  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  // 灯光
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);

  // 添加到场景中
  scene.add(boxMesh);
  scene.add(light);

  // 渲染
  renderer.render(scene, camera);

  const render = (time) => {
    boxMesh.rotation.x = time * 0.0005;
    boxMesh.rotation.y = time * 0.0005;
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
  <canvas ref="canvasRef" width="500" height="500"></canvas>
</template>

<style scoped></style>
