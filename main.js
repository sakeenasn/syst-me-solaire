// --- SCÈNE, CAMÉRA, RENDU ---
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 500);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// --- LUMIÈRE ---
const sunlight = new THREE.PointLight(0xffffff, 2, 0);
sunlight.position.set(0, 0, 0);
scene.add(sunlight);

// --- CONTROLES ---
const controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 50);
controls.update();

// --- SOLEIL (sphère jaune) ---
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(5, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0xffff00 })
);
scene.add(sun);

// --- PLANÈTE (Terre simulée) ---
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(1, 32, 32),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
scene.add(earth);

// --- ANIMATION ---
function animate() {
  requestAnimationFrame(animate);

  // Rotation du Soleil
  sun.rotation.y += 0.01;

  // Mouvement simple de la planète autour du Soleil
  const time = Date.now() * 0.001;
  earth.position.x = Math.cos(time) * 15;
  earth.position.z = Math.sin(time) * 15;

  controls.update();
  renderer.render(scene, camera);
}
animate();

// --- ADAPTATION TAILLE ÉCRAN ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
