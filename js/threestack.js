//Lets try to make our spritestack stuff more generic!
function Stack(width = 64,depth = 64,height = 64){
	this.group = new THREE.Group();
	
	this.add = function(thing){
		this.group.add(thing);
	}
	
	this.AddLayer = function(layer){
		var modelWidth = layer[0].length;
		var modelDepth = layer.length;
		var canvas = document.createElement('canvas');
		canvas.width = modelWidth;
		canvas.height = modelDepth;
		var context = canvas.getContext('2d');
		
		for (var y = 0; y < modelDepth; y++) {
			for (var x = 0; x < modelWidth; x++) {
				if (layer[y][x]) {
					context.fillStyle = model[z][y][x];
					context.fillRect(x,y,1,1);
				}
			}
		}
		var layerTex = new THREE.Texture(canvas);
		layerTex.needsUpdate = true;
		layerTex.minFilter = THREE.NearestFilter;
		layerTex.magFilter = THREE.NearestFilter;
		var layerMat = new THREE.MeshBasicMaterial({map:layerTex,transparent:true,opacity:1});
		var layerPlane = new THREE.PlaneGeometry(8,8);
		for (var i = 0; i < 3; i++) {
			var layerObj = new 	THREE.Mesh(layerPlane,layerMat);
			layerObj.position.z = z*0.1+(-0.05+(i*0.05));
			this.group.add(layerObj);
		}
	}
}

function add(thing){
	this.group.add(thing);
}