<template>
    <div class="form-inline my-2 my-lg-0">
        <input
            class="form-control mr-sm-2"
            type="search"
            placeholder="Search for keywords"
            aria-label="Search for keywords"
            name="${fieldName}"
        />
    </div>
</template>

<script>
export default {
    name: 'TextFilter',
    props: {
        fieldName: {
            type: String,
            default: ''
        }
    }
}
</script>
