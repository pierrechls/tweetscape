<template>
  <div class="page">
    <counter></counter>
    <p>
      To get started, edit files in <code>./client</code> and save.
    </p>
  </div>
</template>

<script>
import Counter from '../components/Counter'
import * as THREE from 'three'

export default {
  components: {
    Counter
  },
  mounted: () => {
    console.log('coucou')
    var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube )

var light = new THREE.AmbientLight( 0xffffff ); // soft white light
scene.add( light );

camera.position.z = 5;



function render() {
	requestAnimationFrame( render );
	renderer.render( scene, camera );
    cube.rotation.x += 0.05;
    cube.rotation.y += 0.05;
}
render();
  }
}
</script>
