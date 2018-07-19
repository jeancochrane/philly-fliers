<template>
    <div>
        <date-picker
            v-model="dateRange"
            range
            width="inherit"
            placeholder="Filter by date range"
            lang="en"
            @change="updateDateRange"
        />
    </div>
</template>

<script>
import DatePicker from 'vue2-datepicker';

export default {
    components: {
        'date-picker': DatePicker,
    },
    data() {
        return {
            dateRange: [null, null],  // Data bound to the user's input.
        }
    },
    computed: {
        minDate: function() {
            // The minimum date in the date range.
            return this.dateRange[0];
        },
        maxDate: function() {
            // The maximum date in the date range.
            return this.dateRange[1];
        }
    },
    methods: {
        updateDateRange() {
            /*
             * Update the date range filters in the data store, and then query
             * for matching Records.
             */
            // Update minimum and maximum dates.
            this.$store.commit('updateMinDate', this.minDate);
            this.$store.commit('updateMaxDate', this.maxDate);

            // Rereun the Records query.
            this.$store.dispatch('updateRecords');
        }
    }
}
</script>
