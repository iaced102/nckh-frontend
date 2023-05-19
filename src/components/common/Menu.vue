<template>
    <div>
        <div class="menu">
            <div>
                <img
                    src="../static/Logo-DH-Cong-nghiep-Ha-Noi.webp"
                    alt=""
                    style="width: 60px; height: 60px; margin-left: 30px"
                />
            </div>
            <div class="menu-options">
                <v-btn
                    color="primary"
                    class="menu-item"
                    v-bind="attrs"
                    v-on="on"
                >
                    Trang chính
                </v-btn>
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            class="menu-item"
                            v-bind="attrs"
                            v-on="on"
                        >
                            Văn bản hành chính
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-item
                            class="menu-item-drop-down"
                            v-for="(item, index) in documentItem"
                            :key="index"
                        >
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

                <v-btn
                    class="menu-item"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                >
                    Lịch trình
                </v-btn>

                <v-btn
                    class="menu-item"
                    color="primary"
                    v-bind="attrs"
                    v-on="on"
                >
                    Báo cáo
                </v-btn>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            documentItem: [
                { title: "Danh sách văn bản hành chính", handler() {} },
                { title: "Tạo mới", handler() {} },
            ],
        };
    },
};
</script>

<style>
.menu {
    z-index: 1000;
    position: fixed;
    top: 0;
    width: 100%;
    background-color: #131236;
    padding: 15px 0;
    display: flex;
    justify-content: space-between;
}
.menu-options {
    color: white;
    font-weight: 700;
    height: 50px;

    display: flex;
    margin-right: 40px;
}
.menu-item {
    background-color: #131236 !important;
}
.menu-item:hover {
    background: rgb(54, 40, 181);
}
.menu-item-drop-down:hover {
    background: rgb(176, 173, 166);
}
</style>
