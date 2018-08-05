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
                        <template v-if="type.label === 'Poster' || type.label === 'Event'">
                            <!-- Common attributes for Posters and Events. -->
                            <p>
                                {{ details['Short description'] }}
                            </p>
                            <template v-if="type.label === 'Poster'">
                                <!-- Poster-specific attributes. -->
                                <div
                                    v-if="details['Image']"
                                    class="text-center"
                                >
                                    <img
                                        :src="details['Image']"
                                        class="mb-3"
                                    />
                                </div>
                                <h5>First seen</h5>
                                <p>{{ displayDateTime(record.occurred_from) }}</p>
                                <h5>Last seen</h5>
                                <p>{{ displayDateTime(record.occurred_to) }}</p>
                                <template v-if="details['URL']">
                                    <h5>URL</h5>
                                    <p>
                                        <a :href="details['URL']">
                                            {{ details['URL'] }}
                                        </a>
                                    </p>
                                </template>
                                <template v-if="details['Artist name']">
                                    <h5>Artist name</h5>
                                    <p>{{ details['Artist name'] }}</p>
                                </template>
                                <template v-if="details['Artist URL']">
                                    <h5>Artist URL</h5>
                                    <p>
                                        <a :href="details['Artist URL']">
                                            {{ details['Artist URL'] }}
                                        </a>
                                    </p>
                                </template>
                            </template>
                            <template v-else>
                                <!-- Event-specific attributes. -->
                                <template v-if="details['URL']">
                                    <h5>URL</h5>
                                    <p>
                                        <a :href="details['URL']">
                                            {{ details['URL'] }}
                                        </a>
                                    </p>
                                </template>
                            </template>
                            <div
                                v-if="details['Long description']"
                                class="card bg-light"
                            >
                                <div class="card-body">
                                    <div
                                        id="long-description"
                                        class="collapse description-text"
                                    >
                                        <p>
                                            {{ details['Long description'] }}
                                        </p>
                                    </div>
                                    <a
                                        href="#long-description"
                                        data-toggle="collapse"
                                        class="collapsed"
                                    >
                                        <span class="show-more">Show more</span>
                                        <span class="show-less">Show less</span>
                                    </a>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <!-- This should only get displayed if the modal is -->
                            <!-- accidentally triggered programmatically, since the -->
                            <!-- only active link to trigger the modal requires a -->
                            <!-- Record to be selected first. -->
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
import fecha from 'fecha';


export default {
    name: 'FliersModal',
    computed: {
        ...mapGetters({
            type: 'activeType',
            record: 'activeRecord',
            details: 'activeRecordDetails'
        })
    },
    methods: {
        displayDateTime(dt) {
            /*
             * Format an ISO 8601 timestamp for human-readable display.
             */
            const inputFormat = 'YYYY-MM-DDTHH:mm:ssZ';
            const outputFormat = 'MMMM Do, YYYY h:mm A';

            const parsedDate = fecha.parse(dt, 'YYYY', inputFormat);
            return fecha.format(parsedDate, outputFormat);
        }
    }
}
</script>

<style>
/* =======================  *
 * show more/less logic for *
 * long description boxes   *
 * =======================  */

a .show-more {
    display: none;
}

a .show-less {
    display: inline;
}

a.collapsed .show-more {
    display: inline;
}

a.collapsed .show-less {
    display: none;
}

.description-text:not(.show) {
    min-height: 4.25em;
    height: 4.25em;
    display: block;
    overflow: hidden;
    visibility: visible;
}
</style>
