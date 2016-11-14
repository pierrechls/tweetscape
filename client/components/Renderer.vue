<template>
  <div id="renderer">
    <a-scene gridhelper="size: 30;">
      <a-sphere :position="spherePositionAttr" :radius="sphere.radius" :color="sphere.color"></a-sphere>
      <a-plane :rotation="planeRotationAttr" :width="plane.dimensions.width" :height="plane.dimensions.height" :color="plane.color"></a-plane>
      <a-entity :position="cameraPositionAttr">
        <a-camera></a-camera>
      </a-entity>
    </a-scene>
  </div>
</template>

<script>

  export default {
    name: 'Renderer',
    data: () => {
      return {
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
        },
        camera: {
          position: {
            x: 0,
            y: 1.8,
            z: 10
          }
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
    }
  }

</script>

<style>

</style>
