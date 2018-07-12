<template>
    <div class="row mt-3">
        <div class="col-sm-12">
            <h5>Filter by {{ formName }}</h5>
            <hr />
            <div class="accordion">
                <div
                    v-for="(field, fieldName, index) in fields"
                    :key="fieldName"
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
                                {{ field.field }}
                            </button>
                        </h5>
                    </div>
                    <div
                        :id.prop="'filter-dropdown-' + index"
                        class="collapse"
                    >
                        <div class="card-body">
                            <text-filter
                                v-if="field.fieldType == 'text'"
                                :field-name="fieldName"
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
        formName: {
            type: String,
            default: '...'
        },
        fields: {
            type: Object,
            default: () => { return {}; }
        }
    }
}
</script>
