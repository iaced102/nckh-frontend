<template>
    <div>
        <p>asdfsadf</p>
        <v-text-field v-model="columnDefs[0].headerName" type="text" placeholder="name display"></v-text-field>
        <v-text-field v-model="columnDefs[1].headerName" type="text" placeholder="id"></v-text-field>
        <v-file-input id="file" v-model="file" @change="handleFile" />
        <v-btn @click="render">
            submit
        </v-btn>
        <!-- <div v-if="fetchColumnDefs.length>0"> -->
            <ag-grid
                :columnDefs="columndefsclone"
                :rawData="rawDataClone"
            />
        <!-- </div> -->
    </div>
</template>

<script>
import { read, utils } from 'xlsx';
import { AgGridVue } from "ag-grid-vue";
export default {
    created() {
        if (!(this.$store.state.user.user.userInfo.orgChart == 'superUser' || this.$store.state.user.user.userInfo.orgChart == 'staff')) {
            this.$router.push('/')
        }
    },
    components:{
        'ag-grid': AgGridVue
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
            fetchColumnDefs: []
        }
    },
    methods: {
        render() {

        },
        async handleFile(e) {
            let file = await e.arrayBuffer()
            const wb = read(file)
            const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
            this.rawData = data
            this.translateRawData()
        },
        translateRawData() {
            // let rawData =[]
            let columnDefs = []
            let headerName = []
            this.rawData.map(e => {
                console.log(Object.keys(e))
                headerName = [...new Set(headerName.concat(Object.keys(e)))]
                // concat(result, Object.keys(e))
                console.log(headerName)
            })
            headerName.map(field => {
                columnDefs.push({
                    field: field,
                    headerName: field
                })
            })
            this.fetchColumnDefs = columnDefs
        }
    },
    computed: {
        columndefsclone() {
            return [
                { headerName: "Make", field: "make" },
                { headerName: "Model", field: "model" },
                { headerName: "Price", field: "price" },
            ]
        },
        rawDataClone() {
            return [
                { make: "Toyota", model: "Celica", price: 35000 },
                { make: "Ford", model: "Mondeo", price: 32000 },
                { make: "Porsche", model: "Boxster", price: 72000 },
            ]
        }
        // fetchColumnDef() {
        //     // let columnDefs = []
        //     this.rawData.map(raw => {
        //         Object.keys(raw)
        //     })
        //     return []
        // }

    }
}
</script>