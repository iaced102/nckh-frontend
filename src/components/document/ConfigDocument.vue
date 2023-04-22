<template>
  <div class="back" data-app>
    <h1>Tạo văn bản mới</h1>
    <v-text-field
      v-model="columnDefs[0].headerName"
      type="text"
      placeholder="name display"></v-text-field>
    <v-text-field
      v-model="columnDefs[1].headerName"
      type="text"
      placeholder="id"></v-text-field>
    <v-text-field
      v-model="classId"
      type="text"
      placeholder="classID"></v-text-field>
    <v-toolbar color="rgb(200, 211, 214)">
      <v-autocomplete
        :items="subjectName"
        item-text="name"
        item-value="id"
        label="Subject"
        v-model="subjectId">
      </v-autocomplete>
      <v-spacer></v-spacer>
      <v-btn
        @click="gotoAddSubject"
        :disabled="
          !(
            this.$store.state.user.user.userInfo.orgChart == 'superUser' ||
            this.$store.state.user.user.userInfo.orgChart == 'staff'
          )
        ">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-toolbar>
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
import { subjectAPI } from "@/api/subject.js";

export default {
  async created() {
    if (
      !(
        this.$store.state.user.user.userInfo.orgChart == "superUser" ||
        this.$store.state.user.user.userInfo.orgChart == "staff"
      )
    ) {
      this.$router.push("/");
    }

    let res = await subjectAPI.getListSubject();
    // console.log(res.data[0]);
    // res.data.map (item => {
    //     console.log(res.data.name[item])
    // })
    this.subjectName = res.data;
    console.log(this.subjectName);
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

      subjectName: null,
      classId: null,
      subjectId: null,
    };
  },
  methods: {
    async createDocument() {
      let userNameDisplayHeaderName = this.columnDefs[0].headerName;
      let idHeaderName = this.columnDefs[1].headerName;
      let classId = this.classId;
      let subjectId = this.subjectId;
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
        this.fetchColumnDefs = this.fetchColumnDefs.concat(this.columnDefs);
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
          this.rawData,
          classId,
          subjectId
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
    gotoAddSubject() {
      this.$router.push("/document/config/addSubject");
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

</style>
