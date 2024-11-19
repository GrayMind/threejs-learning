<script setup>
import * as THREE from 'three';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { onMounted, useTemplateRef } from 'vue';

const canvasRef = useTemplateRef('canvasRef');
// const cube = ref(null);
// const makeInstance = (geometry, color, x) => {
//   const material = new THREE.MeshPhongMaterial({ color });
//   const cube = new THREE.Mesh(geometry, material);
//   cube.position.x = x;
//   return cube;
// };

const loader = new FontLoader();
const loadFont = (font) => {
  return new Promise((resolve, reject) => {
    loader.load(font, resolve, undefined, reject);
  });
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
  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 500;

  // 场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xaaaaaa);

  // 灯光
  const light = new THREE.DirectionalLight(0xffffff, 3);
  light.position.set(-1, 2, 4);
  scene.add(light);

  const light2 = new THREE.DirectionalLight(0xffffff, 3);
  light2.position.set(1, -2, -4);
  scene.add(light2);

  const objects = [];
  const spead = 1;
  const addObject = (x, y, obj) => {
    obj.position.x = x * spead;
    obj.position.y = y * spead;

    scene.add(obj);
    objects.push(obj);
  };

  const createMaterial = () => {
    const material = new THREE.MeshPhongMaterial({
      side: THREE.DoubleSide,
    });
    const hue = Math.random();
    const saturation = 1;
    const luminance = 0.5;
    material.color.setHSL(hue, saturation, luminance);
    return material;
  };

  const addSolidGeometry = (x, y, geometry) => {
    const mesh = new THREE.Mesh(geometry, createMaterial());
    addObject(x, y, mesh);
  };

  const createFont = async (text) => {
    const font = await loadFont(
      'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
    );
    const geometry = new TextGeometry(text, {
      font,
      size: 20,
      height: 5,
      deep: 0.5,
      curveSegments: 12,
      bevelEnabled: true,
      bevelThickness: 0.15,
      bevelSize: 0.3,
      bevelSegments: 5,
    });

    const mesh = new THREE.Mesh(geometry, createMaterial());
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(mesh.position).multiplyScalar(-1);

    const parent = new THREE.Object3D();
    parent.add(mesh);

    addObject(2, -2, parent);

    return parent;
  };

  addSolidGeometry(-2, -2, new THREE.BoxGeometry(8, 8, 8));
  createFont('Hello World');

  // 渲染
  renderer.render(scene, camera);

  const render = (time) => {
    // 窗口变化,调整比例，否则会变形
    if (resizeRendererToDisaplaySize(renderer)) {
      const canvasDom = renderer.domElement;
      camera.aspect = canvasDom.clientWidth / canvasDom.clientHeight;
      camera.updateProjectionMatrix();
    }

    objects.forEach((cube) => {
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
