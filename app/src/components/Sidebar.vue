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
import Grout from '@/api.js';

export default {
    name: 'FliersSidebar',
    components: {
        'address-search': AddressSearch,
    },
    mounted() {
        console.log(Grout.types);
        Grout.types.all()
            .then(data => {
                console.log(data);
            })
            .catch(reason => {
                console.log(`Failed to load RecordTypes: ${reason}`);
            });
    }
}
</script>
