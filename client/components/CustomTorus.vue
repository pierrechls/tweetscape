<template>
  <a-torus scale="20 10 10" :position="attributify(position)" :rotation="attributify(rotation)" radius="1.60" arc="250" material="shader: standard; color: #60ffec; side: double;"></a-torus>
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
      console.log(`torus ${this.id} was destroyed`)
    },
    methods: {
      attributify
    }
  }

</script>
