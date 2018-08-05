<template>
    <div
        class="modal fade"
        role="dialog"
    >
        <div
            class="modal-dialog modal-dialog-centered"
            role="document"
        >
            <div class="modal-content">
                <div class="modal-header">
                    <h4
                        v-if="type.label === 'Poster'"
                        class="modal-title"
                    >
                        {{ details['Event name'] }}
                        <small class="text-muted">
                            Poster
                        </small>
                    </h4>
                    <h4
                        v-else-if="type.label === 'Event'"
                        class="modal-title"
                    >
                        {{ details['Title'] }}
                        <small class="text-muted">
                            Event
                        </small>
                    </h4>
                    <h4
                        v-else
                        class="modal-title"
                    >
                        No record found
                    </h4>
                    <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                    >
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="container-fluid">
                        <template v-if="type.label === 'Poster'">
                            Displaying a <strong>poster</strong>.
                        </template>
                        <template v-else-if="type.label === 'Event'">
                            Displaying an <strong>event</strong>.
                        </template>
                        <template v-else>
                            <p>
                                No information to display.
                            </p>
                        </template>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary-outline"
                        data-dismiss="modal"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';


export default {
    name: 'FliersModal',
    computed: {
        ...mapGetters({
            type: 'activeType',
            record: 'activeRecord',
            details: 'activeRecordDetails'
        })
    }
}
</script>
