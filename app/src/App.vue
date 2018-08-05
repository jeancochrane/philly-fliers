<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>
/* Import webfonts. */
@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

#app {
    /* Typography */
    font-family: 'Source Sans Pro', 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
</style>
