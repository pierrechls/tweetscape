<template>
  <a-plane :material="'shader: flat; src: #' + id"
           :geometry="'width:' + tweetParams.width + ';height:' + tweetParams.height + ';'"
           :position="attributify(position)"
           :texture-update="'id: #'+ id"
  >
  </a-plane>
</template>

<script>
  import { attributify } from 'utils/aframe-utils'
  import SimulationParams from '../params.js'

  export default {
    name: 'Tweet',
    props: {
      position: Object,
      id: String
    },
    computed: {
      tweetParams () {
        return SimulationParams.tweets
      }
    },
    mounted () {

      // let canvas = document.getElementById(this.id)
      //
      // let texture = new THREE.Texture(canvas)
      // let material = new THREE.MeshBasicMaterial({map: texture, transparent: true})
      //
      // setTimeout(function () {
      //   console.log(this.$el.components)
      //   this.$el.components.material.el.object3D.children[0].material = material
      //   this.$el.components.material.el.object3D.children[0].material.needsUpdate = true
      // }.bind(this), 100)

    },
    methods: {
      attributify
    }
  }

</script>
