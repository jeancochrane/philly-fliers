<template>
    <nav
        id="navbar"
        class="navbar navbar-expand-lg navbar-dark bg-dark"
    >
        <a
            class="navbar-brand app-title"
            href="/"
        >
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
