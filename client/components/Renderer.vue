<template>
  <div id="renderer">
    <a-scene gridhelper="size: 3000;">
      <a-sphere :position="spherePositionAttr" :radius="sphere.radius" :color="sphere.color"></a-sphere>
      <a-plane :rotation="planeRotationAttr" :width="plane.dimensions.width" :height="plane.dimensions.height" :color="plane.color"></a-plane>
      <camera :position="camera.position" :rotation="camera.rotation"></camera>
    </a-scene>
  </div>
</template>

<script>
  import Camera from './Camera.vue'
  import 'gsap/src/uncompressed/TweenMax'
  import SimulationParams from '../params.js'
  import Vector3D from 'utils/maths/vector3d.js'

  export default {
    name: 'Renderer',
    components: {
      'camera': Camera
    },
    data: () => {
      return {
        camera: {
          position: {
            x: 20,
            y: 30,
            z: 10
          },
          rotation: {
            x: 0,
            y: 0,
            z: 0
          }
        },
        paths: [],
        lastPath: new Vector3D(0,0,0),
        sphere: {
          position: {
            x: 1,
            y: 1,
            z: -1
          },
          radius: 1.25,
          color: '#EF2D5E'
        },
        plane: {
          dimensions: {
            width: 10,
            height: 4
          },
          rotation: {
            x: -90,
            y: 0,
            z: 0
          },
          color: '#7BC8A4'
        }
      }
    },
    computed: {
      spherePositionAttr () {
        const pos = this.sphere.position;
        return `${pos.x} ${pos.y} ${pos.z}`;
      },
      cameraPositionAttr () {
        const pos = this.camera.position;
        return `${pos.x} ${pos.y} ${pos.z}`;
      },
      planeRotationAttr () {
        const rotation = this.plane.rotation;
        return `${rotation.x} ${rotation.y} ${rotation.z}`;
      }
    },
    methods: {
      drawPath: () => {
        for(let i = 0; i < SimulationParams.path_amount_per_cycle; ++i) {
          this.paths.push({x: i, y: 2*i, z: i+5})
        } 

        /*
        For i in MAX_POINTS, draw points following math formulas
         */
      },
      initLastPath: () => {
        // TODO : get paths[0] and paths[1], get coeff_dir, set as base camera rot
        this.lastPath = Vector3D.slope(this.paths[0], this.paths[1])
      },
      startSimulation: () => {
        // TweenMax.to(this.camera.position, 5, {bezier:[{x:1, y:1, z: -25}, {x:0, y:2, z:-15}, {x:-1, y:1, z:-25}, {x:0, y:0, z:-15}, {x:1, y:1, z:-25}], ease: Linear.easeNone, repeat: -1});
      }
    },
    mounted () {
      setTimeout(function(){
        this.drawPath()
        this.initLastPath()
        this.startSimulation()
      }.bind(this), 
      500)


      TweenMax.to(this.camera.position, 5, {bezier:[{x:1, y:1, z: -25}, {x:0, y:2, z:-15}, {x:-1, y:1, z:-25}, {x:0, y:0, z:-15}, {x:1, y:1, z:-25}], ease: Linear.easeNone, repeat: -1});
    },
    watch: {
      camera: function (camera) {
        console.log(camera)
      }
    }
  }

</script>

<style>

</style>
