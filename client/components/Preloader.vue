<template>
  <div class="preloader" :style="display ? 'display: table' : 'display: none'">
    <div class="preloader-center">
      <svg class="preloader-icon" width="34" height="38" viewBox="0 0 34 38">
        <path class="preloader-path" stroke-dashoffset="0" d="M29.437 8.114L19.35 2.132c-1.473-.86-3.207-.86-4.68 0L4.153 8.114C2.68 8.974 1.5 10.56 1.5 12.28v11.964c0 1.718 1.22 3.306 2.69 4.165l10.404 5.98c1.47.86 3.362.86 4.834 0l9.97-5.98c1.472-.86 2.102-2.45 2.102-4.168V12.28c0-1.72-.59-3.306-2.063-4.166z">
          <animate attributeType="XML" attributeName="stroke-dashoffset" from="0" to="102px" dur="1s" repeatCount="indefinite"/>
        </path>
      </svg>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Preloader',
    props: {
      display: Boolean
    }
  }

</script>

<style lang="scss" scoped>

  .preloader {
    /*display : table;*/
    position: absolute;
    z-index: 99;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    text-align : center;
    width: 100%;
    height: 100%;
    min-height: 230px;
    min-width: 230px;
    opacity: 0;
    transition: all 0.5s;

    &:before {
      display : inline-block;

      height : 100%;

      content : '';
      vertical-align : middle;
    }
  }

  .preloader-center {
    display : inline-block;
    text-align : center;
    vertical-align : middle;
  }

  .preloader-path {
    stroke-linejoin : round;
    fill : none;
    stroke : #06b7c5;
    stroke-width : 2;
    stroke-dasharray : 70 32;
  }

</style>
