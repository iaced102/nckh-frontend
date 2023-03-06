<template>
    <div class="back">
        <h1>Chỉnh sửa văn bản</h1>
        <ag-grid-vue style="width: 90%; height: 900px; margin: 0 auto;" 
            class="ag-theme-alpine" 
            :columnDefs="columnDefs"
            :rowData="rawData"
            @grid-ready="onGridReady"
            :getContextMenuItems="getContextMenuItems"
            >
        </ag-grid-vue>
        <v-btn>
            Save
        </v-btn>
        <v-btn @click="returnToDocList">
            Cancel
        </v-btn>
        <grid-context-menu :display="showContextMenu" ref="menu">
            <ul>
                <li> List item 1 </li>
                <li> List item 2 </li>
            </ul>
        </grid-context-menu>
    </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import 'ag-grid-enterprise';
import {documentAPI} from '@/api/document.js'
export default {
    components: {
        AgGridVue,
    }, 

    data() {
        return {
            columnDefs:[
                {
                    headerName:"",
                    field:"userNameDisplay"
                },
                {
                    headerName:"",
                    field:"id"
                }
            ],
            rawData: [],
            file: undefined,
            showContextMenu: false,
        }
    },
    async created() {
            console.log(this.$route.params.id);
            let res = await documentAPI.detailDocument(this.$route.params.id);
            console.log(res);
            this.columnDefs = res.columnDefs;
            this.rawData = res.rawData;
            // console.log(this.columnDefs);
            this.columnDefs.map(field => {
                console.log(field.field != 'student' && field.field != 'id');
                if(field.field != 'student' && field.field != 'id') {
                    Object.assign(this.columnDefs[this.columnDefs.indexOf(field)],
                    {editable: true})
                }
                }
            );
            console.log(this.columnDefs);
        },

    methods: {
        onGridReady(params) {
            this.gridApi = params.api;
            this.gridColumnApi = params.columnApi;
        },
        returnToDocList() {
            this.$router.push('/document')
        },
    },
}
</script>