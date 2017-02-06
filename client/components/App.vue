<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<style>

  body {
    margin: 0;
    font-size: 2rem;
    font-family: -apple-system, BlinkMacSystemFont,
                 'avenir next', avenir,
                 helvetica, 'helvetica neue',
                 Ubuntu,
                 'segoe ui', arial,
                 sans-serif;
  }
  .page {
    text-align: center;
  }
  code {
    background-color: #f0f0f0;
    padding: 3px 5px;
    border-radius: 2px;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to, .fade-leave-active {
    opacity: 0
  }

</style>
