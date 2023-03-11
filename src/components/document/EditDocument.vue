<template>
  <div class="back" data-app>
    <h1>Chỉnh sửa văn bản</h1>
    <ag-grid-vue
      style="width: 90%; height: 900px; margin: 0 auto"
      class="ag-theme-alpine"
      :columnDefs="columnDefs"
      :rowData="rawData"
      @grid-ready="onGridReady"
      :getContextMenuItems="getContextMenuItems"
      :getMainMenuItems="getMainMenuItems"
    >
    </ag-grid-vue>
    <edit-doc-dialog ref="confirm" />
    <add-col-form-dialog ref="add" />
    <v-btn @click="saveDocDialog"> Save </v-btn>
    <v-btn @click="returnToDocList"> Cancel </v-btn>
  </div>
</template>

<script>
import { AgGridVue } from "ag-grid-vue";
import "ag-grid-enterprise";
import { documentAPI } from "@/api/document.js";
import EditDocDialog from "./EditDocDialog.vue";
import AddColFormDialog from "./AddColFormDialog.vue";
export default {
  components: {
    AgGridVue,
    EditDocDialog,
    AddColFormDialog,
  },

  data() {
    return {
      columnDefs: [
        {
          headerName: "",
          field: "userNameDisplay"
        },
        {
          headerName: "",
          field: "id"
        }
      ],
      rawData: [],
      showContextMenu: false,

      dialog: false,
      newColumn: "",
    };
  },
  async created() {
    // Nap data
    let res = await documentAPI.detailDocument(this.$route.params.id);
    this.columnDefs = res.columnDefs;
    this.rawData = res.rawData;

    // Xac dinh cot duoc phep chinh sua (ko the sua ten + msv)
    this.columnDefs.map((field) => {
      // console.log(field.field != "student" && field.field != "id");
      if (field.field != "student" && field.field != "id") {
        Object.assign(this.columnDefs[this.columnDefs.indexOf(field)], {
          editable: true
        });
      }
    });
  },

  methods: {
    // Chuan bi
    onGridReady(params) {
      this.gridApi = params.api;
      this.gridColumnApi = params.columnApi;
    },

    //Menu cac thu
    getContextMenuItems(params) {
      console.log(params.defaultItems);
      return params.defaultItems;
    },
    getMainMenuItems(params) {
      // console.log(params.defaultItems);
      const colMenuItems = [];
      const itemsToExclude = ["separator", "pinSubMenu", "valueAggSubMenu"];
      params.defaultItems.forEach((item) => {
        if (itemsToExclude.indexOf(item) < 0) {
          colMenuItems.push(item);
        }
      });

      // Menu Xoa cot
      colMenuItems.push({
        name: "Xóa cột",
        action: () => {
          let name = params.column.colDef.field;

          if (name == "student" || name == "id") {
            alert("Cột này không thể xóa!!!");
           } else {this.delRecord(params)} 
          }
      });

      //Menu them cot (dat o cot cuoi cung)
      
      let id = params.column.colId;
      const last = this.columnDefs[this.columnDefs.length - 1]
      // console.log(id);
      // console.log(last.field);
      if (id == last.field) {
        colMenuItems.push({
          name:"Thêm cot",
          action: () => {
            this.addRecord(params);
          }
        })
      }
      return colMenuItems;
    },



    // Them cot
    async addRecord() {
      if (
        await this.$refs.add.open(
        )
      ) {
        this.submit();
      }
    },
    submit() {
      console.log(this.$refs.add.newColumn);
      //Xoa dau tieng Viet + cac dau ki tu
      let normalizedNewField = this.$refs.add.newColumn.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd')
        .replace(/Đ/g, 'D');
        normalizedNewField = normalizedNewField.replace(/[^a-zA-Z0-9]/g, '').split(" ").join("");

      console.log(normalizedNewField);
      this.columnDefs.push({
          field: normalizedNewField,
          headerName: this.$refs.add.newColumn,
          editable: true
      });
        
    },

    //Xoa cot
    async delRecord(params) {
      if (
        await this.$refs.confirm.open(
          "Xác nhận xóa",
          "Bạn có muốn xóa hoàn toàn cột này hay không?"
        )
      ) {
        this.deleteRecord(params);
      }
    },
    deleteRecord(params) {
      //console.log("ok");
      //console.log(params);
      let name = params.column.colDef.field;
        var removeIndex = this.columnDefs
          .map((item) => item.field)
          .indexOf(name);
        //console.log(removeIndex);
        this.columnDefs.splice(removeIndex, 1);
      console.log("Record deleted.");
    },

    // Dieu huong
    returnToDocList() {
      this.$router.push("/document");
    },

    // Luu doc
    async saveDocDialog() {
      if (
        await this.$refs.confirm.open(
          "Xác nhận lưu",
          "Xác nhận lưu toàn bộ thay đổi?"
        )
      ) {
        this.saveDoc();
      }
    },
    async saveDoc() {
      let res = await documentAPI.editDocument(this.columnDefs, this.rawData, this.$route.params.id);
      console.log(res);
      this.$router.push("/document");
    },
  }
};
</script>
