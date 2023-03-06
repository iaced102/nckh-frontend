<template>
    <div class="back">
        <h1>Chỉnh sửa văn bản</h1>
        <ag-grid-vue style="width: 90%; height: 900px; margin: 0 auto;" 
            class="ag-theme-alpine" 
            :columnDefs="fetchColumnDefs"
            :rowData="rawData">
        </ag-grid-vue>
        <v-btn>
            Save
        </v-btn>
        <v-btn>
            Cancel
        </v-btn>
    </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import { read, utils } from 'xlsx';
import { AgGridVue } from "ag-grid-vue";
// eslint-disable-next-line no-unused-vars
import {documentAPI} from '@/api/document.js'
export default {
    components: {
        AgGridVue
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
            fetchColumnDefs: [],
        }
    },
    methods: {
        // async createDocument() {
        //     let userNameDisplayHeaderName = this.columnDefs[0].headerName
        //     let idHeaderName = this.columnDefs[1].headerName
        //     if (this.fetchColumnDefs.filter(col =>                 col.field == userNameDisplayHeaderName || col.field ==idHeaderName
        //     ).length == 2) {
        //         this.fetchColumnDefs.map((col, idx) => {
        //             if (col.field == userNameDisplayHeaderName) {
        //                 this.fetchColumnDefs.splice(idx, 1)
        //             }
        //         })
        //         this.fetchColumnDefs.map((col, idx) => {
        //             if (col.field == idHeaderName) {
        //                 this.fetchColumnDefs.splice(idx, 1)
        //             }
        //         })
        //         this.fetchColumnDefs = this.fetchColumnDefs.concat(this.columnDefs)
        //         this.rawData.map(data => {
        //             let userNameValue = data[this.columnDefs[0].headerName]
        //             let idValue = data[this.columnDefs[1].headerName]
        //             delete data[this.columnDefs[0].headerName]
        //             delete data[this.columnDefs[1].headerName]
        //             data[this.columnDefs[0].field] = userNameValue
        //             data[this.columnDefs[1].field] = idValue
        //         })
        //     let res = await documentAPI.createDocument(this.fetchColumnDefs, this.rawData)
        //     console.log(res)
        // }
        // },
        // async handleFile(e) {
        //     let file = await e.arrayBuffer()
        //     const wb = read(file)
        //     const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        //     this.rawData = data
        //     this.translateRawData()
        // },
        // translateRawData() {
        //     // let rawData =[]
        //     let columnDefs = []
        //     let headerName = []
        //     this.rawData.map(e => {
        //         console.log(Object.keys(e))
        //         headerName = [...new Set(headerName.concat(Object.keys(e)))]
        //         // concat(result, Object.keys(e))
        //         console.log(headerName)
        //     })
        //     headerName.map(field => {
        //         columnDefs.push({
        //             field: field,
        //             headerName: field
        //         })
        //     })
        //     this.fetchColumnDefs = columnDefs
        // },
        async created() {
            let res = await documentAPI.detailDocument(15);
            console.log(res);
        },
    },

}
</script>