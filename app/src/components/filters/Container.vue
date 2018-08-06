<template>
    <div class="row my-3 filter-container">
        <div class="col-sm-12">
            <div class="accordion">
                <div
                    v-for="(filter, index) in filters"
                    :key="filter.name"
                    class="card"
                >
                    <div class="card-header">
                        <h5 class="mb-0">
                            <button
                                :data-target="'#filter-dropdown-' + index"
                                class="btn btn-link"
                                type="button"
                                data-toggle="collapse"
                            >
                                {{ filter.name }}
                            </button>
                        </h5>
                    </div>
                    <div
                        :id.prop="'filter-dropdown-' + index"
                        class="collapse"
                    >
                        <div class="card-body">
                            <text-filter
                                v-if="filter.fieldType == 'text'"
                                :filter="filter"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TextFilter from './Text';


export default {
    name: 'FilterContainer',
    components: {
        'text-filter': TextFilter
    },
    props: {
        filters: {
            /* eslint-disable vue/require-valid-default-prop */
            type: Array,
            default: []
            /* eslint-enable vue/require-valid-default-prop */
        }
    }
}
</script>

<style>
/* Make the filter container scrollable. */
.filter-container {
    height: auto;
    max-height: 300px;
    overflow-y: scroll;
}

/* 540px = Bootstrap 4 smallest breakpoint. */
@media (max-width: 540px) {
    /* At small sizes, the sidebar should stack above the map. */
    .filter-container {
        overflow-y: inherit;
        max-height: 100%;
    }
}
</style>
