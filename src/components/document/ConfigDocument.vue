<template>
  <div class="back">
    <h1>Tạo văn bản mới</h1>
    <v-text-field
      v-model="columnDefs[0].headerName"
      type="text"
      placeholder="name display"></v-text-field>
    <v-text-field
      v-model="columnDefs[1].headerName"
      type="text"
      placeholder="id"></v-text-field>
    <v-file-input id="file" v-model="file" @change="handleFile" />
    <v-btn @click="createDocument"> submit </v-btn>
    <ag-grid-vue
      style="width: 90%; height: 900px; margin: 0 auto"
      class="ag-theme-alpine"
      :columnDefs="fetchColumnDefs"
      :rowData="rawData">
    </ag-grid-vue>
  </div>
</template>

<script>
import { read, utils } from "xlsx";
import { AgGridVue } from "ag-grid-vue";
import { documentAPI } from "@/api/document.js";
export default {
  created() {
    if (
      !(
        this.$store.state.user.user.userInfo.orgChart == "superUser" ||
        this.$store.state.user.user.userInfo.orgChart == "staff"
      )
    ) {
      this.$router.push("/");
    }
  },
  components: {
    AgGridVue,
  },
  data() {
    return {
      columnDefs: [
        {
          headerName: "",
          field: "userNameDisplay",
        },
        {
          headerName: "",
          field: "id",
        },
      ],
      rawData: [],
      file: undefined,
      fetchColumnDefs: [],
    };
  },
  methods: {
    async createDocument() {
      let userNameDisplayHeaderName = this.columnDefs[0].headerName;
      let idHeaderName = this.columnDefs[1].headerName;
      if (
        this.fetchColumnDefs.filter(
          (col) =>
            col.field == userNameDisplayHeaderName || col.field == idHeaderName
        ).length == 2
      ) {
        this.fetchColumnDefs.map((col, idx) => {
          if (col.field == userNameDisplayHeaderName) {
            this.fetchColumnDefs.splice(idx, 1);
          }
        });
        this.fetchColumnDefs.map((col, idx) => {
          if (col.field == idHeaderName) {
            this.fetchColumnDefs.splice(idx, 1);
          }
        });
        this.fetchColumnDefs = this.columnDefs.concat(this.fetchColumnDefs); //this.fetchColumnDefs.concat(this.columnDefs)
        this.rawData.map((data) => {
          let userNameValue = data[this.columnDefs[0].headerName];
          let idValue = data[this.columnDefs[1].headerName];
          delete data[this.columnDefs[0].headerName];
          delete data[this.columnDefs[1].headerName];
          data[this.columnDefs[0].field] = userNameValue;
          data[this.columnDefs[1].field] = idValue;
        });
        let res = await documentAPI.createDocument(
          this.fetchColumnDefs,
          this.rawData
        );
        console.log(res);
      }
    },
    async handleFile(e) {
      let file = await e.arrayBuffer();
      const wb = read(file);
      const data = utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      this.rawData = data;
      this.translateRawData();
    },
    translateRawData() {
      // let rawData =[]
      let columnDefs = [];
      let headerName = [];
      this.rawData.map((e) => {
        console.log(Object.keys(e));
        headerName = [...new Set(headerName.concat(Object.keys(e)))];
        // concat(result, Object.keys(e))
        console.log(headerName);
      });
      headerName.map((field) => {
        columnDefs.push({
          field: field,
          headerName: field,
        });
      });
      this.fetchColumnDefs = columnDefs;
    },
  },
  computed: {
    // columndefsclone() {
    //     return [
    //         { headerName: "Make", field: "make" },
    //         { headerName: "Model", field: "model" },
    //         { headerName: "Price", field: "price" },
    //     ]
    // },
    // rawDataClone() {
    //     return [
    //         { make: "Toyota", model: "Celica", price: 35000 },
    //         { make: "Ford", model: "Mondeo", price: 32000 },
    //         { make: "Porsche", model: "Boxster", price: 72000 },
    //     ]
    // }
    // fetchColumnDef() {
    //     // let columnDefs = []
    //     this.rawData.map(raw => {
    //         Object.keys(raw)
    //     })
    //     return []
    // }
  },
};
</script>

<style>
.ag-theme-alpine {
  --ag-foreground-color: rgb(52, 80, 171);
  --ag-background-color: rgb(255, 255, 255);
  --ag-header-foreground-color: rgb(204, 245, 172);
  --ag-header-background-color: rgb(48, 169, 64);
  --ag-odd-row-background-color: rgb(0, 0, 0, 0.03);
  --ag-header-column-resize-handle-color: rgb(126, 46, 132);

  --ag-font-family: monospace;
  --ag-font-size: 15px;
}

.back {
  background-color: rgb(200, 211, 214);
}

.v-text-field {
  width: 80%;
  margin: 0 auto;
}
</style>
