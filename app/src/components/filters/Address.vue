<template>
    <div class="input-group my-3">
        <input
            type="text"
            class="form-control"
            placeholder="Search for an address"
            aria-label="Search for an address"
        />
        <div class="input-group-append">
            <button
                class="btn btn-outline-secondary"
                type="button"
            >
                Search
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Address',
}
</script>
