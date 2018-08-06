<template>
    <nav
        id="navbar"
        class="navbar navbar-expand-lg navbar-dark bg-dark"
    >
        <a
            class="navbar-brand app-title"
            href="/"
        >
            <font-awesome-icon
                icon="thumbtack"
                size="xs"
            />
            {{ title }}
        </a>
    </nav>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'


export default {
    name: 'FliersNavbar',
    components: {
        'font-awesome-icon': FontAwesomeIcon,
    },
    props: {
        title: {
            type: String,
            default: 'Now For Now',
        }
    }
}
</script>

<style>
.app-title {
    font-size: 2em;
}
</style>
