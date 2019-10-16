var scene = new THREE.Scene();

var clearHue = THREE.Math.randInt(0,360);
scene.background = new THREE.Color("hsl("+clearHue+",25%,90%)");
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
//renderer.setSize(window.innerWidth/2,window.innerHeight/2,false);

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
var modelHeight = 64;
var modelWidth = 32;
var modelDepth = 32;
var model = new Array();
for (var z = 0; z < modelHeight; z++) {
	var yArr = new Array();
	for (var y = 0; y < modelDepth; y++) {
		var xArr = new Array();
		for (var x = 0; x < modelWidth; x++) {
			xArr.push(Math.random() > 0.3 ? false : true);
		}
		yArr.push(xArr);
	}
	model.push(yArr);
}

for(var z = 0; z < modelHeight; z++){
	var canvas = document.createElement('canvas');
	canvas.width = modelWidth;
	canvas.height = modelDepth;
	var context = canvas.getContext('2d');
	context.fillStyle = '#ffffff';
	for (var y = 0; y < modelDepth; y++) {
		for (var x = 0; x < modelWidth; x++) {
			if (model[z][y][x]) {
				context.fillRect(x,y,1,1);
			}
		}
	}
	var layerTex = new THREE.Texture(canvas);
	layerTex.needsUpdate = true;
	var layerMat = new THREE.MeshBasicMaterial({map:layerTex,transparent:true,opacity:1});
	var layerPlane = new THREE.PlaneGeometry(8,8);
	var layer = new THREE.Mesh(layerPlane,layerMat);
	layer.position.z = z*0.1;
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
