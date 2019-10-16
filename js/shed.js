var scene = new THREE.Scene();

var clearHue = THREE.Math.randInt(0,360);
scene.background = new THREE.Color("hsl("+clearHue+",25%,90%)");
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

var shed = new THREE.Group();

scene.add(shed);

/*old shed generation

var groundGeo = new THREE.CircleGeometry(10,32);
var groundMat = new THREE.MeshBasicMaterial({color:0x00ff00});
var ground = new THREE.Mesh(groundGeo, groundMat);

shed.add(ground);

var shedGeo = new THREE.BoxGeometry(7,7,7);
var shedMat = new THREE.MeshBasicMaterial({color:0xf1f1f1});
var shedMesh = new THREE.Mesh(shedGeo,shedMat);
shedMesh.position.z = 3.5;

shed.add(shedMesh);

*/

//New spritestacking shed generation!

var numLayers = 32;

for(var i = 0; i < numLayers; i++){
	var canvas = document.createElement('canvas');
	canvas.width = 32;
	canvas.height = 32;
	var context = canvas.getContext('2d');
	context.fillStyle = '#ffffff';
	context.fillRect(4,4,24,24);
	var layerTex = new THREE.Texture(canvas);
	var layerMat = new THREE.MeshBasicMaterial({map:layerTex});
	var layerPlane = new THREE.PlaneGeometry(8,8);
	var layer = new THREE.Mesh(layerPlane,layerMat);
	layer.position.z = i*0.2;
	shed.add(layer);
}

camera.position.z = 15;
camera.position.y = -18;

camera.rotation.x = 1;

function animate() {
	shed.rotation.z += 0.02;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
