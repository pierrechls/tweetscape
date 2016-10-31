<template>
  <div class="counter" @click="$store.dispatch('incrementAsync')">
    {{ count }}
  </div>
</template>

<script>

  export default {
    computed: {
      count() {
        return this.$store.state.count
      }
    }
  }

</script>

<style>

  .counter {
    cursor: pointer;
    margin: 0px auto;
    border-radius: 3px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 1rem;
    background-color: #f0f0f0;
    user-select: none;
  }

</style>
