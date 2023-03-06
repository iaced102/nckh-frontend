<template>
  <div class="back">
    <h1>Chỉnh sửa văn bản</h1>
    <ag-grid-vue
      style="width: 90%; height: 900px; margin: 0 auto"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rawData"
      :defaultColDef="defaultColDef"
      @grid-ready="onGridReady"
      :getContextMenuItems="getContextMenuItems">
    </ag-grid-vue>
    <v-btn> Save </v-btn>
    <v-btn @click="returnToDocList"> Cancel </v-btn>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import { documentAPI } from "@/api/document.js";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
export default {
  components: {
    AgGridVue,
  },
  beforeMount() {},

  data() {
    return {
      defaultColDef: {
        editable: true,
        sortable: true,
        flex: 1,
        minWidth: 100,
        filter: false,
        resizable: true,
      },
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
      showContextMenu: false,
      autoGroupColumnDef: {
        // pinned: 'left',
        filterValueGetter: (params) => {
          var colGettingGrouped = params.colDef.showRowGroup;
          var valueForOtherCol = params.api.getValue(
            colGettingGrouped,
            params.node
          );
          return valueForOtherCol;
        },
        field: "",
      },
    };
  },
  async created() {
    console.log(this.$route.params.id);
    let res = await documentAPI.detailDocument(this.$route.params.id);
    console.log(res);
    this.columnDefs = res.columnDefs;
    this.rawData = res.rawData;
    // console.log(this.columnDefs);
    this.columnDefs.map((field) => {
      console.log(field.field != "student" && field.field != "id");
      if (field.field != "student" && field.field != "id") {
        Object.assign(this.columnDefs[this.columnDefs.indexOf(field)], {
          editable: true,
        });
      }
    });
    console.log(this.columnDefs);
  },

  methods: {
    getContextMenuItems(params) {
      let result = ["copy", "copywithheader", "paste", "export"];
      console.log(params);
      return result;
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },
    returnToDocList() {
      this.$router.push("/document");
    },
  },
};
</script>
