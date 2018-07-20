<template>
    <div class="row mt-3">
        <div class="col-sm-12">
            <hr />
            <div class="accordion">
                <div
                    v-for="(field, index) in fields"
                    :key="field.name"
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
                                {{ field.name }}
                            </button>
                        </h5>
                    </div>
                    <div
                        :id.prop="'filter-dropdown-' + index"
                        class="collapse"
                    >
                        <div class="card-body">
                            <text-filter
                                v-if="field.type == 'text'"
                                :form="field.form"
                                :field-name="field.name"
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
        fields: {
            /* eslint-disable vue/require-valid-default-prop */
            type: Array,
            default: []
            /* eslint-enable vue/require-valid-default-prop */
        }
    }
}
</script>
