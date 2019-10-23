var scene = new THREE.Scene();

var clearHue = THREE.Math.randInt(0,360);
scene.background = new THREE.Color("hsl("+clearHue+",25%,90%)");
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.setSize(window.innerWidth/2,window.innerHeight/2,false);

document.body.appendChild(renderer.domElement);

var modelHeight = 64;
var modelWidth = 32;
var modelDepth = 32;

var shed = new Stack(modelWidth, modelDepth, modelHeight);

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

var lightBrown = '#bf520a';
var darkBrown = '#632e0a';

var shedHeight = THREE.Math.randInt(16,60);

var startXStyle = THREE.Math.randInt(0,2);
var endXStyle = THREE.Math.randInt(0,2);
var startYStyle = THREE.Math.randInt(0,2);
var endYStyle = THREE.Math.randInt(0,2);

var model = new Array();
for (var z = 0; z < modelHeight; z++) {
	var yArr = new Array();
	for (var y = 0; y < modelDepth; y++) {
		var xArr = new Array();
		for (var x = 0; x < modelWidth; x++) {
			if ((x >= shedXStart && x <= shedXEnd && y >= shedYStart && y <= shedYEnd) && (x == shedXStart || x == shedXEnd || y == shedYStart || y == shedYEnd) && z <= shedHeight
		) {
				xArr[x] = lightBrown;
				if(z % 5 == 0) {
					xArr[x] = darkBrown;
				}
			} else if(z == 0){
				xArr[x] = '#ffffff';
			} else {
				xArr[x] = false;
			}
		}
		yArr.push(xArr);
	}
	model.push(yArr);
}

//build the walls!

//shedXStart
/*for(var z = 0; z <= shedHeight; z++)
{
	for(var y = shedYStart; y <=shedYEnd; y ++)
	{
		
	}
}*/

//make doorrrr
var side = THREE.Math.randInt(1,4);

console.log(side);
switch(side) {
	case 1:
		var doorWidth = THREE.Math.randInt(4,shedWidth - 2);
		var doorHeight = THREE.Math.randInt(14, shedHeight - 2);
		var doorX = THREE.Math.randInt(shedXStart+2,shedXEnd-doorWidth-2);
		for(var x = doorX; x <= doorX + doorWidth; x ++)
		{
			for(var y = 1; y <= doorHeight; y++)
			{
				//console.log(x+":"+shedYStart+":"+y);
				model[y][shedYStart][x] = null;
				if(x == doorX || x == doorX + doorWidth || y == doorHeight) {
					model[y][shedYStart][x] = lightBrown;
				}
			}
		}
	break;
	case 2:
		var doorWidth = THREE.Math.randInt(4,shedWidth - 2);
		var doorHeight = THREE.Math.randInt(14, shedHeight - 2);
		var doorX = THREE.Math.randInt(shedXStart+2,shedXEnd-doorWidth-2);
		for(var x = doorX; x <= doorX + doorWidth; x ++)
		{
			for(var y = 1; y <= doorHeight; y++)
			{
				//console.log(x+":"+shedYStart+":"+y);
				model[y][shedYEnd][x] = null;
				if(x == doorX || x == doorX + doorWidth || y == doorHeight) {
					model[y][shedYEnd][x] = lightBrown;
				}
			}
		}
	break;
	case 3:
		var doorWidth = THREE.Math.randInt(4,shedDepth - 2);
		var doorHeight = THREE.Math.randInt(14, shedHeight - 2);
		var doorY = THREE.Math.randInt(shedYStart+2,shedYEnd-doorWidth-2);
		for(var x = doorY; x <= doorY + doorWidth; x ++)
		{
			for(var y = 1; y <= doorHeight; y++)
			{
				//console.log(x+":"+shedYStart+":"+y);
				model[y][x][shedXStart] = null;
				if(x == doorY || x == doorY + doorWidth || y == doorHeight) {
					model[y][x][shedXStart] = lightBrown;
				}
			}
		}
	break;
	case 4:
		var doorWidth = THREE.Math.randInt(4,shedDepth - 2);
		var doorHeight = THREE.Math.randInt(14, shedHeight - 2);
		var doorY = THREE.Math.randInt(shedYStart+2,shedYEnd-doorWidth-2);
		for(var x = doorY; x <= doorY + doorWidth; x ++)
		{
			for(var y = 1; y <= doorHeight; y++)
			{
				//console.log(x+":"+shedYStart+":"+y);
				model[y][x][shedXEnd] = null;
				if(x == doorY || x == doorY + doorWidth || y == doorHeight) {
					model[y][x][shedXEnd] = lightBrown;
				}
			}
		}
	break;
}

for(var z = 0; z < modelHeight; z++){
	shed.SetLayer(model[z], z);
}

shed.UpdateAll();

camera.position.z = 15;
camera.position.y = -18;

camera.rotation.x = 1;

function animate() {
	shed.group.rotation.z += 0.02;
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
}
animate();
