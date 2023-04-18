import OrbitControls from "./OrbitControls.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  100,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);
const canvas = document.querySelector("#bg");

const outerRadius = 10;
const innerRadius = 6;
const tubeSegments = 16;
const radialSegments = 100;

const textureLoader = new THREE.TextureLoader();
const donutTexture = textureLoader.load("gavanize.jpg");
const ringpic = new THREE.TextureLoader().load("ring.jpg");
const material = new THREE.MeshStandardMaterial({
  map : ringpic
});

const geometry = new THREE.TorusGeometry(
  outerRadius,
  3,
  tubeSegments,
  radialSegments,
  Math.PI * 2
);
const torus = new THREE.Mesh(geometry, material);
scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(-24, 30, 42);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);
const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(2000, 50);

// scene.add(lightHelper, gridHelper);
const control = new OrbitControls(camera, renderer.domElement, false);
control.enablePan = false;
renderer.domElement.addEventListener("click", (event) => {
  // code to handle click event
});

function addstar() {
  const geometry = new THREE.SphereGeometry(0.3, 5, 2);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);
  star.raycast = true;
  //   raycaster.params.Points.threshold = 0.1;
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(300));
  star.position.set(x, y, z);
  scene.add(star);
}
Array(2000).fill().forEach(addstar);


// Add an event listener to the button


const spaceTexture = new THREE.TextureLoader().load("r.jpg");
scene.background = spaceTexture;

const wifepic = new THREE.TextureLoader().load("121.jpg");
const gavanize = new THREE.TextureLoader().load("gavanize.jpg");
const space1 = new THREE.TextureLoader().load("space1.jpg");
const space2 = new THREE.TextureLoader().load("space2.jpg");
const space3 = new THREE.TextureLoader().load("space3.jpg");
const space4 = new THREE.TextureLoader().load("space4.jpg");
const space5 = new THREE.TextureLoader().load("space5.jpg");
const doompic = new THREE.TextureLoader().load("DOOM.jpg");


const changeScene1 = document.querySelector("#cc");
changeScene1.addEventListener("click", () => {
  scene.background = wifepic;
  
});

const changeScene2 = document.querySelector("#ccc");
changeScene2.addEventListener("click", () => {
  scene.background = space1;
});

const changeScene3 = document.querySelector("#cccc");
changeScene3.addEventListener("click", () => {
  scene.background = space2;
});

const changeScene4 = document.querySelector("#ccccc");
changeScene4.addEventListener("click", () => {
  scene.background = space3;
});
const changeScene5 = document.querySelector("#cccccc");
changeScene5.addEventListener("click", () => {
  scene.background = space4;
});
const changeScene6 = document.querySelector("#ccccccc");
changeScene6.addEventListener("click", () => {
  scene.background = space5;
});

















// scene.background = wifepic;
const gav = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshStandardMaterial({ map: gavanize })
);
scene.add(gav);

let moon = new THREE.Mesh(
  new THREE.SphereGeometry(4, 32, 32),
  new THREE.MeshStandardMaterial({ map: gavanize })
);
moon.position.set(20, 0, 0);
scene.add(moon);


let doom = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshStandardMaterial({ map: doompic })
  );
  doom.position.set(80, 0, 0);
  scene.add(doom);





const wife = new THREE.Mesh(
  new THREE.SphereGeometry(2, 16, 16),
  new THREE.MeshStandardMaterial({ map: wifepic })
);

wife.position.set(-10, 1, 1);
scene.add(wife);

moon.position.z = 30;
moon.position.setX(-10);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.5;
  moon.rotation.y += 0.75;
  moon.rotation.z += 0.5;
  torus.rotation.x += 0.5;
  torus.rotation.y += 0.75;
  torus.rotation.z += 0.5;
  gav.rotation.x += 0.5;
  gav.rotation.z += 0.5;
  gav.rotation.y += 0.75;
  camera.rotation.x = t * -0.1;
  camera.rotation.z = t * -0.2;
  camera.rotation.y = t * -0.75;
}

