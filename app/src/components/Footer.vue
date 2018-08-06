<template>
    <footer
        id="footer"
        class="bg-dark text-white-50 text-center py-3"
    >
        &#169; 2018. Website by Jean Cochrane.
        Built for the
        <a
            class="text-white-50"
            href="https://fellowship.azavea.com/">
            2018 Azavea Open Source Fellowship.
        </a>
    </footer>
</template>

<script>
export default {
    name: 'FliersFooter',
}
</script>

<style>
footer > a {
    text-decoration: underline;
}

footer > a:hover,
footer > a:focus {
    color: #999999;
}
</style>
