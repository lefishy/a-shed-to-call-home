var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var clearHue = THREE.Math.randInt(0,360);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setClearColor(new THREE.Color("hsl("+clearHue+",55%,80%)"), 1);

document.body.appendChild(renderer.domElement);

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();