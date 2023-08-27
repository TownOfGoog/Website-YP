const three = new Threestrap.Bootstrap();

// Create a scene
const scene = three.scene;

// Create a camera
const camera = three.camera;
camera.position.set(1, 1, 2);
camera.lookAt(new THREE.Vector3(0, 0, 0));



// Define camera limits
const maxCameraY = 1; // Maximum camera Y position
const minCameraY = -5; // Minimum camera Y position

const scrollContainer = document.querySelector('.scroll-container');
const roundedRectangle = document.querySelector('.rounded-rectangle');

// Append the rounded rectangle to the scroll container
scrollContainer.appendChild(roundedRectangle);


// Create a cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);


// Add the cube to the scene
scene.add(cube);
scene.background = new THREE.Color(0x000033); // Dark blue color

const numSpheres = 310;
const spheres = []; // Create an array to store the spheres

for (let i = 0; i < numSpheres; i++) {
  const sphereGeometry = new THREE.SphereGeometry(0.02, 32, 32);
  const sphereMaterial = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff });
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  const sphereX = (Math.random() * 2 - 1) * 4; // Larger spread in x-coordinate
  const sphereY = (Math.random() * 2 - 1) * 6; // Larger spread in y-coordinate
  const sphereZ = (Math.random() * 2 - 1) * 4; // Larger spread in z-coordinate

  sphere.position.set(sphereX, sphereY, sphereZ);

  // Parent the sphere to the cube
  cube.add(sphere);

  spheres.push(sphere); // Store the sphere in the array
}



const rotateSpeedBase = 0.002; // Base rotation speed
const rotateSpeedMultiplier = 22; // Multiplier to adjust rotation speed

// Create a mesh for the 3D text
// Event listener for scrolling
function handleScroll(deltaY) {
  camera.position.y -= deltaY * 0.1; // Adjust the scrolling speed as needed
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // Clamp camera Y position within limits
  camera.position.y = Math.max(minCameraY, Math.min(maxCameraY, camera.position.y));
}



// Touch events
let touchStartY = 0;

window.addEventListener('touchstart', event => {
  touchStartY = event.touches[0].clientY;
});

window.addEventListener('touchmove', event => {
  event.preventDefault(); // Prevent default touch behavior
  const touchCurrentY = event.touches[0].clientY;
  const deltaY = (touchCurrentY - touchStartY) * 0.1; // Adjust the scrolling speed as needed
  touchStartY = touchCurrentY;
  handleScroll(deltaY);
});

// Event listener for scrolling
window.addEventListener('wheel', event => {
  const deltaY = event.deltaY;
  if (deltaY > 0) {
    // Scrolling down
    camera.position.y -= 0.1;
    cube.rotation.y += rotateSpeedBase * rotateSpeedMultiplier;
  } else {
    // Scrolling up
    camera.position.y += 0.1;
    cube.rotation.y -= rotateSpeedBase * rotateSpeedMultiplier;
  }
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  // Move the camera up or down based on scroll direction


  // Clamp camera Y position within limits
  camera.position.y = Math.max(minCameraY, Math.min(maxCameraY, camera.position.y));
});

// Animation function
const animate = () => {
  requestAnimationFrame(animate);

  // Rotate the cube
  cube.rotation.y += 0.002;

  // Rotate the spheres along the z-axis only
  spheres.forEach(sphere => {
    sphere.rotation.z += 0.01; // Only rotation around the z-axis
  });

  // Render the scene with the updated camera and objects
  three.render();
};

// Start the animation
animate();
