<template>
    <div class="container-fluid">
        <fliers-navbar/>
        <fliers-public/>
        <fliers-footer/>
    </div>
</template>

<script>
import FliersNavbar from './Navbar';
import FliersPublic from './Public';
import FliersFooter from './Footer';

export default {
    name: 'IndexView',
    components: {
        'fliers-navbar': FliersNavbar,
        'fliers-public': FliersPublic,
        'fliers-footer': FliersFooter,
    }
}
</script>
