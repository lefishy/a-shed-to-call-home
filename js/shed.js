var scene = new THREE.Scene();

var clearHue = THREE.Math.randInt(0,360);
scene.background = new THREE.Color("hsl("+clearHue+",25%,90%)");
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setSize(window.innerWidth/2,window.innerHeight/2,false);

document.body.appendChild(renderer.domElement);

var shed = new Stack();

scene.add(shed.group);

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

var shedWidth = THREE.Math.randInt(8,24);
if (shedWidth % 2 != 0) {
	shedWidth += 1;
}
var shedXOffset = modelWidth - shedWidth;
var shedXStart = shedXOffset / 2;
var shedXEnd = shedXStart + shedWidth;
var shedDepth = THREE.Math.randInt(8,24);
if (shedDepth % 2 != 0) {
	shedDepth += 1;
}
var shedYOffset = modelDepth - shedDepth;
var shedYStart = shedYOffset / 2;
var shedYEnd = shedYStart + shedDepth;

console.log(shedWidth+":"+shedDepth);

var model = new Array();
for (var z = 0; z < modelHeight; z++) {
	var yArr = new Array();
	for (var y = 0; y < modelDepth; y++) {
		var xArr = new Array();
		for (var x = 0; x < modelWidth; x++) {
			if ((x >= shedXStart && x <= shedXEnd && y >= shedYStart && y <= shedYEnd) && (x == shedXStart || x == shedXEnd || y == shedYStart || y == shedYEnd)
		) {
				xArr[x] = '#ff0000';
			} else if(z == 0){
				xArr[x] = '#ffffff';
			}else {
				xArr[x] = false;
			}
		}
		yArr.push(xArr);
	}
	model.push(yArr);
}

for(var z = 0; z < modelHeight; z++){
	shed.AddLayer(model[z]);
}

camera.position.z = 15;
camera.position.y = -18;

camera.rotation.x = 1;

function animate() {
	shed.group.rotation.z += 0.02;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
