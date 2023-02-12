<template>
    <div>
        <v-btn @click="toConfigDocument">Tạo mới</v-btn>
    </div>
</template>

<script>
export default {
    methods: {
        toConfigDocument() {
            if (this.$store.state.user.user.userInfo.orgChart == 'superUser' || this.$store.state.user.user.userInfo.orgChart == 'staff') {
                this.$router.push('/document/config')
            } else {
                console.log('permission denied ')
            }
        }
    }
}
</script>