//Lets try to make our spritestack stuff more generic!
function Stack(width = 64,depth = 64,height = 64){
	this.group = new THREE.Group();
	this.add = function(thing){
		this.group.add(thing);
	}
}

function add(thing){
	this.group.add(thing);
}