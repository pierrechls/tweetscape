<template>
  <a-entity>
    <a-entity obj-model="obj: #frame-obj;"  scale="2 2 2" :position="attributify(positionTop)" :rotation="attributify(rotation)" material="shader: standard; color: #60ffec; side: double;"></a-entity>
    <a-entity obj-model="obj: #frame-obj;"  scale="2 2 2" :position="attributify(positionBottom)" :rotation="attributify(rotation)" material="shader: standard; color: #60ffec; side: double;"></a-entity>
  </a-entity>
</template>

<script>

  import { attributify } from 'utils/aframe-utils'

  export default {
    replace: true,
    props: {
      id: 0,
      positionTop: Object,
      positionBottom: Object,
      rotation: Object
    },
    data() {
      return {}
    },
    mounted() {},
    beforeDestroy (){
      // console.log(`torus ${this.id} was destroyed`)
    },
    methods: {
      attributify
    }
  }

</script>
