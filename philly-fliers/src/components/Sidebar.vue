<template>
    <div class="row">
        <div class="col-xs-12">
            <address-search ref="address"/>
            <button
                class="btn btn-outline-secondary"
                type="button"
                data-toggle="modal"
                data-target=".modal"
            >
                Show modal
            </button>
        </div>
    </div>
</template>

<script>
import AddressSearch from './filters/Address';
import JQuery from 'jquery';

export default {
    name: 'FliersSidebar',
    components: {
        'address-search': AddressSearch,
    },
}
</script>
