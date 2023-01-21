import './style.css'

import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 100);
camera.position.z = 20

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(2);
renderer.setSize(size.width, size.height);

renderer.render(scene, camera)

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.enablePan = false
controls.enableZoom = false

const light = new THREE.PointLight(0xffffff);
const ambient = new THREE.AmbientLight(0x111111)
light.position.set(0, 10, 10);
scene.add(light, ambient)

// Background

const spaceTexture = new THREE.TextureLoader().load('space.jpg');
scene.background = spaceTexture;

// earth
const earthTexture = new THREE.TextureLoader().load('earth.jpg');
const earthnormal = new THREE.TextureLoader().load('earthnormal.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 64, 64),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthnormal
  }),
)
scene.add(earth)

// function addStar() {
//   const geometry = new THREE.SphereGeometry(0.05, 24, 24);
//   const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
//   const star = new THREE.Mesh(geometry, material);

//   const [x, y, z] = Array(100)
//     .fill()
//     .map(() => THREE.MathUtils.randFloatSpread(100));

//   star.position.set(x, y, z);
//   scene.add(star);
// }

// Array(2500).fill().forEach(addStar);


window.addEventListener("resize", () => {
  size.width = window.innerWidth
  size.height = window.innerHeight

  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width, size.height)
})


function animate() {
  requestAnimationFrame(animate);

  earth.rotation.y += 0.002;

  controls.update();

  renderer.render(scene, camera);
}

animate();