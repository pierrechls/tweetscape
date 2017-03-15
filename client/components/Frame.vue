<template>
  <a-entity :position="attributify(position)">
    <a-entity obj-model="obj: #frame-obj;"  scale="2 2 2" position="0 6 0" :rotation="attributify(rotation)" material="shader: standard; color: #60ffec; side: double;"></a-entity>
    <a-entity obj-model="obj: #frame-obj;"  scale="2 2 2" position="0 -6 0" :rotation="attributify(rotation)" material="shader: standard; color: #60ffec; side: double;"></a-entity>
  </a-entity>
</template>

<script>

  import { attributify } from 'utils/aframe-utils'

  export default {
    replace: true,
    props: {
      id: 0,
      position: Object,
      rotation: Object
    },
    data() {
      return {}
    },
    mounted() {},
    beforeDestroy (){
      // console.log(`frame ${this.id} was destroyed`)
    },
    methods: {
      attributify
    }
  }

</script>
