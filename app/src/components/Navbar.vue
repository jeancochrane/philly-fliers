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
        <span class="text-white-50">
            {{ subtitle }}
        </span>
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
        },
        subtitle: {
            type: String,
            default: 'Archiving queer fliers and events in West Philadelphia.'
        }
    }
}
</script>

<style>
.app-title {
    font-size: 2em;
}
</style>