document.body.onscroll = moveCamera;

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.01;
  torus.rotation.z += 0.01;
  gav.rotation.x += 0.01;
  gav.rotation.y += 0.005;
  gav.rotation.z += 0.01;

  // Move the moon around the gav mesh
  const moonRadius = 30; // Radius of the circular path
  const moonSpeed = 0.0002; // Speed of the moon's movement
  const moonAngle = Date.now() * moonSpeed; // Calculate angle based on time
  const moonX = Math.cos(moonAngle) * moonRadius; // Calculate x position
  const moonZ = Math.sin(moonAngle) * moonRadius; // Calculate z position
  moon.position.set(moonX, 0, moonZ); // Set the position of the moon

  // Move the wife around the moon
  const wifeRadius = 10; // Radius of the circular path
  const wifeSpeed = 0.0005; // Speed of the wife's movement
  const wifeAngle = Date.now() * wifeSpeed; // Calculate angle based on time
  const wifeX = Math.cos(wifeAngle) * wifeRadius + moonX; // Calculate x position with respect to moon
  const wifeZ = Math.sin(wifeAngle) * wifeRadius + moonZ; // Calculate z position with respect to moon
  wife.position.set(wifeX, 0, wifeZ); // Set the position of the wife
  
  const doomRadius = 60; // Radius of the circular path
  const doomSpeed = 0.0005; // Speed of the wife's movement
  const doomAngle = Date.now() * doomSpeed; 
  const doomX = Math.cos(doomAngle) * doomRadius ;
  const doomZ = Math.sin(doomAngle) * doomRadius
  const doomY = Math.tan(doomAngle) * doomRadius  ;
  doom.position.set(doomX, doomY, doomZ); 
   






  // Rotate the moon and wife
  moon.rotation.x += 0.001;
  wife.rotation.x += 0.001;
  doom.rotation.x += 0.001;
  doom.rotation.x += 0.001;
  doom.rotation.x += 0.001;





  // Update the orbit control again
  control.update();
  // Render the scene again
  renderer.render(scene, camera);
}

animate();

const changeColor = document.querySelector("#changeColor");
const p = document.querySelectorAll("p");

changeColor.addEventListener("click", () => {
  explode(moon);
//   const firstP = p[0];
//   if (firstP.style.backgroundColor === "blue") {
//     p.forEach((element) => {
//       element.style.backgroundColor = "";
//     });
//   } else {
//     p.forEach((element) => {
//       element.style.backgroundColor = "blue";
//     });
//   }
});
// Assuming you have already created the scene, camera, and renderer objects

// Set the initial camera position and zoom level
const pewpew2 = document.querySelector("#ff");
pewpew2.addEventListener("click", () => {
  explode(gav);
});

const pewpew3 = document.querySelector("#dd");
pewpew3.addEventListener("click", () => {
  explode(wife);
});

const pewpew4 = document.querySelector("#ee");
pewpew4.addEventListener("click", () => {
  explode(torus);
});


function explode(object) {
  const particles = new THREE.Group();

  for (let i = 0; i < 50; i++) {
    const geometry = new THREE.SphereGeometry(1, 50, 22);
    const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const particle = new THREE.Mesh(geometry, material);

    particle.position.copy(object.position);

    const velocity = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1)
    );
    particle.velocity = velocity;

    particles.add(particle);
  }

  scene.add(particles);

  const removeParticles = () => {
    scene.remove(particles);
    particles.traverse((object) => {
      if (object.geometry) object.geometry.dispose();
      if (object.material) object.material.dispose();
    });
  };

  const animateParticles = () => {
    particles.children.forEach((particle) => {
      particle.position.add(particle.velocity);
    });
  };

  const animation = () => {
    animateParticles();
    renderer.render(scene, camera);
    requestAnimationFrame(animation);
  };

  setTimeout(() => {
    removeParticles();
    cancelAnimationFrame(animation);
  }, 10000);

  scene.remove(object);

  animation();
}




// Show the intro for 5 seconds
const intro = document.querySelector('.intro');
setTimeout(() => {
    const intro = document.querySelector('.intro');
    intro.style.display = 'none';
  }, 5000);
  