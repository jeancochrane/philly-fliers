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
                    <h5 class="modal-title">Modal title</h5>
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
                        <p>
                            Some information to display in the modal.
                        </p>
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
export default {
    name: 'FliersModal'
}
</script>
