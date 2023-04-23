<template>
  <div class="dashboard-workspace">
    <div class="dashboard-content">
      <grid-layout
        :isResizable="false"
        :isDraggable="false"
        :layout="[]"
        :col-num="12"
        :row-height="30">
        <grid-item :x="0" :y="0" :w="4" :h="2" i="1">
          Số lượng sinh viên:
          {{ studentNumber }}
        </grid-item>
        <grid-item :x="4" :y="0" :w="4" :h="2" i="2">
          Mã lớp:
          {{ studentNumber }}
        </grid-item>
        <grid-item :x="8" :y="0" :w="4" :h="2" i="2">
          Giảng viên:
          {{ studentNumber }}
        </grid-item>
      </grid-layout>
    </div>
    <div class="dashboard-config">aaaaa</div>
  </div>
</template>

<script>
import { documentAPI } from "@/api/document.js";
import VueGridLayout from "vue-grid-layout";
export default {
  components: {
    "grid-layout": VueGridLayout.GridLayout,
    "grid-item": VueGridLayout.GridItem,
  },
  name: "dashboardWorkspace",
  data() {
    return {
      studentNumber: 0,
      classId: "",
      teacher: "",
      columnDefs: [],
      rawData: [],
    };
  },
  async created() {
    let res = await documentAPI.detailDocument(this.$route.params.id);
    this.columnDefs = res.columnDefs;
    this.rawData = res.rawData;
    this.studentNumber = res.rawData.length;
    this.classId = res.info.classId;
    this.teacher = res.info.host;
    // Xac dinh cot duoc phep chinh sua (ko the sua ten + msv)
    this.columnDefs.map((field) => {
      if (field.field != "student" && field.field != "id") {
        Object.assign(this.columnDefs[this.columnDefs.indexOf(field)], {
          editable: true,
        });
      }
    });
  },
};
</script>

<style scoped>
.dashboard-content {
  width: 100%;
  width: -moz-available; /* WebKit-based browsers will ignore this. */
  width: -webkit-fill-available; /* Mozilla-based browsers will ignore this. */
  width: stretch;
}
.dashboard-workspace {
  display: flex;
  height: 100%;
}
.dashboard-config {
  width: 25%;
  border-left: 1px black solid;
}

/* test layout */
.vue-grid-layout {
  background: #eee;
}

.layoutJSON {
  background: #ddd;
  border: 1px solid black;
  margin-top: 10px;
  padding: 10px;
}

.columns {
  -moz-columns: 120px;
  -webkit-columns: 120px;
  columns: 120px;
}

.vue-resizable-handle {
  z-index: 5000;
  position: absolute;
  width: 20px;
  height: 20px;
  bottom: 0;
  right: 0;
  background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=");
  background-position: bottom right;
  padding: 0 3px 3px 0;
  background-repeat: no-repeat;
  background-origin: content-box;
  box-sizing: border-box;
  cursor: se-resize;
}

.vue-grid-item:not(.vue-grid-placeholder) {
  background: #ccc;
  border: 1px solid black;
}

.vue-grid-item.resizing {
  opacity: 0.9;
}

.vue-grid-item.static {
  background: #cce;
}

.vue-grid-item .text {
  font-size: 24px;
  text-align: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 24px;
}

.vue-grid-item .minMax {
  font-size: 12px;
}

.vue-grid-item .add {
  cursor: pointer;
}

.remove {
  position: absolute;
  right: 2px;
  top: 0;
  cursor: pointer;
}
</style>
