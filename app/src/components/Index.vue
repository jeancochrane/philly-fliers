<template>
    <div class="container-fluid">
        <fliers-navbar/>
        <fliers-content/>
        <fliers-footer/>
    </div>
</template>

<script>
import FliersNavbar from './Navbar';
import FliersContent from './Content';
import FliersFooter from './Footer';

export default {
    name: 'IndexView',
    components: {
        'fliers-navbar': FliersNavbar,
        'fliers-content': FliersContent,
        'fliers-footer': FliersFooter,
    }
}
</script>
