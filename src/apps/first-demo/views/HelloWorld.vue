<script setup>
import * as THREE from 'three';
import { onMounted, useTemplateRef } from 'vue';

const canvasRef = useTemplateRef('canvasRef');
// const cube = ref(null);

const makeInstance = (geometry, color, x) => {
  const material = new THREE.MeshPhongMaterial({ color });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.x = x;
  return cube;
};

const resizeRendererToDisaplaySize = (renderer) => {
  // clientWidth 和 clientHeight 为显示尺寸
  // width 和 height 为缓冲区尺寸
  const canvasDom = renderer.domElement;
  const pixelRatio = window.devicePixelRatio;
  // console.log('pixelRatio', pixelRatio);
  const width = Math.floor(canvasDom.clientWidth * pixelRatio);
  const height = Math.floor(canvasDom.clientHeight * pixelRatio);
  const needResize = width !== canvasDom.width || height !== canvasDom.height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
};

const initThree = () => {
  // 渲染器
  const renderer = new THREE.WebGLRenderer({
    canvas: canvasRef.value,
    antialias: true,
  });

  // 相机
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5);
  camera.position.z = 4;

  // 场景
  const scene = new THREE.Scene();

  // 几何体
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  // // 材质
  // const boxMaterial = new THREE.MeshPhongMaterial({ color: 0x44aa88 });
  // // 网格对象
  // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);

  const cubes = [
    makeInstance(boxGeometry, 0x44aa88, 0),
    makeInstance(boxGeometry, 0x8844aa, -2),
    makeInstance(boxGeometry, 0xaa8844, 2),
  ];

  // 灯光
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);

  // 添加到场景中
  // scene.add(boxMesh);
  cubes.forEach((cube) => scene.add(cube));
  scene.add(light);

  // 渲染
  renderer.render(scene, camera);

  const render = (time) => {
    // boxMesh.rotation.x = time * 0.0005;
    // boxMesh.rotation.y = time * 0.0005;

    // 窗口变化,调整比例，否则会变形
    if (resizeRendererToDisaplaySize(renderer)) {
      const canvasDom = renderer.domElement;
      camera.aspect = canvasDom.clientWidth / canvasDom.clientHeight;
      camera.updateProjectionMatrix();
    }

    cubes.forEach((cube) => {
      cube.rotation.x = time * 0.0005;
      cube.rotation.y = time * 0.0005;
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
