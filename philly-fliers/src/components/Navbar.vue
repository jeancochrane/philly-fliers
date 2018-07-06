<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand app-title" href="/">
            {{ title }}
        </a>
    </nav>
</template>

<script>
export default {
    name: 'FliersNavbar',
    props: {
        title: {
            type: String,
            default: 'Philly Fliers',
        }
    }
}
</script>

<style>
.app-title {
    font-size: 2em;
}
</style>
