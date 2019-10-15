var scene = new THREE.Scene();

var clearHue = THREE.Math.randInt(0,360);
scene.background = new THREE.Color("hsl("+clearHue+",25%,80%)");
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
