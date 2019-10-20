//Lets try to make our spritestack stuff more generic!
function Stack(width = 64,depth = 64,height = 64){

	//I dont know how js works properly so for now we need to use a property to create/access a three group!
	this.group = new THREE.Group();
	
	this.voxels = new Array(height);
	
	for(var z = 0; z < this.voxels.length; z++){
		var layerArr = new Array(depth);
		for(var y = 0; y < layerArr.length; y++) {
			var rowArr = new Array(width);
		}
	}
	
	this.add = function(thing){
		this.group.add(thing);
	}
	
	this.SetLayer = function(layArr, depth) {
		this.voxels[depth] = layArr;
	}
	
	this.SetVoxel = function(x,y,z,colour){
		this.voxels[z][y][x] = colour;
	}
	
	this.UpdateMesh = function(z){
		var dead = this.group.getObjectByName(z.toString());
		this.group.remove(dead);
		this.CreateLayerMesh(this.voxels[z],z);
	}
	
	this.UpdateAll = function(){
		this.RemoveAllChildren();
		for(var z = 0; z  < this.voxels.length; z++){
			this.CreateLayerMesh(this.voxels[z],z);
		}
	}
	
	this.RemoveAllChildren = function(){
		this.group.children.forEach(function(e){
			this.group.remove(e);
		});
	}
	
	this.CreateLayerMesh = function(layer, z){
		var modelWidth = layer[0].length;
		var modelDepth = layer.length;
		var canvas = document.createElement('canvas');
		canvas.width = modelWidth;
		canvas.height = modelDepth;
		var context = canvas.getContext('2d');
		
		for (var y = 0; y < modelDepth; y++) {
			for (var x = 0; x < modelWidth; x++) {
				if (layer[y][x]) {
					context.fillStyle = layer[y][x];
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
			layerObj.name = z.toString();
			this.group.add(layerObj);
		}
	}
}